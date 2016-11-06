'use strict'

const type = require('../types')

module.exports = {
  /**
   * content of the message.
   */
  content: String,

  /**
   * user who created the message.
   */
  user: [type.USERS, 'messages'],

  /**
   * room inside which the message was written in.
   */
  room: [type.ROOMS, 'messages'],

  /**
   * unread by the users listed.
   */
  unread: [[type.USERS], 'unread']
}
