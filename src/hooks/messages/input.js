'use strict'

module.exports = (worker) => {
  return (context, record, updated) => {
    const eventName = `api:${context.request.type}:${context.request.method}`
    worker.emit(eventName, record, updated)
  }
}
