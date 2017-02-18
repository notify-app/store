'use strict'

module.exports = (worker) => {
  return (context, record) => {
    const eventName = `api:${context.request.type}:${context.request.method}`
    worker.emit(eventName, record, context)

    // Room info of a message should be retrieved from the message endpoint.
    delete record.messages

    return record
  }
}
