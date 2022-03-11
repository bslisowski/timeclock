var aws = require('aws-sdk');
var ddb = new aws.DynamoDB();

exports.handler = async (event, context) => {
  let date = new Date();

  if (event.request.userAttributes.sub){
    let params = {
      Item: {
        __typename: { S: 'User' },
        _lastChangedAt: { N: date.toString() },
        _version: { N: "1" },
        createdAt: { S: date.toISOString() },
        updatedAt: { S: date.toISOString() },
        id: { S: event.request.userAttributes.sub },
        name: { S: event.request.userAttributes.email }
      },
      TableName: process.env.USERTABLE
    }
    try {
      await ddb.putItem(params).promise();
      console.log("Success");
    } catch (error) {
      console.log("Error", error);
    }
    context.done(null, event);
  } else {
    console.log("Error: Nothing was written to DynamoDB");
    context.done(null, event);
  }
}