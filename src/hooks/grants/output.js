'use strict'

module.exports = (worker) => {
  return (context, record) => {
    // Grant info of a user should be retrieved from the user endpoint.
    delete record.users
    return record
  }
}
