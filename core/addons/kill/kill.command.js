
'use strict'
const { BOT_COMMAND_PREFIX } = process.env
const { Command } = require('discord-akairo')
const { oneLine, stripIndents } = require('common-tags')
const Discord = require('discord.js')
const pluralize = require('pluralize')

/**
 * Kill something in the Land of Idle Demons.
 */
class KillCommand extends Command {
  constructor () {
    super('kill', {
      aliases: ['kill'],
      channel: 'guild',
      description: 'Kill something in the Land of Idle Demons.',
      args: [
        {
          id: 'count',
          type: 'number'
        },
        {
          id: 'mobId',
          type: 'mobId',
          unordered: true
        }
      ]
    })
  }

  /**
   * Create timers for killing named or random mobs.
   */
  async exec (message, args) {
    const statusCommand = this.client.commandHandler.modules.get('status')
    const currentLocationId = await statusCommand.getState({
      guild: message.guild,
      user: message.author,
      type: 'currentLocation'
    })

    if (!currentLocationId) {
      return message.reply(`*you've yet to begin. Try \`${BOT_COMMAND_PREFIX} begin\`.*`)
    }

    if (args.mobId === 'UNKNOWN_MOB_ID') {
      return message.reply('*this mob has yet to be discovered by you.*')
    }

    // With no args, show and resolve timers.
    if (!args.count && !args.mobId) {
      // @todo display current kill timers?
      // @todo resolve completed kill timers.
    }

    // Load the guild member's current location, kill reduction level, and available mobs.
    const location = this.client.locationHandler.modules.get(currentLocationId.get('stringValue'))
    const killReductionLevel = await statusCommand.getReductionLevel('kill', message.guild, message.author)
    const availableMobIds = location.getAvailableMobsAt('kill', killReductionLevel, message.guild, message.author)

    // The mob exists, but is not available at this KRL.
    if (args.mobId && !availableMobIds.includes(args.mobId)) {
      return message.reply('*this mob is not available for one of your skill.*')
    }

    // If no count, use 1.
    args.count = args.count ?? 1

    // One-time introduction.
    // KRL check saves us a DB query.
    if (killReductionLevel === 0) {
      await this.execKillIntro(message)
    }

    // We're ready to add some timers, assuming there are some to spare.
    const timerCommand = this.client.commandHandler.modules.get('timers')
    const [availableTimers] = await timerCommand.getAvailableTimers({ guild: message.guild, user: message.author })

    if (availableTimers <= 0) {
      return message.reply('*you do not have enough time to kill more.*')
    }

    // If they don't have enough available timers, use as many as possible.
    args.count = (args.count > availableTimers) ? availableTimers : args.count

    // Add random or guild-member-chosen mobs.
    for (let i = 1; i <= args.count; i++) {
      const selectedMobId = args.mobId ?? availableMobIds[Math.floor(Math.random() * availableMobIds.length)]
      const selectedMob = this.client.mobHandler.modules.get(selectedMobId)
      await timerCommand.addTimer({
        guild: message.guild,
        user: message.author,
        type: 'kill',
        subtype: selectedMobId,
        duration: selectedMob.getDurationAt('kill', killReductionLevel, message.guild, message.author)
      })
    }

    // @todo display results of timer creation.
  }

  /**
   * Display an introductory message about killing.
   */
  async execKillIntro (message) {
    const statusCommand = this.client.commandHandler.modules.get('status')
    const [, created] = await statusCommand.getState({
      queryType: 'findOrCreate',
      guild: message.guild,
      user: message.author,
      type: 'messagesSeen',
      subtype: 'kill',
      subsubtype: 'intro',
      booleanValue: 1
    })

    // Message already seen.
    if (created === false) {
      return null
    }

    return message.reply(new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Their deaths are inevitable')
      .setAuthor('Land of Idle Demons', message.author.avatarURL())
      .setThumbnail('https://github.com/morbus/loidbot/raw/main/core/addons/kill/images/killIntro--carrion.png')
      .setDescription(stripIndents`
        ${oneLine`
          *You will always succeed at killing; it is simply a matter of how
          quickly. Deaths for the weakest mobs, like a \`mosquito\`, only
          take 30 seconds. Stronger mobs and bosses can take hours, days,
          or months. The more you kill, the faster you kill, earning **kill
          reduction levels (KRL)** that speed your efforts against all mobs.* 
        `}

        ${oneLine`
          *To check your timers, type \`${BOT_COMMAND_PREFIX} timers\`.*
        `}
      `)
    )
  }

  /**
   * Define a 'mob' argument type that validates against known mob IDs.
   * Also supports pluralized mob forms ("kill 3 mosquitos" for "mosquito").
   * (Yes, I know it's "mosquitoes": https://github.com/plurals/pluralize/issues/165)
   */
  addArgumentTypes () {
    this.client.commandHandler.resolver.addType('mobId', (message, phrase) => {
      // The isNaN() check allows us to support "kill mosquito" and "kill 33
      // mosquitos" without "33" being erroneously treated as a mob ID, and
      // then causing "UNKNOWN_MOB_ID" to be returned.
      if (phrase !== '' && isNaN(phrase)) {
        for (const mobId of this.client.mobHandler.modules.keys()) {
          if ((mobId.toLowerCase() === phrase.toLowerCase()) ||
            (mobId.toLowerCase() === pluralize.singular(phrase.toLowerCase()))) {
            return mobId
          }
        }

        return 'UNKNOWN_MOB_ID'
      }

      return null
    })
  }
}

module.exports = KillCommand
