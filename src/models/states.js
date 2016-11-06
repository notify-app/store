'use strict'

const type = require('../types')

module.exports = {
  /**
   * name of the state (online, offline, away, etc...)
   */
  name: String,

  /**
   * users which have the current state set to the model instance.
   */
  users: [[type.USERS], 'state']
}
