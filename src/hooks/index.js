'use strict'

module.exports = (worker) => {
  return {
    rooms: require('./rooms')(worker),
    users: require('./users')(worker),
    messages: require('./messages')(worker)
  }
}
