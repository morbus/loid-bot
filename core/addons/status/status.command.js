
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
}

module.exports = StatusCommand
