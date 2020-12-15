
/**
 * Provides the guildMemberReductions database model.
 */

'use strict'

module.exports = (sequelize, DataTypes) => {
  /**
   * The master collection of reductions. Reductions are per-user per-guild,
   * and include a master type ("kill"), a subtypeA ("rat"), a subtypeB,
   * and a freeform explanation ("10"). That example would read as "this
   * user in this guild has earned a reduction for killing ten giant
   * rats". Each individual reduction is always worth 1 second.
   */
  return sequelize.define('guildMemberReductions', {
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
    explanation: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'The milestone or reason that earned the reduction (e.g., 10, 100, "Played on April 1st, 2021.").'
    }
  })
}
