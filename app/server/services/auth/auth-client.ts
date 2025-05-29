import { NavigateFunction } from "@remix-run/react";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "http://localhost:5173",
  trustedOrigins: ["http://localhost:5173"],
});

// start ------------------------------ google ------------------------------
export const betterAuthGoogle = async () => {
  const data = await authClient.signIn.social({
    /**
     * The social provider ID
     * @example "github", "google", "apple"
     */
    provider: "google",
    /**
     * A URL to redirect after the user authenticates with the provider
     * @default "/"
     */
    callbackURL: "/dashboard",
    /**
     * A URL to redirect if an error occurs during the sign in process
     */
    errorCallbackURL: "/error",
    /**
     * A URL to redirect if the user is newly registered
     */
    newUserCallbackURL: "/welcome",
    /**
     * disable the automatic redirect to the provider.
     * @default false
     */
    disableRedirect: true,
  });
  return data;
};
// end ------------------------------ google ------------------------------
// start ------------------------------ signout ------------------------------
export const betterAuthSignout = async (navigate: NavigateFunction) => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        console.log("signout success");
        navigate("/");
      },
    },
  });
};
// end ------------------------------ signout ------------------------------

import { SignupPayload, SigninPayload } from "~/types/user";

// schemas
import { z } from "zod";

export const signupPayloadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(20)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
    )
    .refine(
      (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
          password
        ),
      {
        message:
          "Password must be between 8 and 20 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
  confirmPassword: z
    .string()
    .min(8)
    .max(20)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
    ),
  role: z.enum(["user"]).optional(),
});

export const signinPayloadSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["initiator", "participant"]),
});

// functions

// generic
// start ------------------------------ signup ------------------------------
export const signup = async (signupPayload: SignupPayload) => {
  const { email, password, confirmPassword } =
    signupPayloadSchema.parse(signupPayload);

  if (password !== confirmPassword) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: "Password and confirm password do not match",
        data: null,
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // signup to save user
  // create user in database
  // create session

  const dummyData = {
    ok: true,
    message: "User registered successfully",
    data: {
      user: {
        id: "1",
        email,
        name: "John Doe",
      },
    },
  };

  return new Response(JSON.stringify(dummyData), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
// end ------------------------------ signup ------------------------------
// start ------------------------------ signin ------------------------------

export const signin = async (signinPayload: SigninPayload) => {
  const { email, password } = signinPayloadSchema.parse(signinPayload);
  // get user from storage

  const dummyData = {
    ok: true,
    message: "Authentication successful",
    data: {
      user: {
        id: "1",
        email,
        name: "John Doe",
      },
    },
  };

  return new Response(JSON.stringify(dummyData), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
// end ------------------------------ signin ------------------------------
