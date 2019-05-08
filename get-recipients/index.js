const getGraphQL = require("../lib/get-graphql")
const formatRecipients = require('../lib/format-recipients')

module.exports = async function(context, req) {
  if (req.body && Array.isArray(req.body)) {
    try {
      const personNrs = req.body.map(person => person.personNr)
      let { persons } = await getGraphQL(personNrs)
      persons = persons.map(person => formatRecipients(person))
      context.res = {
        status: 200,
        body: persons
      }
    } catch (error) {
      context.log.error(error)

      context.res = {
        status: 500,
        body: "Something went wrong while processing the request."
      }
    }
  } else if (req.body && req.body.personNr && req.body.school) {
    try {
      let { persons } = await getGraphQL([req.body.personNr])
      let person = persons[0]
      person.school = req.body.school
      persons = formatRecipients(person)
      context.res = {
        status: 200,
        body: persons
      }
    } catch (error) {
      context.log.error(error)

      context.res = {
        status: 500,
        body: "Something went wrong while processing the request."
      }
    }
  } else {
    context.res = {
      status: 400,
      body: "Please pass at least 'personNr' and 'school' keys in the body."
    }
  }
}
