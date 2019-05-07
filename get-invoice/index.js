const { logger } = require('../lib/logger')('get-invoice')
const getInvoice = require('../lib/get-invoice')

module.exports = async function (context, req) {
    logger('INFO', 'Received request')
    try {
        if (!req.body && req.body['pcCode']) throw Error('Include body in request')

        const invoice = getInvoice(req.body['pcCode'])
        // TODO: Return something else if that pc-code does not exist?
        context.res = {
            status: 200,
            body: invoice
        }
        
    } catch (error) {
        context.res = {
            status: 400,
            body: 'Body did not include the key "pcCode"' + error
        }
    }
};