'use strict'

const type = require('../types')

module.exports = {
  /**
   * name of the room.
   */
  name: String,

  /**
   * image name.
   */
  image: String,

  /**
   * users who are inside the room.
   */
  users: [[type.USERS], 'rooms'],

  /**
   * messages written in the room.
   */
  messages: [[type.MESSAGES], 'room']
}
