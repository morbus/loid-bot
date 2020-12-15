
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

  async run (msg, args) {
    this.logger.debug('inside and working.')
    this.logger.info(this.client.guilds.cache.size)

    await this.guildMemberReductions.create({
      userId: 'a',
      guildId: 'b',
      type: 'c',
      explanation: 'd'
    })

    this.client.guildMemberReductions.create({
      userId: '1',
      guildId: '2',
      type: '3',
      explanation: '4'
    })

    return msg.say('begun')
  }
}
