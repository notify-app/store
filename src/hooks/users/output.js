'use strict'

module.exports = (worker) => {
  return (context, record) => {
    if (context.request.meta.headers !== undefined) delete record.password

    const eventName = `api:${context.request.type}:${context.request.method}`
    worker.emit(eventName, record, context)

    return record
  }
}
