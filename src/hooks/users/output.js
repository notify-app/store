'use strict'

module.exports = (worker) => {
  return (context, record) => {
    const eventName = `api:${context.request.type}:${context.request.method}`
    worker.emit(eventName, record, context)

    // Unread info should only be provided when requesting records by id.
    if (context.request.ids === null) delete record.unread
    // Internal ID should not be accessible by the client app.
    delete record.internalID
    // Author info of a message should be retrieved from the messages endpoint.
    delete record.messages

    return record
  }
}
