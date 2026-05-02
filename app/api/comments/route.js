import { NextResponse } from "next/server";
import { createComment, deleteComment } from "../../../repos/dataRepo.js";

// POST /api/comments  →  add a comment to a post
export async function POST(request) {
  try {
    const { text, userId, postId } = await request.json();

    if (!text || !userId || !postId) {
      return NextResponse.json(
        { error: "text, userId, and postId are required." },
        { status: 400 }
      );
    }

    const comment = await createComment({ text, userId, postId });
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Create comment error:", error);
    return NextResponse.json(
      { error: "Failed to add comment." },
      { status: 500 }
    );
  }
}

// DELETE /api/comments  →  delete a comment by id
export async function DELETE(request) {
  try {
    const { commentId } = await request.json();

    if (!commentId) {
      return NextResponse.json(
        { error: "commentId is required." },
        { status: 400 }
      );
    }

    await deleteComment(commentId);
    return NextResponse.json({ message: "Comment deleted." });
  } catch (error) {
    console.error("Delete comment error:", error);
    return NextResponse.json(
      { error: "Failed to delete comment." },
      { status: 500 }
    );
  }
}