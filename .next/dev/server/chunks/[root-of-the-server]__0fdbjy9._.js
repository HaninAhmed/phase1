module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[project]/phase1/repos/statsRepo.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAvgPostsPerUser",
    ()=>getAvgPostsPerUser,
    "getMostActiveUser",
    ()=>getMostActiveUser,
    "getMostCommentedPost",
    ()=>getMostCommentedPost,
    "getMostFollowedUser",
    ()=>getMostFollowedUser,
    "getMostLikedPost",
    ()=>getMostLikedPost,
    "getMostLikingUser",
    ()=>getMostLikingUser,
    "getPlatformOverview",
    ()=>getPlatformOverview,
    "getTop3ActiveUsers",
    ()=>getTop3ActiveUsers
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$phase1$2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/phase1/node_modules/@prisma/client)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$url__$5b$external$5d$__$28$url$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/url [external] (url, cjs)");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("phase1/repos/statsRepo.js")}`;
    },
    get turbopackHot () {
        return __turbopack_context__.m.hot;
    }
};
;
;
;
const __filename = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$url__$5b$external$5d$__$28$url$2c$__cjs$29$__["fileURLToPath"])(__TURBOPACK__import$2e$meta__.url);
const __dirname = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(__filename);
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$phase1$2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
    datasources: {
        db: {
            url: "file:" + __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(__dirname, "../prisma/dev.db")
        }
    }
});
async function getMostActiveUser() {
    const user = await prisma.user.findFirst({
        orderBy: {
            posts: {
                _count: "desc"
            }
        },
        select: {
            username: true,
            _count: {
                select: {
                    posts: true
                }
            }
        }
    });
    return user;
}
async function getPlatformOverview() {
    const [totalUsers, totalPosts, totalComments, totalLikes, totalFollows] = await Promise.all([
        prisma.user.count(),
        prisma.post.count(),
        prisma.comment.count(),
        prisma.like.count(),
        prisma.follow.count()
    ]);
    return {
        totalUsers,
        totalPosts,
        totalComments,
        totalLikes,
        totalFollows
    };
}
async function getMostLikedPost() {
    const post = await prisma.post.findFirst({
        orderBy: {
            likes: {
                _count: "desc"
            }
        },
        select: {
            content: true,
            user: {
                select: {
                    username: true
                }
            },
            _count: {
                select: {
                    likes: true
                }
            }
        }
    });
    return post;
}
async function getMostCommentedPost() {
    const post = await prisma.post.findFirst({
        orderBy: {
            comments: {
                _count: "desc"
            }
        },
        select: {
            content: true,
            user: {
                select: {
                    username: true
                }
            },
            _count: {
                select: {
                    comments: true
                }
            }
        }
    });
    return post;
}
async function getMostFollowedUser() {
    const user = await prisma.user.findFirst({
        orderBy: {
            followers: {
                _count: "desc"
            }
        },
        select: {
            username: true,
            _count: {
                select: {
                    followers: true
                }
            }
        }
    });
    return user;
}
async function getAvgPostsPerUser() {
    const totalPosts = await prisma.post.count();
    const totalUsers = await prisma.user.count();
    if (totalUsers === 0) return 0;
    return (totalPosts / totalUsers).toFixed(2);
}
async function getTop3ActiveUsers() {
    const users = await prisma.user.findMany({
        orderBy: {
            posts: {
                _count: "desc"
            }
        },
        take: 3,
        select: {
            username: true,
            _count: {
                select: {
                    posts: true
                }
            }
        }
    });
    return users;
}
async function getMostLikingUser() {
    const user = await prisma.user.findFirst({
        orderBy: {
            likes: {
                _count: "desc"
            }
        },
        select: {
            username: true,
            _count: {
                select: {
                    likes: true
                }
            }
        }
    });
    return user;
}
}),
"[project]/phase1/app/api/statistics/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$phase1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/phase1/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$phase1$2f$repos$2f$statsRepo$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/phase1/repos/statsRepo.js [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        const [mostActiveUser, platformOverview, mostLikedPost, mostCommentedPost, mostFollowedUser, avgPostsPerUser, top3ActiveUsers, mostLikingUser] = await Promise.all([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$phase1$2f$repos$2f$statsRepo$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMostActiveUser"])(),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$phase1$2f$repos$2f$statsRepo$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPlatformOverview"])(),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$phase1$2f$repos$2f$statsRepo$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMostLikedPost"])(),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$phase1$2f$repos$2f$statsRepo$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMostCommentedPost"])(),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$phase1$2f$repos$2f$statsRepo$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMostFollowedUser"])(),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$phase1$2f$repos$2f$statsRepo$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAvgPostsPerUser"])(),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$phase1$2f$repos$2f$statsRepo$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTop3ActiveUsers"])(),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$phase1$2f$repos$2f$statsRepo$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMostLikingUser"])()
        ]);
        return __TURBOPACK__imported__module__$5b$project$5d2f$phase1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            mostActiveUser,
            platformOverview,
            mostLikedPost,
            mostCommentedPost,
            mostFollowedUser,
            avgPostsPerUser,
            top3ActiveUsers,
            mostLikingUser
        });
    } catch (error) {
        console.error("Statistics API error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$phase1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch statistics"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0fdbjy9._.js.map