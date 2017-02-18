'use strict'

module.exports = (worker) => {
  return (context, record) => {
    const eventName = `api:${context.request.type}:${context.request.method}`
    worker.emit(eventName, record, context)

    // Unread info of a user should be retrieved from the user endpoint.
    delete record.unread

    return record
  }
}
