'use strict'

const type = require('../types')

module.exports = {
  /**
   * username of the user.
   */
  username: String,

  /**
   * internalID is an ID given by the auth server.
   */
  internalID: String,

  /**
   * image name.
   */
  image: String,

  /**
   * bot or not.
   */
  bot: Boolean,

  /**
   * creator of the user.
   * @type {Array}
   */
  creator: [type.USERS, 'created'],

  /**
   * created users by the user himself.
   * @type {Array}
   */
  created: [[type.USERS], 'creator'],

  /**
   * grants the user has.
   */
  grants: [[type.GRANTS], 'users'],

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
