'use strict'

module.exports = (context, record) => {
  if (context.request.meta.headers !== undefined) delete record.password
  return record
}
