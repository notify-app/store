'use strict'

module.exports = (worker) => {
  return {
    rooms: require('./rooms')(worker),
    users: require('./users')(worker),
    tokens: require('./tokens')(worker),
    messages: require('./messages')(worker)
  }
}
