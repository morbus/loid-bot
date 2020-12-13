
/**
 * The primary entry point that runs Land of the Idle Demons.
 */

require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()

client.once('ready', () => {
  client.user.setPresence({ activity: { name: 'Being developed' }, status: 'idle' })
  console.log('Ready!')
})

client.on('message', message => {
  console.log(message.content)

  if (message.content === '::ping') {
    // send back "Pong." to the channel the message was sent in
    message.channel.send('Pong.')
  }
})

client.login(process.env.BOT_TOKEN)