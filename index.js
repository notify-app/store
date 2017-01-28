'use strict'

const fortune = require('fortune')
const mongodbAdapter = require('fortune-mongodb')

const types = require('./src/types')
const hooks = require('./src/hooks')

module.exports = {
  /**
   * types of the models used by the store.
   * @type {Object}
   */
  types: types,

  /**
   * fortune instance being used by the store.
   * @type {Fortune}
   */
  fortune: fortune,

  /**
   * fortune store. This is the instance used to make CRUD operations.
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
   *                                      authorized to access/alter the data.
   */
  init (config) {
    this.store = createFortuneStore.call(this, config)
    includeAuthorization(this, config.authorize)
  }
}

/**
 * createFortuneStore creates and configures the fortune store.
 * @return {FortuneStore}  Fortune store instance.
 */
function createFortuneStore ({ url, worker }) {
  const opts = {
    adapter: [ mongodbAdapter, { url } ]
  }

  // If store is initialized with a worker IPC-Emitter, make sure that the
  // worker gets notified whenever a record is Created, Modified or Deleted.
  if (worker !== undefined) opts.hooks = hooks(worker)

  return fortune(retrieveModels(), opts)
}

/**
 * retrieveModels retrieves the models to be used in the new fortune store.
 * @return {Object}  Models to be used in the store.
 */
function retrieveModels () {
  const models = {}

  Object.keys(types).forEach(key => {
    models[types[key]] = require(`./src/models/${key}`)
  })

  return models
}

/**
 * includeAuthorization includes the authorization function inside the FortuneJS
 * store.
 * @param  {Object} notifyStore  Notify Store instance.
 * @param  {Function} authorize  Authorize function provided by the user.
 */
function includeAuthorization (notifyStore, authorize) {
  // If no authorize function is provided do nothing.
  if (typeof authorize !== 'function') return

  // Else we need to wrap the Notify Store request function with our own.
  const originalRequest = notifyStore.store.request.bind(notifyStore.store)

  notifyStore.store.request = function request (options) {
    let promise = Promise.resolve()

    // Invoke the custom authorize function whenever the CRUD request is an HTTP
    // request.
    if ('meta' in options && 'headers' in options.meta) {
      promise = authorize(notifyStore, options)
    }

    return promise.then(() => originalRequest(options))
  }
}
