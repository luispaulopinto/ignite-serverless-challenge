import { APIGatewayProxyHandler } from "aws-lambda";
import IToDo from "src/entities/ToDo";
import { v4 as uuid } from "uuid";
import { document } from "../utils/dynamodbClient";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { userid } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as IToDo;

  await document
    .put({
      TableName: "users_todos",
      Item: {
        id: uuid(),
        userid,
        title,
        done: false,
        deadline: new Date(deadline).toUTCString(),
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo created successfully.",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
