import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

const NAMES_KEY = "quiz:names";

// Soft check on blur — just reads, no reservation
export async function GET(req: NextRequest) {
    const name = req.nextUrl.searchParams.get("name")?.trim();
    if (!name) return NextResponse.json({ taken: false });

    const redis = await getRedis();
    const taken = await redis.sIsMember(NAMES_KEY, name);

    return NextResponse.json({ taken });
}

// Atomic reservation on Start Quiz — SADD returns 1 (added = free) or 0 (already exists = taken)
export async function POST(req: NextRequest) {
    const { name } = await req.json();
    if (!name?.trim()) return NextResponse.json({ reserved: false });

    const redis = await getRedis();
    const added = await redis.sAdd(NAMES_KEY, name.trim());

    return NextResponse.json({ reserved: added === 1 });
}
