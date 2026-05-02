import { NextResponse } from "next/server";
import {
  followUser,
  unfollowUser,
  isFollowing,
} from "../../../repos/dataRepo.js";


export async function POST(request) {
  try {
    const { followerId, followingId, action } = await request.json();

    if (!followerId || !followingId || !action) {
      return NextResponse.json(
        { error: "followerId, followingId, and action are required." },
        { status: 400 }
      );
    }

    if (action === "follow") {
      // Avoid duplicate follows
      const already = await isFollowing({ followerId, followingId });
      if (already) {
        return NextResponse.json({ message: "Already following." });
      }
      await followUser({ followerId, followingId });
      return NextResponse.json({ following: true });
    }

    if (action === "unfollow") {
      await unfollowUser({ followerId, followingId });
      return NextResponse.json({ following: false });
    }

    return NextResponse.json(
      { error: "action must be 'follow' or 'unfollow'." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Follow error:", error);
    return NextResponse.json(
      { error: "Follow action failed." },
      { status: 500 }
    );
  }
}


export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const followerId = searchParams.get("followerId");
    const followingId = searchParams.get("followingId");

    if (!followerId || !followingId) {
      return NextResponse.json(
        { error: "followerId and followingId are required." },
        { status: 400 }
      );
    }

    const following = await isFollowing({ followerId, followingId });
    return NextResponse.json({ following });
  } catch (error) {
    console.error("Follow check error:", error);
    return NextResponse.json(
      { error: "Failed to check follow status." },
      { status: 500 }
    );
  }
}