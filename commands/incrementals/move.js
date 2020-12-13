
/**
 * @todo
 */

const { Command } = require('discord.js-commando')

module.exports = class MoveCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'move',
      aliases: [''],
      group: 'incrementals',
      memberName: 'move',
      description: '@todo'
    })
  }

  run (msg, args) {
    return msg.say('Moved!')
  }
}
