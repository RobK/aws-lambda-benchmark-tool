import json
import timeit


def lambda_handler(event, context):
    """Sample pure Lambda function

    Parameters
    ----------
    event: dict, required
        API Gateway Lambda Proxy Input Format

        Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format

    context: object, required
        Lambda Context runtime methods and attributes

        Context doc: https://docs.aws.amazon.com/lambda/latest/dg/python-context-object.html

    Returns
    ------
    API Gateway Lambda Proxy Output Format: dict

        Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
    """

    s = """\
from solution import solution
from test_data import data
for data_set in data():
    solution(data_set)
    """


    return {
        "statusCode": 200,
        "body": json.dumps({
            "runtime": "Python-3.6",
            "benchmark": timeit.timeit(stmt=s, number=1) * 1000, # time returns time in seconds as a float - https://docs.python.org/2/library/timeit.html
            "execution": "Lambda Execution Time: %f in seconds" % ((20000 - context.get_remaining_time_in_millis ()) / 1000)
        })
    }
