
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
    const currentLocationId = await this.client.sequelize.models.guildMemberState.findOne({
      attributes: ['stringValue'],
      where: {
        guildId: message.guild.id,
        userId: message.author.id,
        type: 'currentLocation'
      }
    })

    if (!currentLocationId) {
      return message.reply(`*you've yet to begin. Try \`${BOT_COMMAND_PREFIX} begin\`.*`)
    }

    if (args.mobId === 'UNKNOWN_MOB_ID') {
      return message.reply('*this mob has yet to be discovered by you.*')
    }

    // With no args, show and resolve timers.
    if (!args.count && !args.mobId) {
      return message.reply('*@todo display kill timers and resolutions for guild member.*')
    }

    // Load the guild member's current location, kill reduction level, and available mobs.
    const killReductionLevel = await this.getKillReductionLevel(message.guild, message.author)
    const location = this.client.locationHandler.modules.get(currentLocationId.get('stringValue'))
    const availableMobIds = location.availableMobsAt('kill', killReductionLevel, message.guild, message.author)

    // The chosen mob is not available at this KRL.
    if (args.mobId && !availableMobIds.includes(args.mobId)) {
      return message.reply('*this mob is not available for one of your skill.*')
    }

    // If no count, choose 1.
    args.count = args.count ?? 1

    // One-time introduction.
    this.execKillIntro(message)

// @todo need to check how many timers are available and maxLength that.

    // We're ready to add some timers.
    const timerCommand = this.client.commandHandler.modules.get('timers')

    // Add random or user-chosen mobs.
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
  }

  /**
   * Display an introductory message about killing.
   */
  execKillIntro (message) {
    return message.reply(new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Deaths are pre-ordained')
      .setAuthor('Land of Idle Demons', message.author.avatarURL())
      .setThumbnail('https://github.com/morbus/loidbot/raw/main/core/addons/kill/images/killIntro--carrion.png')
      .setDescription(stripIndents`
        ${oneLine`
          *You will always succeed at killing; it's simply a matter of how
          quickly. Deaths for the weakest mobs, like a \`mosquito\`, only
          take 30 seconds. Stronger mobs can take upwards of hours, days, or
          weeks, and bosses even longer. The more you kill, the faster you
          kill, earning **kill reduction levels** (KRL) that lessen your
          effort across all mobs.* 
        `}

        ${oneLine`
          *To check all your timers, type \`${BOT_COMMAND_PREFIX} timers\`.*
        `}

        ${oneLine`
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

  /**
   * Get the kill reduction level of the passed guild member.
   * @param {Discord.Guild} guild - The guild this request is taking place in.
   * @param {Discord.User} user - The user this request is related to.
   * @returns {Promise<number>}
   */
  async getKillReductionLevel (guild, user) {
    const killReductionLevel = await this.client.sequelize.models.guildMemberReductions.findAll({
      attributes: [[this.client.sequelize.fn('SUM', this.client.sequelize.col('amount')), 'total']],
      where: {
        guildId: guild.id,
        userId: user.id,
        type: 'kill'
      }
    })

    return killReductionLevel[0].get('total') ?? 0
  }
}

module.exports = KillCommand
