
'use strict'
const { DataTypes } = require('sequelize')
const LoidModel = require('../../../struct/models/LoidModel')

/**
 * The master collection of guild member timers. Each timer requires an
 * expiration date and a variable number of type identifiers ("this kill
 * type timer for subtype rat expiresAt 2020-12-29 15:01:53"). When a
 * timer expires and is resolved, it is removed from this table.
 */
class GuildMemberTimersModel extends LoidModel {
  constructor () {
    super('guildMemberTimers', {
      modelName: 'guildMemberTimers',
      attributes: {
        guildId: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: 'The unique ID of the Discord guild.'
        },
        userId: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: 'The unique ID of the Discord user.'
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: 'The type of timer (e.g., kill, make, explore).'
        },
        subtype: {
          type: DataTypes.STRING,
          comment: 'The subtype of timer (e.g., rat, weapon, village).'
        },
        subsubtype: {
          type: DataTypes.STRING,
          comment: 'The subsubtype of timer (e.g., giant, vorpalSword, outtsButte).'
        },
        expiresAt: {
          type: DataTypes.DATE,
          allowNull: false,
          comment: ''
        }
      },
      options: {
        indexes: [
          {
            name: 'timersIndex',
            fields: ['guildId', 'userId', 'expiresAt']
          },
          {
            name: 'timersByTypeIndex',
            fields: ['guildId', 'userId', 'type', 'subtype', 'subsubtype', 'expiresAt']
          }
        ]
      }
    })
  }
}

module.exports = GuildMemberTimersModel
