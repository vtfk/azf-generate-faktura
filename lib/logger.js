function logger (appName, level, message) {
  const time = new Date().toUTCString()
  console.log(`${time} | ${level.toUpperCase()} | ${appName} | ${message}`)
}

module.exports = (appName) => {
  return {
    logger: (level, message) => logger(appName, level, message)
  }
}