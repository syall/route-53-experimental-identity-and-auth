import {
  Route53Client,
  ListTrafficPoliciesCommand,
} from "@aws-sdk/client-route-53";

(async () => {
  // Assumes credentials are available through the default credential chain
  const client = new Route53Client({
    region: "us-east-1",
  });
  client.middlewareStack.identifyOnResolve(true);
  client.middlewareStack.addRelativeTo((next, context) => args => {
    // console.log(JSON.stringify(context, null, 2));
    return next(args);
  }, {
    name: "CUSTOM CONTEXT IDENTIFIER",
    toMiddleware: "httpSigningMiddleware",
    relation: "after",
  });
  const command = new ListTrafficPoliciesCommand({
  });
  console.log({
    response: await client.send(command)
  });
})();
