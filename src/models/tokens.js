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
   * user who is identified by the token.
   */
  user: [type.USERS, 'token']
}
