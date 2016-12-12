'use strict'

const type = require('../types')

module.exports = {
  /**
   * token.
   */
  token: String,

  /**
   * created until.
   */
  created: Date,

  /**
   * origin where the authentication request originated from.
   */
  origin: String,

  /**
   * user who is identified by the token.
   */
  user: [type.USERS, 'token']
}
