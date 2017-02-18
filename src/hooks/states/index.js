'use strict'

module.exports = (worker) => {
  return [null, require('./output')(worker)]
}
