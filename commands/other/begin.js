
/**
 * Begin the guild member's recovery of the Land of Idle Demons.
 */

'use strict'
const Discord = require('discord.js')
const LoidBotCommandoCommand = require('../../lib/Command')
const { oneLine, stripIndents } = require('common-tags')

module.exports = class BeginCommand extends LoidBotCommandoCommand {
  constructor (client) {
    super(client, {
      name: 'begin',
      memberName: 'begin',
      group: 'other',
      description: 'Begin your recovery of the Land of Idle Demons.',
      guildOnly: true,
      hidden: true,
      argsPromptLimit: 0,
      args: [
        {
          key: 'step',
          type: 'string',
          default: 'intro',
          prompt: 'What step of the beginning would you like to read?'
        }
      ]
    })
  }

  async run (msg, { step }) {
    if (step === 'intro') {
      return this.runMessageIntro(msg)
    }

    if (step === 'anew') {
      // @todo display docking info.
      // @todo define state and current location.
      return msg.reply('docking here')
    }
  }

  /**
   * If unseen, display the intro message for new players.
   */
  async runMessageIntro (msg) {
    const [, created] = await this.guildMemberState.findOrCreate({
      where: {
        userId: msg.author.id,
        guildId: msg.guild.id,
        type: 'messagesSeen',
        subtype: 'begin',
        subsubtype: 'intro'
      },
      defaults: {
        booleanValue: 1
      }
    })

    // Message has already been seen.
    if (created === false) {
      return null
    }

    return msg.replyEmbed(new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('30 years')
      .setAuthor('Land of Idle Demons')
      .setThumbnail('https://github.com/morbus/loidbot/raw/main/assets/icons/pyromaniac--square.png')
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
          The demons have since fallen idle, complacent and utterly bored with
          their prize, languishing in their possessed bodies. They barely
          lift a finger to scratch themselves, much less squash rebellion.
        `}

        ${oneLine`
          If you fight back, you know you'll win. It's only a matter of time.
        `}

        ${oneLine`
          *To continue, type \`${msg.guild.commandPrefix || this.client.commandPrefix}begin anew.\`*
        `}
      `)
    )
  }
}
