'use strict'

const fortune = require('fortune')
const mongodbAdapter = require('fortune-mongodb')

const types = require('./src/types')
const hooks = require('./src/hooks')

module.exports = {
  /**
   * types being used by the store
   * @type {Object}
   */
  types: types,

  /**
   * worker is an IPC-Emitter worker, which will be used to inform its master.
   * @type {Object}
   */
  worker: null,

  /**
   * fortune store.
   * @type {FortuneStore}
   */
  store: null,

  /**
   * init is used to initialize the store.
   * @param  {String}   config.url        URL to connect with the DB.
   * @param  {Function} config.authorize  Function to be invoked by FortuneJS
   *                                      before making any requests to the
   *                                      Adapter being used. This is used to
   *                                      verify that the consumer actually is
   *                                      authorized to access/modify the data
   *                                      he is requesting.
   */
  init (config) {
    this.worker = config.worker
    this.store = createFortuneStore.call(this, config.url)
    includeAuthorization(this, config.authorize)
  }
}

/**
 * createFortuneStore creates and configures the fortune store.
 * @return {FortuneStore}  Fortune store instance.
 */
function createFortuneStore (dbURL) {
  const models = retrieveModels()

  const opts = {
    adapter: [
      mongodbAdapter,
      {
        url: dbURL
      }
    ]
  }

  if (this.worker !== undefined) opts.hooks = hooks(this.worker)

  return fortune(models, opts)
}

/**
 * retrieveModels retrieves the models to be used in the new fortune store.
 * @return {Object}  Models to be used in the store.
 */
function retrieveModels () {
  const keys = Object.keys(types)

  const models = {}

  for (var i = 0; i < keys.length; i++) {
    const key = keys[i]
    models[types[key]] = require(`./src/models/${key}`)
  }

  return models
}

/**
 * includeAuthorization includes the authorization function inside the FortuneJS
 * store.
 * @param  {Object} notifyStore  Notify Store instance.
 * @param  {Function} authorize  Authorize function provided by the user.
 */
function includeAuthorization (notifyStore, authorize) {
  if (typeof authorize !== 'function') return

  const originalRequest = notifyStore.store.request.bind(notifyStore.store)

  notifyStore.store.request = function request (options) {
    let promise = Promise.resolve()

    if ('meta' in options && 'headers' in options.meta) {
      promise = authorize(notifyStore, options)
    }

    return promise
      .then(function () {
        return originalRequest(options)
      })
  }
}
