import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDBAdapter } from "@auth/dynamodb-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const client = new DynamoDB({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  region: process.env.AWS_REGION,
});

const dynamoClient = DynamoDBDocument.from(client);

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      name?: string;
    };
  }
}

// 관리자 계정 조회 함수
async function getAdminUser(email: string) {
  try {
    const result = await dynamoClient.get({
      TableName: "AdminUsers",
      Key: {
        email: email,
      },
    });

    return result.Item;
  } catch (error) {
    console.error("Error fetching admin user:", error);
    return null;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: DynamoDBAdapter(dynamoClient as any),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const adminUser = await getAdminUser(credentials.email);

        if (!adminUser) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(credentials.password, adminUser.password);

        if (isValidPassword) {
          return {
            id: adminUser.email,
            email: adminUser.email,
            name: adminUser.name,
            role: adminUser.role,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async session({ session }) {
      if (session?.user) {
        const adminUser = await getAdminUser(session.user.email);
        if (adminUser) {
          session.user.role = adminUser.role;
          session.user.name = adminUser.name;
        }
      }
      return session;
    },
  },
};
