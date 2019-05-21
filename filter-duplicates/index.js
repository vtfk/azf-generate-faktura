const { logger, config } = require('../lib/logger')
const filterDuplcates = require('../lib/filter-duplicates')
const nanoid = require('nanoid')


module.exports = async function (context, req) {
    if (!req.body) {
        throw Error('Body was not included in request')
    }
    const eventSourceId = req.body.eventSourceId || nanoid()
    try {
        config(eventSourceId)
    } catch {
        context.res = {
            status: 400,
            body: 'Body did not include the key "eventSourceId" with a string value'
        }
    }
    logger('info', ['filter-duplicates', 'Start'])
    try {
        if (!req.body || !req.body.persons) {
            logger('error', ['filter-duplicates', 'No body in request'])
            throw Error('Include body in request')
        }
        const persons = Array.isArray(req.body.persons) ? req.body.persons : [req.body.persons]
        logger('info', ['filter-duplicates', 'persons to filter', persons.length , 'Start filtering'])
        const uniquePersons = filterDuplcates(persons)
        logger('info', ['filter-duplicates', 'unique persons', uniquePersons.length , 'Done filtering'])

        const responseData = {
            eventSourceId,
            uniquePersons
        }

        context.res = {
            status: 200,
            body: responseData
        }
        
    } catch (error) {
        logger('error', ['filter-duplicates', 'error', error])
        context.res = {
            status: 400,
            body: error
        }
    }
};