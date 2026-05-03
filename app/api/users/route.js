import { NextResponse } from "next/server";
import { getAllUsers } from "@/repos/dataRepo.js";

// GET /api/users  — list all users (public info only)
export async function GET() {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json({ error: "Failed to fetch users." }, { status: 500 });
  }
}