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

  interface User {
    role?: string;
  }
}

// 관리자 계정 조회 함수
async function getAdminUser(email: string) {
  try {
    console.log("Fetching admin user for email:", email);
    const result = await dynamoClient.get({
      TableName: "AdminUsers",
      Key: {
        email: email,
      },
    });

    console.log("DynamoDB 응답:", JSON.stringify(result, null, 2));
    return result.Item;
  } catch (error) {
    console.error("DynamoDB 조회 에러:", error);
    throw error;
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
        try {
          console.log("로그인 시도:", credentials?.email);

          if (!credentials?.email || !credentials?.password) {
            console.log("이메일 또는 비밀번호 누락");
            throw new Error("이메일과 비밀번호를 입력해주세요.");
          }

          const adminUser = await getAdminUser(credentials.email);
          console.log("조회된 관리자 정보:", adminUser);

          if (!adminUser) {
            console.log("관리자를 찾을 수 없음");
            throw new Error("등록되지 않은 관리자입니다.");
          }

          const isValidPassword = await bcrypt.compare(credentials.password, adminUser.password);

          console.log("비밀번호 검증 결과:", isValidPassword);

          if (!isValidPassword) {
            console.log("비밀번호 불일치");
            throw new Error("비밀번호가 일치하지 않습니다.");
          }

          return {
            id: adminUser.email,
            email: adminUser.email,
            name: adminUser.name,
            role: adminUser.role,
          };
        } catch (error) {
          console.error("인증 과정 에러:", error);
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login", // 에러 발생 시 로그인 페이지로 리다이렉트
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
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  debug: process.env.NODE_ENV === "development", // 개발 환경에서만 디버그 모드 활성화
};
