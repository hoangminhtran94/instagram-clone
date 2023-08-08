import { NextRequest, NextResponse } from "next/server";
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
      return NextResponse.json(
        { message: "Authentication failed" },
        { status: 403 }
      );
    }
  } catch (error) {
    return NextResponse.json({ messages: "Authentication failed" });
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/api/post"],
};
