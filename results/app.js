// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context) => {
  try {
    // const ret = await axios(url);
    response = {
      'statusCode': 200,
      'headers': {'content-type': 'text/plain'},
      'body': JSON.stringify({
        message: 'hello world',
        // location: ret.data.trim()
      }, null, 4)
    }
  } catch (err) {
    console.log(err);
    return err;
  }

  return response
};



const axios = require('axios');
const async = require('async');
const asTable = require ('as-table')

const BASE_URL = 'https://338zqtztzl.execute-api.eu-west-1.amazonaws.com/Prod';
const runTimes = [
  'dotnetcore1.0',
  'dotnetcore2.0',
  'dotnetcore2.1',
  'nodejs8.10',
  'nodejs6.10',
  'python2.7',
  'python3.6',
  'python3.7',
];

async.concat(runTimes, async (runTime) => { // run in parallel
    try {
      const response = await axios.get(`${BASE_URL}/${runTime}`);
      const data = response.data;
      return data
    } catch (error) {

      console.log('Error parsing', `${BASE_URL}/${runTime}`);
      // console.log(error);
    }
  },
  function (err, results) {
    // files is now a list of filenames that exist in the 3 directories
    console.log(results)
    // for (let result in results) {
    //   console.log()
    // }
    console.log(asTable(results))
  });