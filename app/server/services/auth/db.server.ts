import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  /*
   * database
   */
  trustedOrigins: [process.env.APP_BASE_URL as string],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  /*
   * email and password
   */
  emailAndPassword: {
    enabled: true,
  },

  /*
   * social providers
   * google
   */
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_ID as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET as string,
    },
  },

  /*
   * additional fields
   */
  user: {
    additionalFields: {
      role: { type: "string", required: false, default: null, nullable: true },
      phone: { type: "string", required: false, default: null, nullable: true },
      phoneVerified: {
        type: "boolean",
        required: false,
        default: false,
      },
      profileCompleted: {
        type: "boolean",
        required: false,
        default: false,
      },
    },
  },
});

// session
export const getSession = async (request: Request) => {
  const session = await auth.api.getSession(request);
  return session;
};
