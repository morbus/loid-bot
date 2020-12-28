
'use strict'
const { DataTypes } = require('sequelize')
const LoidModel = require('../../../struct/models/LoidModel')

/**
 * The master collection of guild member specific state variables. This
 * table is used to store any data related to a specific guild member's
 * gameplay. The type columns allow searchable granularity from the simple
 * (type: "location") to the complex (type: "craft", subtype: "weapon",
 * subsubtype: "vorpalSword"), allowing you to generate statistics from
 * large to small ("I've crafted 817 things, of which 130 were weapons, and
 * 17 were vorpalSwords."). Values can be booleans, floats, strings, or JSON.
 */
class GuildMemberStateModel extends LoidModel {
  constructor () {
    super('core-model:guildMemberState', {
      modelName: 'guildMemberState',
      attributes: {
        userId: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: 'The unique ID of the Discord user.'
        },
        guildId: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: 'The unique ID of the Discord guild.'
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: 'The type of state being tracked (e.g., kill, craft, explore).'
        },
        subtype: {
          type: DataTypes.STRING,
          comment: 'The subtype of state being tracked (e.g., rat, weapon, village).'
        },
        subsubtype: {
          type: DataTypes.STRING,
          comment: 'The subsubtype of state being tracked (e.g., giant, vorpalSword, outtsButte).'
        },
        booleanValue: {
          type: DataTypes.BOOLEAN,
          comment: 'The boolean value of the state being stored (e.g., 1 or 0).'
        },
        floatValue: {
          type: DataTypes.FLOAT,
          comment: 'The float value of the state being stored (e.g., 5, -1.234, 1000000).'
        },
        stringValue: {
          type: DataTypes.STRING,
          comment: 'The string value of the state being stored (e.g., outtsButte, finalGirl).'
        },
        jsonValue: {
          type: DataTypes.JSON,
          comment: 'The JSON value of the state being stored (e.g. {"complex": "values", "are": "here"}).'
        }
      },
      options: {
        freezeTableName: true,
        indexes: [
          {
            name: 'stateBooleanValuesIndex',
            fields: ['userId', 'guildId', 'type', 'subtype', 'subsubtype', 'booleanValue']
          },
          {
            name: 'stateFloatValuesIndex',
            fields: ['userId', 'guildId', 'type', 'subtype', 'subsubtype', 'floatValue']
          },
          {
            name: 'stateStringValuesIndex',
            fields: ['userId', 'guildId', 'type', 'subtype', 'subsubtype', 'stringValue']
          }
        ]
      }
    })
  }
}

module.exports = GuildMemberStateModel
