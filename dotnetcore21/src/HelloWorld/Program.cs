using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using Newtonsoft.Json;
using System.IO;
using System.Diagnostics;
using static HelloWorld.Solution;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly : LambdaSerializer (typeof (Amazon.Lambda.Serialization.Json.JsonSerializer))]


namespace HelloWorld {

    public class Function {

        public APIGatewayProxyResponse FunctionHandler (APIGatewayProxyRequest apigProxyEvent, ILambdaContext context) {

            var pathToJson = System.IO.Path.Combine(System.AppDomain.CurrentDomain.BaseDirectory,"test.json");
            var r = new StreamReader(pathToJson);
            var myJson = r.ReadToEnd();

            int[][] testData = Newtonsoft.Json.JsonConvert.DeserializeObject<int[][]>(myJson);


            int location = Solution.solve(testData[0]);
            // Dictionary<string, string> body = new Dictionary<string, type> { { "message", "hello world" },
            //     { "location", location },
            // };

            GC.Collect();
            Solution.solve(new int[1] {1}); // run once outside of loop to avoid initialization costs
            Stopwatch sw = Stopwatch.StartNew();
            for (int i = 0; i < testData.Length; i++)
            {
                Solution.solve(testData[i]);
            }
            sw.Stop();
            Console.WriteLine((sw.ElapsedMilliseconds / testData.Length).ToString());


            ApiResponse test = new ApiResponse();
            test.benchmark = "Benchmark took " + (sw.ElapsedMilliseconds).ToString() + " millseconds";
            test.result = sw.ElapsedMilliseconds;
            test.execution = "Lambda Execution Time: " + (20000 - context.RemainingTime.TotalMilliseconds).ToString();
            return new APIGatewayProxyResponse {
                Body = JsonConvert.SerializeObject (test),
                    StatusCode = 200,
                    Headers = new Dictionary<string, string> { { "Content-Type", "application/json" } }
            };
        }
    }

    public class ApiResponse
            {
                public string runtime = "dotnet2.1";
                public string benchmark { get; set; }
                public string execution { get; set; }
                public float result { get; set; }
            }
}