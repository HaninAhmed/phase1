import { NextResponse } from "next/server";
import { getFeedPosts, createPost } from "@/repos/dataRepo.js";

// GET /api/posts?userId=123  →  returns feed posts for that user
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required." },
        { status: 400 }
      );
    }

    const posts = await getFeedPosts(userId);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Get feed error:", error);
    return NextResponse.json({ error: "Failed to load feed." }, { status: 500 });
  }
}

// POST /api/posts  →  create a new post
export async function POST(request) {
  try {
    const { content, userId, media } = await request.json();

    if (!content || !userId) {
      return NextResponse.json(
        { error: "Content and userId are required." },
        { status: 400 }
      );
    }

    const post = await createPost({ content, userId, media });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Create post error:", error);
    return NextResponse.json(
      { error: "Failed to create post." },
      { status: 500 }
    );
  }
}