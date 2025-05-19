import { type LoaderFunctionArgs } from "@remix-run/node";
import { userSession } from "../../../../services/sessions.server";

export const ROUTE_PATH = "/feature/dashboard" as const;

export async function loader({ request }: LoaderFunctionArgs): Promise<any> {
  // If user is already authenticated, redirect to dashboard
  //   const session = await userSession(request);
  //   const isAuthenticated = await session.isAuthenticated();
  //   console.log("validity at landing.loader.ts", isAuthenticated);
  //   if (isAuthenticated) {
  //     return redirect("/home");
  //   }
  // const session = await userSession(request);
  return null;
}
