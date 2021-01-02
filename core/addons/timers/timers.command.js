
'use strict'
const { BOT_COMMAND_PREFIX } = process.env
const { Command } = require('discord-akairo')
const { DateTime, Duration } = require('luxon')
const { oneLine, stripIndents } = require('common-tags')
const Discord = require('discord.js')

/**
 * Show current activity in the Land of Idle Demons.
 */
class TimersCommand extends Command {
  constructor () {
    super('timers', {
      aliases: ['timers'],
      channel: 'guild',
      description: 'Show current activity in the Land of Idle Demons.',
      args: [
        {
          id: 'type',
          type: 'string'
        }
      ]
    })
  }

  /**
   * Add a timer.
   * @typedef {Options} TimerOptions
   * @property {Discord.Guild} guild - The guild the timer is being added for.
   * @property {Discord.User} user - The user the timer is being added for.
   * @property {string} type - The type of timer (e.g., kill, make, explore).
   * @property {string|null} subtype - The subtype of timer (e.g., rat, weapon, village).
   * @property {string|null} subsubtype - The subsubtype of timer (e.g., giant, vorpalSword, outtsButte).
   * @property {Object} duration - An object with keys of 'seconds', 'minutes', etc. (@see Duration.fromObject()).
   * @param {TimerOptions} options - The options for the timer.
   */
  async addTimer (options) {
    const expiresAt = DateTime.local().plus(Duration.fromObject(options.duration))
    await this.client.sequelize.models.guildMemberTimers.create({
      guildId: options.guild.id,
      userId: options.user.id,
      type: options.type,
      subtype: options.subtype ?? options.subtype,
      subsubtype: options.subsubtype ?? options.subsubtype,
      expiresAt: expiresAt.toISO()
    })
  }
}

module.exports = TimersCommand
