'use strict'

module.exports = () => {
  return (context, record) => {
    delete record.token
    return record
  }
}
