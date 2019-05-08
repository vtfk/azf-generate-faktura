const { logger } = require('../lib/logger')('filter-duplicates')
const filterDuplcates = require('../lib/filter-duplicates')


module.exports = async function (context, req) {
    logger('INFO', 'Received request')
    try {
        if (!req.body) throw Error('Include body in request')
        const persons = Array.isArray(req.body) ? req.body : [req.body]
        const uniquePersons = filterDuplcates(persons)

        context.res = {
            status: 200,
            body: uniquePersons
        }
        
    } catch (error) {
        context.res = {
            status: 400,
            body: "Please pass an array of objects with at least a key 'personNr'"
        }
    }
};