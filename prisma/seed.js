import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear all tables in the right order (children before parents)
  await prisma.follow.deleteMany();
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // ─── USERS ────────────────────────────────────────────────────────────────
  const users = await Promise.all([
    prisma.user.create({ data: { username: "aisha",   email: "aisha@hotmail.com",   password: "12345678", bio: "Software developer & coffee lover." } }),
    prisma.user.create({ data: { username: "maryam",  email: "maryam@hotmail.com",  password: "12345678", bio: "Maryam is here! Love traveling 🌍" } }),
    prisma.user.create({ data: { username: "fatma",   email: "fatma@hotmail.com",   password: "12345678", bio: "Avid reader. Book recommendations welcome!" } }),
    prisma.user.create({ data: { username: "amna",    email: "amna@hotmail.com",    password: "12345678", bio: "New to Postify. Hello everyone!" } }),
    prisma.user.create({ data: { username: "sara",    email: "sara@hotmail.com",    password: "12345678", bio: "Fitness enthusiast and healthy cooking fan." } }),
    prisma.user.create({ data: { username: "noura",   email: "noura@hotmail.com",   password: "12345678", bio: "Photographer. Capturing life one shot at a time." } }),
    prisma.user.create({ data: { username: "leilaa",  email: "leila@hotmail.com",   password: "12345678", bio: "CS student at QU. Code by day, sleep by never." } }),
    prisma.user.create({ data: { username: "hessa",   email: "hessa@hotmail.com",   password: "12345678", bio: "Interior design lover. Making spaces beautiful." } }),
    prisma.user.create({ data: { username: "dana",    email: "dana@hotmail.com",    password: "12345678", bio: "Foodie. Always hunting for the best restaurant." } }),
    prisma.user.create({ data: { username: "reem",    email: "reem@hotmail.com",    password: "12345678", bio: "Music, art, and good vibes only." } }),
  ]);

  const [aisha, maryam, fatma, amna, sara, noura, leila, hessa, dana, reem] = users;

  // ─── POSTS ────────────────────────────────────────────────────────────────
  const posts = await Promise.all([
    // aisha - 4 posts
    prisma.post.create({ data: { content: "Just deployed my first Next.js app! Feels amazing. 🎉", time: "1/15/2026", userId: aisha.id } }),
    prisma.post.create({ data: { content: "Tip of the day: always write tests before you think you need them. You'll thank yourself later.", time: "2/3/2026", userId: aisha.id } }),
    prisma.post.create({ data: { content: "Who else is obsessed with TypeScript? It has saved me so many times.", time: "3/10/2026", userId: aisha.id } }),
    prisma.post.create({ data: { content: "Finally finished my portfolio website. Check it out and let me know what you think!", time: "4/1/2026", userId: aisha.id } }),
    // maryam - 3 posts
    prisma.post.create({ data: { content: "Good morning everyone! Starting the week with positive energy ✨", time: "1/20/2026", userId: maryam.id } }),
    prisma.post.create({ data: { content: "Just got back from Istanbul. Absolutely stunning city — the food, the history, the people. 10/10 recommend.", time: "2/18/2026", userId: maryam.id } }),
    prisma.post.create({ data: { content: "Trying to learn Arabic calligraphy. It's harder than it looks but so rewarding!", time: "3/25/2026", userId: maryam.id } }),
    // fatma - 4 posts
    prisma.post.create({ data: { content: "Can anyone recommend a good book? I just finished Atomic Habits and loved it.", time: "1/10/2026", userId: fatma.id } }),
    prisma.post.create({ data: { content: "Currently reading The Alchemist for the third time. Different meaning every time you read it.", time: "2/22/2026", userId: fatma.id } }),
    prisma.post.create({ data: { content: "Reading challenge update: 12 books in 3 months! Target was 10. Proud of myself 📚", time: "3/30/2026", userId: fatma.id } }),
    prisma.post.create({ data: { content: "Book club this Friday. We are discussing Educated by Tara Westover. Join us if you are in Doha!", time: "4/10/2026", userId: fatma.id } }),
    // amna - 2 posts
    prisma.post.create({ data: { content: "Hello Postify! This is my first post. Excited to connect with everyone here.", time: "2/1/2026", userId: amna.id } }),
    prisma.post.create({ data: { content: "What are some good accounts to follow on here? Looking for tech and book recommendations.", time: "2/5/2026", userId: amna.id } }),
    // sara - 3 posts
    prisma.post.create({ data: { content: "Morning run done! 5km before 7am. Who else is part of the early morning club? 🏃‍♀️", time: "1/25/2026", userId: sara.id } }),
    prisma.post.create({ data: { content: "Made a protein-packed quinoa salad today. Recipe in the comments!", time: "3/5/2026", userId: sara.id } }),
    prisma.post.create({ data: { content: "Gym progress: 3 months in and I can finally do 10 pull-ups. Hard work pays off!", time: "4/12/2026", userId: sara.id } }),
    // noura - 2 posts
    prisma.post.create({ data: { content: "Golden hour in Doha is something else. Every evening is a painting 🌅", time: "2/10/2026", userId: noura.id } }),
    prisma.post.create({ data: { content: "Just upgraded my camera. Cannot wait to start shooting. Any locations around Qatar to recommend?", time: "3/18/2026", userId: noura.id } }),
    // leila - 3 posts
    prisma.post.create({ data: { content: "Debugging for 3 hours only to find a missing semicolon. Classic.", time: "1/30/2026", userId: leila.id } }),
    prisma.post.create({ data: { content: "Prisma ORM is genuinely so clean to work with. Highly recommend for your next project.", time: "2/28/2026", userId: leila.id } }),
    prisma.post.create({ data: { content: "Finals week survival kit: coffee, dark mode, lo-fi music, and snacks. That's it.", time: "4/5/2026", userId: leila.id } }),
    // hessa - 2 posts
    prisma.post.create({ data: { content: "Redesigned my living room this weekend. Neutral tones and plants everywhere — love the result.", time: "2/14/2026", userId: hessa.id } }),
    prisma.post.create({ data: { content: "Minimalist design tip: when in doubt, take something away instead of adding more.", time: "3/22/2026", userId: hessa.id } }),
    // dana - 2 posts
    prisma.post.create({ data: { content: "Tried a new ramen place in Lusail today. Broth was incredible. Hidden gem!", time: "3/8/2026", userId: dana.id } }),
    prisma.post.create({ data: { content: "Hosting a dinner party this weekend. Any foolproof recipes for a crowd?", time: "4/8/2026", userId: dana.id } }),
    // reem - 2 posts
    prisma.post.create({ data: { content: "Discovered this amazing Qatari indie artist on Spotify. Check out Al Qamar, seriously talented.", time: "2/20/2026", userId: reem.id } }),
    prisma.post.create({ data: { content: "Went to the art exhibition at Mathaf today. The contemporary Arab art collection is stunning.", time: "4/14/2026", userId: reem.id } }),
  ]);

  const [
    p1, p2, p3, p4,       // aisha posts
    p5, p6, p7,           // maryam posts
    p8, p9, p10, p11,     // fatma posts
    p12, p13,             // amna posts
    p14, p15, p16,        // sara posts
    p17, p18,             // noura posts
    p19, p20, p21,        // leila posts
    p22, p23,             // hessa posts
    p24, p25,             // dana posts
    p26, p27,             // reem posts
  ] = posts;

  // ─── COMMENTS ─────────────────────────────────────────────────────────────
  await Promise.all([
    prisma.comment.create({ data: { text: "Congrats! Next.js is so powerful once you get going.", userId: maryam.id, postId: p1.id } }),
    prisma.comment.create({ data: { text: "Amazing! What did you build it on?", userId: leila.id, postId: p1.id } }),
    prisma.comment.create({ data: { text: "100% agree on the tests. Learned that lesson the hard way.", userId: leila.id, postId: p2.id } }),
    prisma.comment.create({ data: { text: "TypeScript is a game changer. No going back.", userId: aisha.id, postId: p3.id } }),
    prisma.comment.create({ data: { text: "Same! Once you try it you can't write plain JS anymore.", userId: leila.id, postId: p3.id } }),
    prisma.comment.create({ data: { text: "Your portfolio looks great! Love the dark theme.", userId: noura.id, postId: p4.id } }),
    prisma.comment.create({ data: { text: "Good morning! Hope you have a great week too!", userId: aisha.id, postId: p5.id } }),
    prisma.comment.create({ data: { text: "Istanbul is on my bucket list. What did you eat?", userId: dana.id, postId: p6.id } }),
    prisma.comment.create({ data: { text: "The simit and baklava are a must! Absolute heaven.", userId: maryam.id, postId: p6.id } }),
    prisma.comment.create({ data: { text: "Atomic Habits changed my life. Try Deep Work by Cal Newport next!", userId: aisha.id, postId: p8.id } }),
    prisma.comment.create({ data: { text: "Welcome to Postify Amna! Follow fatma for book recs.", userId: aisha.id, postId: p12.id } }),
    prisma.comment.create({ data: { text: "Follow aisha and leila for tech stuff!", userId: maryam.id, postId: p13.id } }),
    prisma.comment.create({ data: { text: "5km before 7am is goals! I can barely get up at 8 😂", userId: amna.id, postId: p14.id } }),
    prisma.comment.create({ data: { text: "What is the quinoa salad recipe? I need it please!", userId: maryam.id, postId: p15.id } }),
    prisma.comment.create({ data: { text: "The light here during golden hour is unreal. Beautiful shot!", userId: hessa.id, postId: p17.id } }),
    prisma.comment.create({ data: { text: "The Pearl area is stunning for photography. Try it at sunrise!", userId: noura.id, postId: p18.id } }),
    prisma.comment.create({ data: { text: "This is way too relatable 😭 spent 2 hours on a similar issue once.", userId: aisha.id, postId: p19.id } }),
    prisma.comment.create({ data: { text: "Prisma with Next.js is the perfect combo. What database are you using?", userId: aisha.id, postId: p20.id } }),
    prisma.comment.create({ data: { text: "SQLite for dev, planning Postgres for prod!", userId: leila.id, postId: p20.id } }),
    prisma.comment.create({ data: { text: "The plants really make a space feel alive. Great choice!", userId: reem.id, postId: p22.id } }),
    prisma.comment.create({ data: { text: "Which ramen place? Sending this to my foodie friends immediately.", userId: sara.id, postId: p24.id } }),
    prisma.comment.create({ data: { text: "It is called Ichiran, in the new mall near Lusail plaza!", userId: dana.id, postId: p24.id } }),
    prisma.comment.create({ data: { text: "Just looked them up — going this weekend for sure!", userId: maryam.id, postId: p24.id } }),
  ]);

  // ─── LIKES ────────────────────────────────────────────────────────────────
  const likePairs = [
    [maryam, p1], [leila, p1], [sara, p1], [amna, p1],
    [maryam, p2], [leila, p2],
    [leila, p3], [maryam, p3], [amna, p3], [hessa, p3],
    [maryam, p4], [noura, p4], [reem, p4],
    [aisha, p5], [fatma, p5], [leila, p5],
    [aisha, p6], [dana, p6], [fatma, p6], [reem, p6], [leila, p6],
    [aisha, p8], [sara, p8], [leila, p8], [amna, p8], [reem, p8],
    [aisha, p12], [maryam, p12], [fatma, p12], [sara, p12],
    [aisha, p14], [maryam, p14], [leila, p14],
    [maryam, p15], [aisha, p15], [dana, p15], [fatma, p15],
    [hessa, p17], [reem, p17], [maryam, p17], [aisha, p17],
    [aisha, p19], [maryam, p19], [sara, p19], [hessa, p19],
    [aisha, p20], [maryam, p20],
    [sara, p22], [reem, p22], [aisha, p22],
    [maryam, p24], [sara, p24], [aisha, p24], [leila, p24], [reem, p24],
  ];

  await Promise.all(
    likePairs.map(([user, post]) =>
      prisma.like.create({ data: { userId: user.id, postId: post.id } })
    )
  );

  // ─── FOLLOWS ──────────────────────────────────────────────────────────────
  const followPairs = [
    [aisha, maryam], [aisha, fatma], [aisha, leila], [aisha, sara],
    [maryam, aisha], [maryam, fatma], [maryam, dana], [maryam, reem],
    [fatma, aisha], [fatma, maryam], [fatma, reem],
    [amna, aisha], [amna, fatma], [amna, leila],
    [sara, aisha], [sara, dana], [sara, maryam],
    [noura, hessa], [noura, reem], [noura, maryam],
    [leila, aisha], [leila, maryam], [leila, fatma],
    [hessa, noura], [hessa, reem], [hessa, dana],
    [dana, maryam], [dana, sara], [dana, hessa],
    [reem, noura], [reem, maryam], [reem, fatma],
  ];

  await Promise.all(
    followPairs.map(([follower, following]) =>
      prisma.follow.create({
        data: { followerId: follower.id, followingId: following.id },
      })
    )
  );

  console.log("✅ Seeding completed:");
  console.log(`   ${users.length} users`);
  console.log(`   ${posts.length} posts`);
  console.log(`   23 comments`);
  console.log(`   ${likePairs.length} likes`);
  console.log(`   ${followPairs.length} follows`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((error) => {
    console.error("Error seeding data:", error);
    prisma.$disconnect();
    process.exit(1);
  });