const { logger } = require('../lib/logger')('get-invoice')
const getInvoice = require('../lib/get-invoice')

module.exports = async function (context, req) {
    logger('INFO', 'Received request')
    if (!req.body || !req.body['pcCode']) {
        context.res = {
            status: 400,
            body: 'Body did not include the key "pcCode"'
        }
        return
    }

    try {
        const invoice = getInvoice(req.body['pcCode'])
        context.res = {
            status: 200,
            body: invoice
        }
    } catch (error) {
        context.res = {
            status: 400,
            body: 'The requested PC-Code was not found'
        }
    }
    
};