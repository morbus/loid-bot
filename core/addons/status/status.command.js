
'use strict'
const { BOT_COMMAND_PREFIX } = process.env
const { Command } = require('discord-akairo')
const { oneLine, stripIndents } = require('common-tags')
const Discord = require('discord.js')

/**
 * Show current status in the Land of Idle Demons.
 */
class StatusCommand extends Command {
  constructor () {
    super('status', {
      aliases: ['status'],
      channel: 'guild',
      description: 'Show current status in the Land of Idle Demons.'
    })
  }

  /**
   * Get the reduction level of a guild member.
   * @param {string} type - The type of reduction level, or 'total'.
   * @param {Guild} guild - The guild this request is from.
   * @param {User} user - The user this request is for.
   * @returns {Promise<number>}
   */
  async getReductionLevel (type, guild, user) {
    const whereFields = {
      guildId: guild.id,
      userId: user.id
    }

    if (type !== 'total') {
      whereFields.type = type
    }

    const reductionLevel = await this.client.sequelize.models.guildMemberReductions.findAll({
      attributes: [[this.client.sequelize.fn('SUM', this.client.sequelize.col('amount')), 'total']],
      where: whereFields
    })

    return reductionLevel[0].get('total') ?? 0
  }

  /**
   * Get a state value of a guild member.
   * @param {object} options - The options for the state lookup.
   * @param {Guild} options.guild - The guild the state is stored for.
   * @param {User} options.user - The user the state is stored for.
   * @param {string} options.type - The type of state (e.g., kill, make, explore).
   * @param {string|null} options.subtype - The subtype of state (e.g., rat, weapon, village).
   * @param {string|null} options.subsubtype - The subsubtype of state (e.g., giant, vorpalSword, outtsButte).
   * @param {boolean|null} options.booleanValue - The boolean value of the state being stored (e.g., 1 or 0).
   * @param {float|null} options.floatValue - The float value of the state being stored (e.g., 5, -1.234, 1000000).
   * @param {string|null} options.stringValue - The string value of the state being stored (e.g., outtsButte, finalGirl).
   * @param {string} options.queryType - 'findOne', 'findAll', or 'findOrCreate'. Defaults to 'findOne'.
   * @returns {Promise<*>} - The result from Sequelize's findOne(), findAll(), or findOrCreate().
   */
  async getState (options) {
    options.queryType = options.queryType ?? 'findOne'

    const whereFields = {
      guildId: options.guild.id,
      userId: options.user.id,
      type: options.type
    }
    const optionalFields = [
      'subtype',
      'subsubtype',
      'booleanValue',
      'floatValue',
      'stringValue'
    ]
    optionalFields.forEach(optionalField => {
      if (options[optionalField] !== undefined) {
        whereFields[optionalField] = options[optionalField]
      }
    })

    if (options.queryType === 'findOne') {
      return await this.client.sequelize.models.guildMemberState.findOne({
        where: whereFields
      })
    }

    if (options.queryType === 'findAll') {
      return await this.client.sequelize.models.guildMemberState.findAll({
        where: whereFields
      })
    }

    if (options.queryType === 'findOrCreate') {
      return await this.client.sequelize.models.guildMemberState.findOrCreate({
        where: whereFields
      })
    }
  }

  /**
   * Set a state value of a guild member.
   * @param {Guild} options.guild - The guild the state is stored for.
   * @param {User} options.user - The user the state is stored for.
   * @param {string} options.type - The type of state (e.g., kill, make, explore).
   * @param {string|null} options.subtype - The subtype of state (e.g., rat, weapon, village).
   * @param {string|null} options.subsubtype - The subsubtype of state (e.g., giant, vorpalSword, outtsButte).
   * @param {boolean|null} options.booleanValue - The boolean value of the state being stored (e.g., 1 or 0).
   * @param {float|null} options.floatValue - The float value of the state being stored (e.g., 5, -1.234, 1000000).
   * @param {string|null} options.stringValue - The string value of the state being stored (e.g., outtsButte, finalGirl).
   * @param {JSON|null} options.jsonValue - The JSON value of the state being stored (e.g. {"complex": "values", "are": "here"}).
   * @returns <Promise<*>> - The result from Sequelize's save() or create().
   */
  async setState (options) {
    // Determine if state already exists. Remove values from the lookup first.
    const { booleanValue, floatValue, stringValue, jsonValue, ...existingStateLookup } = options
    const existingState = await this.getState(existingStateLookup)

    // Update state...
    if (existingState) {
      existingState.set('booleanValue', options.booleanValue ?? null)
      existingState.set('floatValue', options.floatValue ?? null)
      existingState.set('stringValue', options.stringValue ?? null)
      existingState.set('jsonValue', options.jsonValue ?? null)
      return await existingState.save()
    }

    // ...or create a new state.
    return await this.client.sequelize.models.guildMemberState.create({
      guildId: options.guild.id,
      userId: options.user.id,
      type: options.type,
      subtype: options.subtype ?? null,
      subsubtype: options.subsubtype ?? null,
      booleanValue: options.booleanValue ?? null,
      floatValue: options.floatValue ?? null,
      stringValue: options.stringValue ?? null,
      jsonValue: options.jsonValue ?? null
    })
  }
}

module.exports = StatusCommand
