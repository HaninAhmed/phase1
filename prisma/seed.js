import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    const user1 = await prisma.user.create({
        data: {
            username: "aisha",
            email: "aisha@hotmail.com",
            password: "12345678",
            bio: "I am a software developer.",
        },
    });

    const user2 = await prisma.user.create({
        data: {
            username: "maryam",
            email: "maryam@hotmail.com",
            password: "12345678",
            bio: "Maryam is here!",
        },
    });

    const user3 = await prisma.user.create({
        data: {
            username: "fatma",
            email: "fatma@hotmail.com",
            password: "12345678",
            bio: "I Love Reading Books",
        },
    });

    const user4 = await prisma.user.create({
        data: {
            username: "amna",
            email: "amna@hotmail.com",
            password: "12345678",
            bio: "I am new to Postify!",
        },
    });

    const post1 = await prisma.post.create({
        data: {
            content: "Hello World!",
            time: new Date().toLocaleDateString(),
            userId: user1.id,
        },
    });

    const post2 = await prisma.post.create({
        data: {
            content: "Good morning followers!",
            time: new Date().toLocaleDateString(),
            userId: user2.id,
        },
    });

    const post3 = await prisma.post.create({
        data: {
            content: "Can any one recommend a good book?",
            time: new Date().toLocaleDateString(),
            userId: user4.id,
        },
    });

    await prisma.comment.create({
        data: {
            text: "Welcome to Postify, Amna!",
            userId: user1.id,
            postId: post3.id,
        },
    });

    await prisma.comment.create({
        data: {
            text: "I recommend 'Atomic Habits' by James Clear.",
            userId: user2.id,
            postId: post3.id,
        },
    });

    await prisma.like.create({
        data: {
            userId: user1.id,
            postId: post3.id,
        },
    });

    await prisma.follow.create({
        data: {
            followerId: user1.id,
            followingId: user2.id,
        },
    });
}


main()
    .then(() => {
        console.log('Seeding completed successfully.');
        prisma.$disconnect();
    })
    .catch((error) => {
        console.error('Error seeding data:', error);
        prisma.$disconnect();
    });
