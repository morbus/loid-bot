
/**
 * The primary entry point that runs Land of the Idle Demons.
 */

require('dotenv').config()

const Commando = require('discord.js-commando')
const path = require('path')

const client = new Commando.Client({
  owner: process.env.BOT_OWNER_USERID,
  commandPrefix: process.env.BOT_COMMAND_PREFIX
})

client.registry
  // Commando built-ins.
  .registerDefaultTypes()
  .registerDefaultGroups()
  .registerDefaultCommands({
    prefix: false
  })

  // LOID customs.
  .registerGroups([
    ['incrementals', 'Incrementals']
  ])

  // Register all commands in the ./commands/ directory.
  .registerCommandsIn(path.join(__dirname, 'commands'))

client.once('ready', () => {
  client.user.setPresence({ activity: { name: 'Being developed' }, status: 'idle' })
  console.log('Ready!')
})

client.login(process.env.BOT_TOKEN)
