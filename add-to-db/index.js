const { promisify } = require("util");
const mongoDb = require("mongoist");
const urlParser = promisify(require("mongodb/lib/url_parser"));

module.exports = async function(context, req) {
  if (
    req.body &&
    typeof req.body.connString === "string" &&
    typeof req.body.collection === "string" &&
    typeof req.body.data === "object"
  ) {
    try {
      await urlParser(req.body.connString);
    } catch (error) {
      context.res = {
        status: 400,
        body: `Error in connectionstring: ${error.message}`
      };
    }
    try {
      const mongoConn = mongoDb(req.body.connString);
      const savedData = await mongoConn
        .collection(req.body.collection)
        .save(req.body.data);
      await mongoConn.close();

      context.res = {
        status: 200,
        body: savedData
      };
    } catch (error) {
      context.res = {
        status: 500,
        body: `Error in DB call: ${error.message}`
      };
    }
  } else {
    context.res = {
      status: 400,
      body:
        "Please pass the parameters 'connString'<String>, 'collection'<String> and 'data'<Object> in the request body"
    };
  }
};
