'use strict'

const type = require('../types')

module.exports = {
  /**
   * name of the grant
   */
  name: String,

  /**
   * users who has the grant.
   */
  users: [[type.USERS], 'grants']
}
