import { NextResponse } from "next/server";
import { getPostById, deletePost } from "../../../../repos/dataRepo.js";

//returns a single post with comments and likes
export async function GET(request, { params }) {
  try {
    const post = await getPostById(params.id);

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

//delete a post and its comments/likes
export async function DELETE(request, { params }) {
  try {
    await deletePost(params.id);
    return NextResponse.json({ message: "Post deleted." });
  } catch (error) {
    console.error("Delete post error:", error);
    return NextResponse.json(
      { error: "Failed to delete post." },
      { status: 500 }
    );
  }
}