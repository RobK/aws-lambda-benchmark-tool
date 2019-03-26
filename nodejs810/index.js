/**
 * Created by Robert Kehoe on 26/03/19.
 * MIT License, see included project license
 */

const data = require("./test-data");
const solution = require("./solution");

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * callback doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html#nodejs-prog-model-handler-callback
 * @param {Object} callback
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.handler = async (event, context, callback) => { // async only works in Node 8.10 runtime
  let response;
  const NS_PER_SEC = 1e9;
  const time = process.hrtime();

  try {
    for (let testIndex in data) {
      // Contrary to best practices don't want to cache this result
      // https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html
      console.log(solution(data[testIndex]));
    }
    const diff = process.hrtime(time);

    // const ret = await axios(url);
    response = {
      'statusCode': 200,
      'body': JSON.stringify({
        runtime: 'NOdeJs-8.10',
        benchmark: `Benchmark took ${diff[0] * NS_PER_SEC + diff[1]} nanoseconds (${(diff[0] * NS_PER_SEC + diff[1] / 1000000)} milliseconds)`,
        execution: `Lambda Execution Time: ${10000 - context.getRemainingTimeInMillis()} milliseconds`
      })
    }
  } catch (err) {
    console.log(err);
    return err;
  }

  return callback(null, response);
};
