import { NextResponse } from "next/server";
import {
  getUserByUsername,
  updateUser,
  getPostsByUser,
  isUsernameTaken,
} from "../../../../repos/dataRepo.js";

// GET /api/users/[username]  →  returns profile data + posts
export async function GET(request, { params }) {
  try {
    const user = await getUserByUsername(params.username);

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const posts = await getPostsByUser(user.id);

    return NextResponse.json({ ...user, posts });
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json(
      { error: "Failed to load profile." },
      { status: 500 }
    );
  }
}

// PUT /api/users/[username]  →  update profile (username, bio, photo)
export async function PUT(request, { params }) {
  try {
    const currentUser = await getUserByUsername(params.username);

    if (!currentUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const { username, bio, photo } = await request.json();

    // If username changed, make sure the new one is not taken
    if (username && username !== params.username) {
      if (await isUsernameTaken(username)) {
        return NextResponse.json(
          { error: "That username is already taken." },
          { status: 409 }
        );
      }
    }

    const updated = await updateUser(currentUser.id, {
      username: username || currentUser.username,
      bio: bio ?? currentUser.bio,
      photo: photo ?? currentUser.photo,
    });

    return NextResponse.json({
      id: updated.id,
      username: updated.username,
      bio: updated.bio,
      photo: updated.photo,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "Failed to update profile." },
      { status: 500 }
    );
  }
}