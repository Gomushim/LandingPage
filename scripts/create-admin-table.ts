import { DynamoDB, ScalarAttributeType, KeyType } from "@aws-sdk/client-dynamodb";

const client = new DynamoDB({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  region: process.env.AWS_REGION,
});

async function createAdminTable() {
  try {
    const params = {
      TableName: "AdminUsers",
      KeySchema: [{ AttributeName: "email", KeyType: KeyType.HASH }],
      AttributeDefinitions: [{ AttributeName: "email", AttributeType: ScalarAttributeType.S }],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    };

    const result = await client.createTable(params);
    console.log("테이블이 생성되었습니다:", result);
  } catch (error) {
    if ((error as any).name === "ResourceInUseException") {
      console.log("테이블이 이미 존재합니다.");
    } else {
      console.error("테이블 생성 중 오류 발생:", error);
    }
  }
}

createAdminTable();
