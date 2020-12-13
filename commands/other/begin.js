
/**
 * @todo
 */

const { Command } = require('discord.js-commando')

module.exports = class BeginCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'begin',
      aliases: [''],
      group: 'other',
      memberName: 'begin',
      description: '@todo',
      hidden: true
    })
  }

  run (msg, args) {
    return msg.say('begun')
  }
}
