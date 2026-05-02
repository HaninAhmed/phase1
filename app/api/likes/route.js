import { NextResponse } from "next/server";
import { toggleLike } from "../../../repos/dataRepo.js";

// toggle a like on a post
export async function POST(request) {
  try {
    const { userId, postId } = await request.json();

    if (!userId || !postId) {
      return NextResponse.json(
        { error: "userId and postId are required." },
        { status: 400 }
      );
    }

    const result = await toggleLike({ userId, postId });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Like toggle error:", error);
    return NextResponse.json(
      { error: "Failed to toggle like." },
      { status: 500 }
    );
  }
}