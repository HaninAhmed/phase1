import { NextResponse } from "next/server";
import {
  createUser,
  isUsernameTaken,
  isEmailTaken,
} from "../../../repos/dataRepo.js";

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    // Basic validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (username.length < 3) {
      return NextResponse.json(
        { error: "Username must be at least 3 characters." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    // Check for duplicates
    if (await isUsernameTaken(username)) {
      return NextResponse.json(
        { error: "That username is already taken." },
        { status: 409 }
      );
    }

    if (await isEmailTaken(email)) {
      return NextResponse.json(
        { error: "An account with that email already exists." },
        { status: 409 }
      );
    }

    const user = await createUser({ username, email, password });

    return NextResponse.json(
      { id: user.id, username: user.username, email: user.email },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Registration failed." }, { status: 500 });
  }
}