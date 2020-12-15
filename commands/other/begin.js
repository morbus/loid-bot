
/**
 * @todo
 */

'use strict'
const LoidBotCommandoCommand = require('../../lib/Command')

module.exports = class BeginCommand extends LoidBotCommandoCommand {
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
    this.logger.debug('inside and working.')
    this.logger.info(this.client.guilds.cache.size)
    return msg.say('begun')
  }
}
