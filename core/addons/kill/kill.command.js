
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
          id: 'mob',
          type: 'mob',
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

    if (args.mob === 'UNKNOWN_MOB_ID') {
      return message.reply('*this mob has yet to be discovered by you.*')
    }

    // With no args, show and resolve timers.
    if (!args.count && !args.mob) {
      return message.reply('*@todo display kill timers and resolutions for guild member.*')
    }

    // Load the guild member's current location, kill reduction level, and available mobs.
    const killReductionLevel = await this.getKillReductionLevel(message.guild, message.author)
    const location = this.client.locationHandler.modules.get(currentLocationId.get('stringValue'))
    const availableMobs = location.availableMobsAt('kill', killReductionLevel, message.guild, message.author)
    const selectedMobs = []

    // The chosen mob is not available at their KRL.
    if (args.mob && !availableMobs.includes(args.mob)) {
      return message.reply('*this mob is not available for one of your skill.*')
    }

    // If no count, choose 1.
    args.count = args.count ?? 1

// @todo need to check how many timers are available and maxLength that.

    // Add random or user-chosen mobs.
    for (let i = 1; i <= args.count; i++) {
      const selectedMob = args.mob ?? availableMobs[Math.floor(Math.random() * availableMobs.length)]
      selectedMobs.push(this.client.mobHandler.modules.get(selectedMob))
    }

// @todo set timers here for selectedMobs. emit events to mess with?
  }

  /**
   * Define a 'mob' argument type that validates against known mob IDs.
   * Also supports pluralized mob forms ("kill 3 mosquitos" for "mosquito").
   * (Yes, I know it's "mosquitoes": https://github.com/plurals/pluralize/issues/165)
   */
  addArgumentTypes () {
    this.client.commandHandler.resolver.addType('mob', (message, phrase) => {
      // The isNaN() check allows us to support "kill mosquito" and "kill 33
      // mosquitos" without "33" being erroneously treated as a mob ID, and
      // then causing "UNKNOWN_MOB_ID" to be returned.
      if (phrase !== '' && isNaN(phrase)) {
        for (const mob of this.client.mobHandler.modules.keys()) {
          if ((mob.toLowerCase() === phrase.toLowerCase()) ||
            (mob.toLowerCase() === pluralize.singular(phrase.toLowerCase()))) {
            return mob
          }
        }

        return 'UNKNOWN_MOB_ID'
      }

      return null
    })
  }

  /**
   * Get the kill reduction level of the passed guild member.
   * @param {Discord.Guild|null} guild - The guild this request is taking place in.
   * @param {Discord.User|null} user - The user this request is related to.
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
