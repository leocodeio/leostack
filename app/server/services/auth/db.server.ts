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

/*
 * update user
 * @param name - the name of the user
 * @param email - the email of the user
 * @param phone - the phone of the user
 * @param role - the role of the user
 * @param emailVerified - the email verified of the user
 * @param phoneVerified - the phone verified of the user
 * @param profileCompleted - the profile completed of the user
 * @returns the updated user
 */
export const updateUser = async (
  id: string,
  name: string,
  phone: string,
  role: string
) => {
  const data: {
    name?: string;
    phone?: string;
    role?: string;
  } = {
    name,
  };

  if (phone) {
    data.phone = phone;
  }

  if (role) {
    data.role = role;
  }

  const user = await prisma.user.findUnique({
    where: { id },
  });

  const profileCompleted =
    (user?.phone || data.phone) && (user?.role || data.role) && user?.email
      ? true
      : false;

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      ...data,
      profileCompleted,
    },
  });
  return updatedUser;
};
