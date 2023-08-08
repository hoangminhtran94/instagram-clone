import { RedirectType } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const verifyToken = async ({
  redirectIf,
  path,
}: {
  redirectIf: "authenticated" | "unauthenticated";
  path: string;
}) => {
  const jwt_token = cookies().get("jwt_token");
  if (redirectIf === "unauthenticated" && !jwt_token) {
    return redirect(path, RedirectType.push);
  }

  const token = jwt_token?.value;
  try {
    const response = await fetch("http:localhost:3000/api/checkAuth", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    const user = data?.user;
    const authCondition = redirectIf === "unauthenticated" ? !user : user;
    if (authCondition) {
      return redirect(path, RedirectType.push);
    }
  } catch (error) {
    return redirect(path, RedirectType.push);
  }
};
