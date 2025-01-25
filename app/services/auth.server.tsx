import { signupPayloadSchema } from "~/services/schemas/signup.schema";
import { signinPayloadSchema } from "~/services/schemas/signin.schema";
import { SignupPayload, SigninPayload } from "~/types/user";

// start ------------------------------ signup ------------------------------

export const signup = async (signupPayload: SignupPayload) => {
  const { email, password } = signupPayloadSchema.parse(signupPayload);
  // login to save user

  return {
    user: {
      id: "1",
      email,
      name: "John Doe",
    },
  };
};

// end ------------------------------ signup ------------------------------
// start ------------------------------ signin ------------------------------

export const signin = async (signinPayload: SigninPayload) => {
  const { email, password } = signinPayloadSchema.parse(signinPayload);
  // get user from storage

  return {
    user: {
      id: "1",
      email,
      name: "John Doe",
    },
  };
};

// end ------------------------------ signin ------------------------------
