
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
      description: 'Show current activity in the Land of Idle Demons.'
    })
  }

  /**
   * Add a timer.
   * @param {object} options - The options for the timer.
   * @param {Guild} options.guild - The guild the timer is being added for.
   * @param {User} options.user - The user the timer is being added for.
   * @param {string} options.type - The type of timer (e.g., kill, make, explore).
   * @param {string|null} options.subtype - The subtype of timer (e.g., rat, weapon, village).
   * @param {string|null} options.subsubtype - The subsubtype of timer (e.g., giant, vorpalSword, outtsButte).
   * @param {object} options.duration - An object with 'seconds', 'minutes', etc.
   * @returns {Promise<void>}
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

  /**
   * Return a count of available timers for a guild member.
   * @param {object} options - The options used for finding available timers.
   * @param {Guild} options.guild - The guild the timer is being added for.
   * @param {User} options.user - The user the timer is being added for.
   * @returns {Promise<number>} availableTimers - The number of available timers.
   */
  async getAvailableTimers (options) {
    const statusCommand = this.client.commandHandler.modules.get('status')
    const maximumTimers = await statusCommand.getState({
      guild: options.guild,
      user: options.user,
      type: 'maximumTimers'
    })

    const existingTimers = await this.client.sequelize.models.guildMemberTimers.count({
      where: {
        guildId: options.guild.id,
        userId: options.user.id
      }
    })

    return maximumTimers.get('floatValue') - existingTimers
  }
}

module.exports = TimersCommand
