
/**
 * Provides the guildMemberState database model.
 */

'use strict'

module.exports = (sequelize, DataTypes) => {
  /**
   * The master collection of guild member specific state variables. This
   * table is used to store any data related to a specific guild member's
   * gameplay. The type columns allow searchable granularity from the simple
   * (type: "location") to the complex (type: "craft", subtype: "weapon",
   * subsubtype: "vorpalSword"), allowing you to generate statistics from
   * large to small ("I've crafted 817 things, of which 130 were weapons, and
   * 17 were vorpalSwords."). Values can be stored as strings, floats, or JSON.
   */
  return sequelize.define('guildMemberState', {
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
    stringValue: {
      type: DataTypes.STRING,
      comment: 'The string value of the state being stored (e.g., outtsbutte, finalGirl).'
    },
    floatValue: {
      type: DataTypes.FLOAT,
      comment: 'The float value of the state being stored (e.g., 5, -1.234, 1000000).'
    },
    jsonValue: {
      type: DataTypes.JSON,
      comment: 'The JSON value of the state being stored (e.g. {complex: "values", are: "here"}).'
    }
  })
}
