
/**
 * LOIDBot.js
 * @author Morbus Iff <morbus@disobey.com>
 *
 * The primary entry point that starts the Land of Idle Demons bot.
 */

'use strict'
require('dotenv').config()
const { BOT_COMMAND_PREFIX, BOT_OWNER_USERID, BOT_TOKEN } = process.env
const LoidBotClient = require('./core/lib/Client')
const path = require('path')

const client = new LoidBotClient({
  owner: BOT_OWNER_USERID,
  commandPrefix: BOT_COMMAND_PREFIX
})

client.registry
  // Commando built-ins.
  .registerDefaultTypes()
  .registerDefaultGroups()
  .registerDefaultCommands({
    prefix: false
  })

  // LOID custom groups.
  .registerGroups([
    ['incrementals', 'Incrementals'],
    ['other', 'Other']
  ])

  // LOID addons support.
  .registerAddonsIn([
    path.join(__dirname, 'core/addons'),
    path.join(__dirname, 'addons')
  ])

client.login(BOT_TOKEN)

client.once('ready', () => {
  client.logger.info(`Logged in as ${client.user.tag} with ID ${client.user.id}.`)

  client.user.setPresence({
    status: 'idle',
    activity: {
      type: 'WATCHING',
      name: 'for ::begin'
    }
  })
})

client.on('error', message => client.logger.error(message))
client.on('warn', message => client.logger.warn(message))
client.on('debug', message => client.logger.debug(message))
process.on('uncaughtException', message => client.logger.error(message))
