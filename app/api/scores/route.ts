import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

const KEY = "quiz:leaderboard";
const NAMES_KEY = "quiz:names";

export async function POST(req: NextRequest) {
    const { name, score } = await req.json();
    const redis = await getRedis();

    await Promise.all([
        redis.zAdd(KEY, { score, value: `${name}|${Date.now()}` }),
        redis.sAdd(NAMES_KEY, name),
    ]);

    return NextResponse.json({ ok: true });
}

export async function GET() {
    const redis = await getRedis();

    const entries = await redis.zRangeWithScores(KEY, 0, 9, { REV: true });

    const leaderboard = entries.map((entry, i) => ({
        rank: i + 1,
        name: String(entry.value).split("|")[0],
        score: entry.score,
    }));

    return NextResponse.json(leaderboard);
}
