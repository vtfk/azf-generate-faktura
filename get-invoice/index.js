const config = require('../config')
const {logger, config: logConfig} = require('../lib/logger')
const getInvoice = require('../lib/get-invoice')


module.exports = async function (context, req) {
    console.log(config.NODE_ENV)
    try {
        logConfig(req.body.eventSourceId)
    } catch {
        context.res = {
            status: 400,
            body: 'Body did not include the key "eventSourceId"'
        }
    }
    logger('info', ['get-invoice', 'Start'])

    if (!req.body || !req.body['pcCode']) {
        logger('error', ['get-invoice', 'No "pcCode" in body'])
        context.res = {
            status: 400,
            body: 'Body did not include the key "pcCode"'
        }
        return
    }

    try {
        const invoice = getInvoice(req.body['pcCode'])
        logger('info', ['get-invoice', 'pcCode', req.body.pcCode , 'PC-Code was found'])
        context.res = {
            status: 200,
            body: invoice
        }
    } catch (error) {
        logger('error', ['get-invoice', 'pcCode', req.body.pcCode , 'PC-Code was not found'])
        context.res = {
            status: 400,
            body: 'The requested PC-Code was not found'
        }
    }
    
};