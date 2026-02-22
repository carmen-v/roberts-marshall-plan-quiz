import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

const KEY = "quiz:leaderboard";

export async function POST(req: NextRequest) {
    const { name, score } = await req.json();
    const redis = await getRedis();

    // Use name|timestamp as member so the same name can appear multiple times
    await redis.zAdd(KEY, { score, value: `${name}|${Date.now()}` });

    return NextResponse.json({ ok: true });
}

export async function GET() {
    const redis = await getRedis();

    const entries = await redis.zRangeWithScores(KEY, 0, 9, { REV: true });

    const leaderboard = entries.map((entry, i) => ({
        rank: i + 1,
        name: entry.value.split("|")[0],
        score: entry.score,
    }));

    return NextResponse.json(leaderboard);
}
