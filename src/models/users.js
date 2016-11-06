'use strict'

const type = require('../types')

module.exports = {
  /**
   * username of the user.
   */
  username: String,

  /**
   * password of the user
   */
  password: String,

  /**
   * image name.
   */
  image: String,

  /**
   * token identifying the user.
   */
  token: [type.TOKENS, 'user'],

  /**
   * rooms which the user is a member of.
   */
  rooms: [[type.ROOMS], 'users'],

  /**
   * state of the user (offline, online, away, etc...)
   */
  state: [type.STATES, 'users'],

  /**
   * messages created by the user.
   */
  messages: [[type.MESSAGES], 'user'],

  /**
   * unread messages.
   */
  unread: [[type.MESSAGES], 'unread']
}
