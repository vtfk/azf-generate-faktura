module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  GRAPHQL_URL: process.env.GRAPHQL_URL,
  GRAPHQL_JWT: process.env.GRAPHQL_JWT,
  PAPERTRAIL_HOST: process.env.PAPERTRAIL_HOST,
  PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT,
  PAPERTRAIL_HOSTNAME: process.env.PAPERTRAIL_HOSTNAME
}