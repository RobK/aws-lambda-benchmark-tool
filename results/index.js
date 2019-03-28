const axios = require('axios');
const async = require('async');
const asTable = require('as-table')

const BASE_URL = 'https://a111u0z5x2.execute-api.eu-west-1.amazonaws.com/Prod';
const RUNTIMES = [
  'dotnetcore1.0',
  'dotnetcore2.0',
  'dotnetcore2.1',
  'nodejs8.10',
  'nodejs6.10',
  'python2.7',
  'python3.6',
  'python3.7',
];

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
exports.handler = async (event, context) => {

  let responses = [];

  for (let runTime in RUNTIMES) {
    responses.push(getResult(RUNTIMES[runTime])); // run requests in parallel
  }

  let result = await Promise.all(responses); // wait for all parallel requests to complete

  return {
    statusCode: 200,
    headers: {
      "content-type": "text/plain"
    },
    body: asTable(result)
  }

}

const getResult = async (runTime) => {
  try {
    const response = await axios.get(`${BASE_URL}/${runTime}`);
    const data = response.data;
    return data
  } catch (error) {

    console.log(`'Error parsing: ${BASE_URL}/${runTime}`);
    // console.log(error);
    return {};
  }
}