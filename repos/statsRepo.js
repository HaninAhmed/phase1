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

 
// ── Statistic 1 ───
// Most active user (user with the most posts)
export async function getMostActiveUser() {
  const user = await prisma.user.findFirst({
    orderBy: {
      posts: { _count: "desc" },
    },
    select: {
      username: true,
      _count: { select: { posts: true } },
    },
  });
  return user;
}
 
// ── Statistic 2 
// Total counts for the platform overview
export async function getPlatformOverview() {
  const [totalUsers, totalPosts, totalComments, totalLikes, totalFollows] =
    await Promise.all([
      prisma.user.count(),
      prisma.post.count(),
      prisma.comment.count(),
      prisma.like.count(),
      prisma.follow.count(),
    ]);
  return { totalUsers, totalPosts, totalComments, totalLikes, totalFollows };
}
 
// ── Statistic 3 
// Most liked post
export async function getMostLikedPost() {
  const post = await prisma.post.findFirst({
    orderBy: {
      likes: { _count: "desc" },
    },
    select: {
      content: true,
      user: { select: { username: true } },
      _count: { select: { likes: true } },
    },
  });
  return post;
}
 
//  Statistic 4 
// Most commented post
export async function getMostCommentedPost() {
  const post = await prisma.post.findFirst({
    orderBy: {
      comments: { _count: "desc" },
    },
    select: {
      content: true,
      user: { select: { username: true } },
      _count: { select: { comments: true } },
    },
  });
  return post;
}
 
//  Statistic 5 
// Most followed user
export async function getMostFollowedUser() {
  const user = await prisma.user.findFirst({
    orderBy: {
      followers: { _count: "desc" },
    },
    select: {
      username: true,
      _count: { select: { followers: true } },
    },
  });
  return user;
}
 
// Statistic 6 
// Average number of posts per user
export async function getAvgPostsPerUser() {
  const totalPosts = await prisma.post.count();
  const totalUsers = await prisma.user.count();
  if (totalUsers === 0) return 0;
  return (totalPosts / totalUsers).toFixed(2);
}
 
// Statistic 7 

// Top 3 most active users by post count
export async function getTop3ActiveUsers() {
  const users = await prisma.user.findMany({
    orderBy: {
      posts: { _count: "desc" },
    },
    take: 3,
    select: {
      username: true,
      _count: { select: { posts: true } },
    },
  });
  return users;
}
 
// Statistic 8 
// User who gave the most likes
export async function getMostLikingUser() {
  const user = await prisma.user.findFirst({
    orderBy: {
      likes: { _count: "desc" },
    },
    select: {
      username: true,
      _count: { select: { likes: true } },
    },
  });
  return user;
}