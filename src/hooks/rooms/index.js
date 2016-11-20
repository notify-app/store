'use strict'

module.exports = (worker) => {
  return [require('./input')(worker)]
}
