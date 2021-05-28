import { document } from "../utils/dynamodbClient";

export const handle = async (event) => {
  const { userid } = event.pathParameters;

  const response = await document
    .query({
      TableName: "users_todos",
      IndexName: "UserIdIndex",
      KeyConditionExpression: "userid = :userid",
      ExpressionAttributeValues: {
        ":userid": userid,
      },
      ScanIndexForward: false,
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      todos: response.Items,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
