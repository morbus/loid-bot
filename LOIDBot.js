
/**
 * LOIDBot.js
 * @author Morbus Iff <morbus@disobey.com>
 *
 * Starts the Land of Idle Demons bot.
 */

'use strict'
require('dotenv').config()
const { BOT_COMMAND_PREFIX, BOT_TOKEN } = process.env
const LoidClient = require('./core/struct/LoidClient')
const path = require('path')

const client = new LoidClient()

client.loadAddonsIn([
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
      name: `for "${BOT_COMMAND_PREFIX} begin"`
    }
  })
})
