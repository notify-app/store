'use strict'

module.exports = (worker) => {
  return {
    grants: require('./grants')(worker),
    rooms: require('./rooms')(worker),
    users: require('./users')(worker),
    states: require('./states')(worker),
    messages: require('./messages')(worker)
  }
}
