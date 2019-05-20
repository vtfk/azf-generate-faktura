const config = require('../config')
const pkg = require('../package.json')
const winston = require('winston')
require('winston-papertrail').Papertrail // eslint-disable-line no-unused-expressions

function getPapertrail () {
  return process.env.NODE_ENV !== 'production' ? {} : new winston.transports.Papertrail({
    host: config.PAPERTRAIL_HOST,
    port: config.PAPERTRAIL_PORT,
    hostname: config.PAPERTRAIL_HOSTNAME,
    logFormat: (level, message) => `${level.toUpperCase()} - ${message || ''}`
  })
}

const winstonPapertrail = getPapertrail()

const winstonConsole = new winston.transports.Console({
  format: options => `${new Date().toUTCString()} - ${options.level.toUpperCase()} - ${(options.message ? options.message : '')}`,
})

const winstonTransports = process.env.NODE_ENV !== 'production' ? [winstonConsole] : [winstonConsole, winstonPapertrail]

const logger = new winston.Logger({
  transports: winstonTransports
})

let eventSourceId

function configLogger (newEventSourceId) {
  if (typeof newEventSourceId !== 'string') { throw Error('Required parameter "eventSourceId" must be a string.') }
  eventSourceId = newEventSourceId
}

function loggerClient (eventSourceId, level, message) {
  const data = Array.isArray(message) ? message : [message]
  data.unshift(eventSourceId)
  const logMessage = `${pkg.name} - ${pkg.version}: ${data.join(' - ')}`
  return logger.log(level, logMessage)
}

module.exports = {
  config: (newEventSourceId) => configLogger(newEventSourceId),
  logger: (level, message) => loggerClient(eventSourceId, level, message)
}