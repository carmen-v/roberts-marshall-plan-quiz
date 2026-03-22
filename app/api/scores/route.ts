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

    const entries = await redis.zRangeWithScores(KEY, 0, -1, { REV: true });

    // Group names by score (dense ranking: all tied players share the same rank)
    const grouped = new Map<number, string[]>();
    for (const entry of entries) {
        const playerName = String(entry.value).split("|")[0];
        const s = Number(entry.score);
        const names = grouped.get(s) ?? [];
        names.push(playerName);
        grouped.set(s, names);
    }

    const sortedScores = [...grouped.keys()].sort((a, b) => b - a);
    const leaderboard = sortedScores.map((score, i) => ({
        rank: i + 1,
        names: grouped.get(score)!,
        score,
    }));

    return NextResponse.json(leaderboard);
}
