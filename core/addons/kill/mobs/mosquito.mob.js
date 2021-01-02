
'use strict'
const LoidMob = require('../../../struct/mobs/LoidMob')

class MosquitoMob extends LoidMob {
  constructor () {
    super('mosquito', {
      mobName: 'Mosquito',
      description: '',
      imageUrl: 'https://github.com/morbus/loidbot/raw/main/core/addons/begin/images/mosquito--amber-mosquito.png',
    })
  }

  durationAt (reductionType, reductionLevel, guild, user) {
    return {
      seconds: 30
    }
  }
}

module.exports = MosquitoMob
