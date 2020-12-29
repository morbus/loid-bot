
'use strict'
const { DataTypes } = require('sequelize')
const LoidModel = require('../../../struct/models/LoidModel')

/**
 * The master collection of reductions. Reductions are per-guild per-user,
 * and include a master type ("kill"), a subtypeA ("rat"), a subtypeB,
 * a freeform explanation ("10"), and then the amount of reduction earned
 * ("1"). That example would read as "this user in this guild has earned
 * 1 reduction level for killing ten rats".
 */
class GuildMemberReductionsModel extends LoidModel {
  constructor () {
    super('guildMemberReductions', {
      modelName: 'guildMemberReductions',
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
          comment: 'The type of reduction earned (e.g., kill, craft, explore).'
        },
        subtype: {
          type: DataTypes.STRING,
          comment: 'The subtype of reduction earned (e.g., rat, weapon, village).'
        },
        subsubtype: {
          type: DataTypes.STRING,
          comment: 'The subsubtype of reduction earned (e.g., giant, vorpalSword, outtsButte).'
        },
        amount: {
          type: DataTypes.FLOAT,
          comment: 'The amount of reduction level earned, in seconds (usually between 1 and 10).'
        },
        explanation: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: 'The milestone or reason that earned the reduction (e.g., 10, 100, "Played on April 1st, 2021.").'
        }
      },
      options: {
        indexes: [
          {
            name: 'reductionsIndex',
            fields: ['guildId', 'userId', 'type', 'subtype', 'subsubtype']
          },
          {
            name: 'reductionsCountIndex',
            fields: ['guildId', 'userId', 'amount']
          },
          {
            name: 'reductionsCountByTypeIndex',
            fields: ['guildId', 'userId', 'type', 'amount']
          }
        ]
      }
    })
  }
}

module.exports = GuildMemberReductionsModel
