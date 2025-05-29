import { authClient } from "~/server/services/auth/auth-client";
import { SignupPayload, SigninPayload } from "~/types/user";

// schemas
import { z } from "zod";

export const signupPayloadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  role: z.enum(["initiator", "participant"]),
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

// start ------------------------------ google ------------------------------
export const betterAuthGoogle = async () => {
  await authClient.signIn.social({
    provider: "google",
  });
};
