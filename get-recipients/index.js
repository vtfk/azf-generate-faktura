const { logger, config } = require('../lib/logger')
const getGraphQL = require("../lib/get-graphql")
const formatRecipients = require('../lib/format-recipients')

module.exports = async function(context, req) {
  try {
      config(req.body.eventSourceId)
  } catch {
      context.res = {
          status: 400,
          body: 'Body did not include the key "eventSourceId" with a string value'
      }
  }
  logger('info', ['get-recipients', 'Start'])
  if (req.body && Array.isArray(req.body)) {
    try {
      const personNrs = req.body.map(person => person.personNr)
      logger('info', ['get-recipients', 'request data', 'amount', personNrs.length])
      let { persons } = await getGraphQL(personNrs)
      persons = persons.map(person => formatRecipients(person))
      context.res = {
        status: 200,
        body: persons
      }
    } catch (error) {
      logger('error', ['get-recipients', 'request data', 'error', error.message])
      context.res = {
        status: 500,
        body: `Something went wrong while processing the request. Error: ${error}`
      }
    }
  } else if (req.body && req.body.personNr && req.body.school) {
    try {
      logger('info', ['get-recipients', 'request data', 'birthdate', req.body.personNr.substr(0,6)])
      let { persons } = await getGraphQL([req.body.personNr])
      let person = persons[0]
      person.school = req.body.school
      persons = formatRecipients(person)
      context.res = {
        status: 200,
        body: persons
      }
    } catch (error) {
      logger('error', ['get-recipients', 'request data', 'birthdate', req.body.personNr.substr(0,6), 'error', error.message])

      context.res = {
        status: 500,
        body: "Something went wrong while processing the request."
      }
    }
  } else {
    logger('error', ['get-recipients', 'required keys was not in body'])
    context.res = {
      status: 400,
      body: "Please pass at least 'personNr' and 'school' keys in the body."
    }
  }
}
