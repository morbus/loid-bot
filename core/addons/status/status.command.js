
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
   * @param {Discord.Guild} guild - The guild this request is from.
   * @param {Discord.User} user - The user this request is for.
   * @return {Promise<number>}
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
}

module.exports = StatusCommand
