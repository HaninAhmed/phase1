import { PrismaClient } from "@prisma/client";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "file:" + path.join(__dirname, "../prisma/dev.db"),
    },
  },
});


// Get a user by email (used for login)
export async function getUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

// Get a user by username (used for profile page)
export async function getUserByUsername(username) {
  return prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      email: true,
      bio: true,
      photo: true,
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
        },
      },
    },
  });
}

// Get a user by id
export async function getUserById(id) {
  return prisma.user.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      username: true,
      bio: true,
      photo: true,
      _count: {
        select: { followers: true, following: true, posts: true },
      },
    },
  });
}

// Create a new user (used for register)
export async function createUser({ username, email, password, bio = "" }) {
  return prisma.user.create({
    data: { username, email, password, bio },
  });
}

// Check if a username is already taken
export async function isUsernameTaken(username) {
  const user = await prisma.user.findUnique({ where: { username } });
  return user !== null;
}

// Check if an email is already taken
export async function isEmailTaken(email) {
  const user = await prisma.user.findUnique({ where: { email } });
  return user !== null;
}

// Update a user's profile
export async function updateUser(id, { username, bio, photo }) {
  return prisma.user.update({
    where: { id: parseInt(id) },
    data: { username, bio, photo },
  });
}


// Get posts for the feed: posts from people the user follows + their own posts
export async function getFeedPosts(userId) {
  const uid = parseInt(userId);

  // Get list of users that this user follows
  const following = await prisma.follow.findMany({
    where: { followerId: uid },
    select: { followingId: true },
  });

  const followingIds = following.map((f) => f.followingId);
  // Include the user's own posts too
  followingIds.push(uid);

  return prisma.post.findMany({
    where: { userId: { in: followingIds } },
    orderBy: { id: "desc" },
    select: {
      id: true,
      content: true,
      time: true,
      media: true,
      user: { select: { id: true, username: true, photo: true } },
      _count: { select: { likes: true, comments: true } },
      likes: { select: { userId: true } },
      comments: {
        select: {
          id: true,
          text: true,
          user: { select: { id: true, username: true } },
        },
        orderBy: { id: "asc" },
      },
    },
  });
}

// Get a single post by id with all its comments and likes
export async function getPostById(id) {
  return prisma.post.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      content: true,
      time: true,
      media: true,
      user: { select: { id: true, username: true, photo: true } },
      likes: { select: { userId: true } },
      _count: { select: { likes: true, comments: true } },
      comments: {
        select: {
          id: true,
          text: true,
          user: { select: { id: true, username: true } },
        },
        orderBy: { id: "asc" },
      },
    },
  });
}

// Get all posts by a specific user (for their profile page)
export async function getPostsByUser(userId) {
  return prisma.post.findMany({
    where: { userId: parseInt(userId) },
    orderBy: { id: "desc" },
    select: {
      id: true,
      content: true,
      time: true,
      media: true,
      _count: { select: { likes: true, comments: true } },
    },
  });
}

// Create a new post
export async function createPost({ content, userId, media = null }) {
  return prisma.post.create({
    data: {
      content,
      userId: parseInt(userId),
      media,
      time: new Date().toLocaleDateString(),
    },
  });
}

// Delete a post
export async function deletePost(id) {
  
  await prisma.comment.deleteMany({ where: { postId: parseInt(id) } });
  await prisma.like.deleteMany({ where: { postId: parseInt(id) } });
  return prisma.post.delete({ where: { id: parseInt(id) } });
}



// Add a comment to a post
export async function createComment({ text, userId, postId }) {
  return prisma.comment.create({
    data: {
      text,
      userId: parseInt(userId),
      postId: parseInt(postId),
    },
    select: {
      id: true,
      text: true,
      user: { select: { id: true, username: true } },
    },
  });
}

// Delete a comment
export async function deleteComment(id) {
  return prisma.comment.delete({ where: { id: parseInt(id) } });
}



// Toggle a like on a post 
export async function toggleLike({ userId, postId }) {
  const uid = parseInt(userId);
  const pid = parseInt(postId);

  const existing = await prisma.like.findFirst({
    where: { userId: uid, postId: pid },
  });

  if (existing) {
    await prisma.like.delete({ where: { id: existing.id } });
    return { liked: false };
  } else {
    await prisma.like.create({ data: { userId: uid, postId: pid } });
    return { liked: true };
  }
}



// Follow a user
export async function followUser({ followerId, followingId }) {
  return prisma.follow.create({
    data: {
      followerId: parseInt(followerId),
      followingId: parseInt(followingId),
    },
  });
}

// Unfollow a user
export async function unfollowUser({ followerId, followingId }) {
  const record = await prisma.follow.findFirst({
    where: {
      followerId: parseInt(followerId),
      followingId: parseInt(followingId),
    },
  });
  if (record) {
    return prisma.follow.delete({ where: { id: record.id } });
  }
}

// Check if user A follows user B
export async function isFollowing({ followerId, followingId }) {
  const record = await prisma.follow.findFirst({
    where: {
      followerId: parseInt(followerId),
      followingId: parseInt(followingId),
    },
  });
  return record !== null;
}
// Get all users (for follow/discover list) — returns only public fields
export async function getAllUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      bio: true,
      photo: true,
      _count: { select: { followers: true, following: true, posts: true } },
    },
    orderBy: { username: "asc" },
  });
}