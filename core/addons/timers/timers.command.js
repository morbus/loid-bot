
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
   * @param {Object} options - The options for the timer.
   * @param {Discord.Guild} options.guild - The guild the timer is being added for.
   * @param {Discord.User} options.user - The user the timer is being added for.
   * @param {string} options.type - The type of timer (e.g., kill, make, explore).
   * @param {string|null} options.subtype - The subtype of timer (e.g., rat, weapon, village).
   * @param {string|null} options.subsubtype - The subsubtype of timer (e.g., giant, vorpalSword, outtsButte).
   * @param {Object} options.duration - An object with 'seconds', 'minutes', etc.
   * @return {Promise<void>}
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
   * @param {Object} options - The options used for finding available timers.
   * @param {Discord.Guild} options.guild - The guild the timer is being added for.
   * @param {Discord.User} options.user - The user the timer is being added for.
   * @return {Promise<number>} availableTimers - The number of available timers.
   */
  async getAvailableTimers (options) {
    const maximumTimers = await this.client.sequelize.models.guildMemberState.findOne({
      where: {
        guildId: options.guild.id,
        userId: options.user.id,
        type: 'maximumTimers'
      }
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
