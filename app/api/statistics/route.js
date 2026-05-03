import { NextResponse } from "next/server";
import {
  getMostActiveUser,
  getPlatformOverview,
  getMostLikedPost,
  getMostCommentedPost,
  getMostFollowedUser,
  getAvgPostsPerUser,
  getTop3ActiveUsers,
  getMostLikingUser,
} from "@/repos/statsRepo.js";

export async function GET() {
  try {
    const [
      mostActiveUser,
      platformOverview,
      mostLikedPost,
      mostCommentedPost,
      mostFollowedUser,
      avgPostsPerUser,
      top3ActiveUsers,
      mostLikingUser,
    ] = await Promise.all([
      getMostActiveUser(),
      getPlatformOverview(),
      getMostLikedPost(),
      getMostCommentedPost(),
      getMostFollowedUser(),
      getAvgPostsPerUser(),
      getTop3ActiveUsers(),
      getMostLikingUser(),
    ]);

    return NextResponse.json({
      mostActiveUser,
      platformOverview,
      mostLikedPost,
      mostCommentedPost,
      mostFollowedUser,
      avgPostsPerUser,
      top3ActiveUsers,
      mostLikingUser,
    });
  } catch (error) {
    console.error("Statistics API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}