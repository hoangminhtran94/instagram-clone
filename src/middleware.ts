import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
export const middleware = async (req: NextRequest) => {
  const jwt_token = req.cookies.get("jwt_token");
  const token = jwt_token?.value;
  try {
    const response = await fetch("http:localhost:3000/api/checkAuth", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    const user = data?.user;
    if (!user) {
      return NextResponse.redirect(new URL("/accounts/login", req.url));
    }
    (req as any).user = user;
  } catch (error) {
    return NextResponse.redirect(new URL("/accounts/login", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/api/post", "/"],
};
