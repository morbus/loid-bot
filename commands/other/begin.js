
/**
 * Begin the guild member's recovery of the Land of Idle Demons.
 */

'use strict'
const LoidBotCommandoCommand = require('../../lib/Command')

module.exports = class BeginCommand extends LoidBotCommandoCommand {
  constructor (client) {
    super(client, {
      name: 'begin',
      memberName: 'begin',
      group: 'other',
      description: 'Begin your recovery of the Land of Idle Demons.',
      hidden: true
    })
  }

  async run (msg, args) {
    return msg.say('begun')
  }
}
