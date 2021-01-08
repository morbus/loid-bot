
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
   * Display timers for a guild member.
   */
  async exec (message, args) {
    const [availableTimers, maximumTimers] = await this.getAvailableTimers({ guild: message.guild, user: message.author })
    const currentTimers = await this.getTimers({ guild: message.guild, user: message.author })

    const timersEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle(`Current timers (${availableTimers} of ${maximumTimers} available)`)
      .setAuthor('Land of Idle Demons', message.author.avatarURL())
      .setThumbnail('https://github.com/morbus/loidbot/raw/main/core/addons/timers/images/timers--sands-of-time.png')
      .setDescription(stripIndents`
        ${oneLine`
          *If timers are "done", run the matching command without arguments to
          resolve them (e.g., \`${BOT_COMMAND_PREFIX} kill\`, \`${BOT_COMMAND_PREFIX}
          explore\`).*
        `}
      `)

    // @todo we need to show available/remaining slots too, with no timers.

    currentTimers.forEach((timer, i) => {
      const name = `${i + 1} - \`${timer.get('type')} ${timer.get('subtype')}\``
      const expiresAt = DateTime.fromJSDate(timer.get('expiresAt'))
      const now = DateTime.utc()

      if (expiresAt <= now) {
        timersEmbed.addField(name, '*done*', true)
      }

      if (expiresAt > now) {
        const remainingTime = expiresAt.diff(now)
        timersEmbed.addField(name, this.durationToRelative(remainingTime), true)
      }
    })

    return message.reply(timersEmbed)
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
   * Return a count of available and maximum timers for a guild member.
   * @param {object} options - The options used for finding available timers.
   * @param {Guild} options.guild - The guild the timer is being added for.
   * @param {User} options.user - The user the timer is being added for.
   * @returns {Promise<number, number>} availableTimers and maximumTimers.
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

    return [
      maximumTimers.get('floatValue') - existingTimers,
      maximumTimers.get('floatValue')
    ]
  }

  /**
   * Return current timers for a guild member.
   * @param {object} options - The options used for finding timers.
   * @param {Guild} options.guild - The guild the timers are being returned for.
   * @param {User} options.user - The user the timers are being returned for.
   * @returns {Promise<Model[]>} - The result from Sequelize's findAll().
   */
  async getTimers (options) {
    return await this.client.sequelize.models.guildMemberTimers.findAll({
      where: {
        guildId: options.guild.id,
        userId: options.user.id
      },
      order: [
        ['expiresAt', 'DESC']
      ]
    })
  }

  /**
   * Return a three-unit string for a Luxon Duration.
   * @param {Duration} duration - The Luxon Duration to turn into a string.
   * @returns {string} - A string formatted with up to three units, like "6h 3m 15s".
   */
  durationToRelative (duration) {
    if (Math.trunc(duration.as('years')) > 0) {
      return duration.toFormat("y'y' M'M' d'd'")
    }

    if (Math.trunc(duration.as('months')) > 0) {
      return duration.toFormat("M'M' d'd' h'h'")
    }

    if (Math.trunc(duration.as('days')) > 0) {
      return duration.toFormat("d'd' h'h' m'm'")
    }

    if (Math.trunc(duration.as('hours')) > 0) {
      return duration.toFormat("h'h' m'm' s's'")
    }

    if (Math.trunc(duration.as('minutes')) > 0) {
      return duration.toFormat("m'm' s's'")
    }

    if (Math.trunc(duration.as('seconds')) > 0) {
      return duration.toFormat("s's'")
    }
  }
}

module.exports = TimersCommand
