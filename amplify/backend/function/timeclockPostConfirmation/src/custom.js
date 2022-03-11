const aws = require("aws-sdk");
const ddb = new aws.DynamoDB();

const tableName = process.env.USERTABLE;

exports.handler = async (event) => {
  // save a new user to DynamoDB
  if (!event?.request?.userAttributes?.sub){
    console.log("no sub provided");
    return;
  }

  const now = new Date();
  const timestamp = now.getTime();

  const userItem = {
    __typename: { S: 'User' },
    _lastChangedAt: { N: timestamp.toString() },
    _version: { N: "1" },
    createdAt: { S: now.toISOString() },
    updatedAt: { S: now.toISOString() },
    id: { S: event.request.userAttributes.sub },
    name: { S: event.request.userAttributes.name },
    username: { S: event.request.userAttributes.preferred_username },
    isManager: { BOOL: true },
    employer: { S: "Stoltzfus Family Foods" }
  }

  const params = {
    Item: userItem,
    TableName: tableName
  };
  
  try {
    await ddb.putItem(params).promise();
    console.log("success");
  } catch (e) {
    console.log(e);
  }

};
