import { NextRequest, NextResponse } from "next/server";
import { getSuggestion } from "@/actions/action";

export const GET = async (req: NextRequest) => {
  try {
    const suggestions = await getSuggestion();
    return NextResponse.json(suggestions, { status: 200 });
  } catch (error) {
    NextResponse.json({ message: "Failed to fetch" }, { status: 500 });
  }
};
