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
