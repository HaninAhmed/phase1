import { NextResponse } from "next/server";
import { getPostById, deletePost } from "../../../../repos/dataRepo.js";

// GET /api/posts/[id] this willl returns a single post with comments and likes
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const post = await getPostById(id);

    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Get post error:", error);
    return NextResponse.json(
      { error: "Failed to load post." },
      { status: 500 }
    );
  }
}

//this will delete a post and its comments/likes
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await deletePost(id);
    return NextResponse.json({ message: "Post deleted." });
  } catch (error) {
    console.error("Delete post error:", error);
    return NextResponse.json(
      { error: "Failed to delete post." },
      { status: 500 }
    );
  }
}