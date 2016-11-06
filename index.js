'use strict'

const fortune = require('fortune')
const mongodbAdapter = require('fortune-mongodb')

const types = require('./src/types')

module.exports = {
  /**
   * types being used by the store
   * @type {Object}
   */
  types: types,

  /**
   * fortune store.
   * @type {FortuneStore}
   */
  store: null,

  /**
   * init is used to initialize the store.
   * @param  {String} config.url  URL to connect with the DB.
   */
  init (config) {
    this.store = createFortuneStore(config.url)
  }
}

/**
 * createFortuneStore creates and configures the fortune store.
 * @return {FortuneStore}  Fortune store instance.
 */
function createFortuneStore (dbURL) {
  const models = retrieveModels()

  return fortune(models, {
    adapter: [
      mongodbAdapter,
      {
        url: dbURL
      }
    ]
  })
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
