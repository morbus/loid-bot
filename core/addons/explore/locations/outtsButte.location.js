
'use strict'
const LoidLocation = require('../../../struct/locations/LoidLocation')

class OuttsButteLocation extends LoidLocation {
  constructor () {
    super('outtsButte', {
      locationName: 'Outt\'s Butte',
      description: '',
      imageUrl: 'https://github.com/morbus/loidbot/raw/main/core/addons/explore/images/outtsButte--monument-valley.png'
    })
  }
}

module.exports = OuttsButteLocation
