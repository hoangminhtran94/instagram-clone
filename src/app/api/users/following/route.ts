import { followAction } from "@/actions/action";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = (await req.json()) as { followingId: string };
  try {
    await followAction(data.followingId);
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
