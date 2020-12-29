
'use strict'
const { BOT_COMMAND_PREFIX } = process.env
const { Command } = require('discord-akairo')
const { oneLine, stripIndents } = require('common-tags')
const Discord = require('discord.js')

/**
 * Begin the guild member's recovery of the Land of Idle Demons.
 */

class BeginCommand extends Command {
  constructor () {
    super('begin', {
      aliases: ['begin'],
      channel: 'guild',
      description: 'Begin your recovery of the Land of Idle Demons.',
      args: [
        {
          id: 'step',
          type: 'lowercase',
          default: 'intro'
        }
      ]
    })
  }

  /**
   * Display new game messages for new players.
   */
  async exec (message, args) {
    if (args.step === 'intro') {
      return this.execBeginIntro(message)
    }

    if (args.step === 'anew') {
      return this.execBeginAnew(message)
    }
  }

  /**
   * Display introductory messages for new players.
   */
  async execBeginIntro (message) {
    const guildMemberState = this.client.sequelize.models.guildMemberState
    const [, created] = await guildMemberState.findOrCreate({
      where: {
        guildId: message.guild.id,
        userId: message.author.id,
        type: 'messagesSeen',
        subtype: 'begin',
        subsubtype: 'intro',
        booleanValue: 1
      }
    })

    // Message already seen.
    if (created === false) {
      return message.reply(`*you've already begun. Try \`${BOT_COMMAND_PREFIX} begin anew\`.*`)
    }

    return message.reply(new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('30 years')
      .setAuthor('Land of Idle Demons', message.author.avatarURL())
      .setThumbnail('https://github.com/morbus/loidbot/raw/main/core/addons/begin/images/beginIntro--pyromaniac.png')
      .setDescription(stripIndents`
        ${oneLine`
          30 years it has been since the demons won. 30 years since the demons
          possessed every masked slasher, mad doctor, deranged joker, evil
          twin, tortured mutant, crazy despot, giant lizard, sleeping cosmic,
          and more, all at once. Their coordinated attack on humanity was
          more than we could handle. We fell and fell hard, dying by the
          billions. So utter and complete was the demons' victory that many
          years passed without a legitimate challenge to their dominance.
        `}

        ${oneLine`
          The demons have since fallen idle, complacent and bored with their
          planetary prize, languishing in their possessed bodies. They barely
          lift a finger to scratch themselves, much less squash rebellion.
        `}

        ${oneLine`
          If you fight back, you know you'll win. It's only a matter of time.
        `}

        ${oneLine`
          *To continue, type \`${BOT_COMMAND_PREFIX} begin anew\`.*
        `}
      `)
    )
  }

  /**
   * Display the anew beginning for new players.
   */
  async execBeginAnew (message) {
    const outtsButteLocation = this.client.locationHandler.modules.get('outtsButte')
    const guildMemberState = this.client.sequelize.models.guildMemberState
    const [, created] = await guildMemberState.findOrCreate({
      where: {
        guildId: message.guild.id,
        userId: message.author.id,
        type: 'messagesSeen',
        subtype: 'begin',
        subsubtype: 'anew',
        booleanValue: 1
      }
    })

    // Message already seen.
    if (created === false) {
      return message.reply(`*you've already begun. Try \`${BOT_COMMAND_PREFIX} status\` or \`${BOT_COMMAND_PREFIX} timers\`.*`)
    }

    // Welcome to your first location!
    await guildMemberState.findOrCreate({
      where: {
        guildId: message.guild.id,
        userId: message.author.id,
        type: 'currentLocation',
        stringValue: 'outtsButte'
      }
    })

    // "It goes Inns your Mouth and Outt's your Butte!"
    return message.reply(new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Docking at Outt\'s Butte')
      .setAuthor('Land of Idle Demons', message.author.avatarURL())
      .setThumbnail(outtsButteLocation.imageUrl)
      .setDescription(stripIndents`
        ${oneLine`
          You dock your father's boat at the first opportunity. You and the
          rest of your family were "floaters", those who hid from the demons
          by sailing out to sea. You didn't plan for the multi-headed sharks,
          giant squids, krakens, sirens, sea serpents, evil mermaids, and
          other such, but you made do. Or, well, *you* did, at least. Your
          parents not so much.
        `}

        ${oneLine`
          "Outt's Butte" reads the sign above the dock. In the distance, a
          hill protrudes rudely from the land, presumably Outt's giant middle
          finger to all. The small fishing village appears empty, and no one
          greets you except the mosquitoes. The small normal-sized ones.
          A blessing.
        `}

        ${oneLine`
          *To continue, type \`${BOT_COMMAND_PREFIX} kill 1 mosquito\`.*
        `}
      `)
    )
  }
}

module.exports = BeginCommand
