using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;

using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;

namespace HelloWorld {
    public class Solution {
        public static int solve (int[] A) {
            HashSet<int> h = new HashSet<int> ();

            foreach (int val in A)
                if (val > 0)
                    h.Add (val);

            int minpostive = 1;

            foreach (int val in h) {
                if (val == minpostive)
                    do {
                        minpostive++;
                    }
                    while (h.Contains (minpostive));
            }

            return (int) minpostive;
        }
    }
}