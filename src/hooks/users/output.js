'use strict'

module.exports = (worker) => {
  return (context, record) => {
    const eventName = `api:${context.request.type}:${context.request.method}`
    worker.emit(eventName, record, context)

    // Internal ID should not be visible.
    delete record.internalID

    return record
  }
}
