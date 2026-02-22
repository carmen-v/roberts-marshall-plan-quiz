"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type LeaderboardEntry = {
    rank: number;
    name: string;
    score: number;
};

function getMessage(score: number) {
    if (score === 10) return "Perfecte score! Jij weet alles over het Marshallplan en de EU!";
    if (score >= 8)  return "Uitstekend! Je kent de geschiedenis van Europa heel goed!";
    if (score >= 6)  return "Goed gedaan! Je weet al veel over Europa en de EU!";
    if (score >= 4)  return "Prima! Nog een beetje oefenen en je weet alles!";
    return "Niet getreurd — je kunt het altijd opnieuw proberen!";
}

// Visual order: 2nd (left), 1st (center), 3rd (right)
const PODIUM_ORDER = [1, 0, 2] as const;

const MEDAL = {
    0: {
        rank: "1",
        color: "text-amber-400",
        border: "border-amber-400",
        bg: "bg-amber-400/5",
        height: "h-40",
    },
    1: {
        rank: "2",
        color: "text-slate-400",
        border: "border-slate-600",
        bg: "bg-surface",
        height: "h-28",
    },
    2: {
        rank: "3",
        color: "text-orange-600",
        border: "border-orange-800",
        bg: "bg-surface",
        height: "h-20",
    },
};

export default function ResultsPage() {
    const [name, setName] = useState("");
    const [score, setScore] = useState<number | null>(null);
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const saved = useRef(false);

    useEffect(() => {
        if (saved.current) return;
        saved.current = true;

        const playerName = sessionStorage.getItem("quiz_name") ?? "Anoniem";
        const playerScore = parseInt(sessionStorage.getItem("quiz_score") ?? "0");
        const alreadySaved = sessionStorage.getItem("quiz_submitted") === "true";

        setName(playerName);
        setScore(playerScore);

        const saveAndFetch = alreadySaved
            ? Promise.resolve()
            : fetch("/api/scores", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: playerName, score: playerScore }),
            }).then(() => {
                sessionStorage.setItem("quiz_submitted", "true");
            });

        saveAndFetch
            .then(() => fetch("/api/scores"))
            .then((res) => res.json())
            .then(setLeaderboard);
    }, []);

    if (score === null) return null;

    const top3 = leaderboard.slice(0, 3);
    const rest  = leaderboard.slice(3);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
            <div className="w-full max-w-2xl space-y-12">

                {/* Podium */}
                {top3.length > 0 && (
                    <div className="space-y-6">
                        <p className="text-xs font-semibold uppercase tracking-widest text-accent text-center">
                            Goed gedaan 7A! Dit is de top 10 van de Hall of Fame:
                        </p>

                        <div className="flex items-end justify-center gap-3">
                            {PODIUM_ORDER.map((idx) => {
                                const entry = top3[idx];
                                const medal = MEDAL[idx];

                                // Empty slot if not enough players
                                if (!entry) return <div key={idx} className="w-32" />;

                                const isMe = entry.name === name;

                                return (
                                    <div key={entry.rank} className="flex w-32 flex-col items-center">
                                        {/* Fixed-height text area — keeps all blocks aligned */}
                                        <div className="flex h-16 w-full flex-col items-center justify-end gap-1 pb-1">
                                            <p className={`line-clamp-2 wrap-break-word text-center text-sm font-semibold leading-tight ${isMe ? "text-accent" : "text-foreground"}`}>
                                                {entry.name}{isMe ? " (jij)" : ""}
                                            </p>
                                            <p className={`text-xs font-bold ${medal.color}`}>
                                                {entry.score} / 10
                                            </p>
                                        </div>

                                        {/* Podium block */}
                                        <div className={`w-full ${medal.height} ${medal.bg} border ${medal.border} rounded-t-xl flex items-center justify-center`}>
                                            <span className={`text-4xl font-black ${medal.color}`}>
                                                {medal.rank}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* 4th – 10th */}
                {rest.length > 0 && (
                    <div className="overflow-hidden rounded-xl border border-border">
                        {rest.map((entry, i) => {
                            const isMe = entry.name === name;
                            return (
                                <div
                                    key={`${entry.rank}-${entry.name}`}
                                    className={`flex items-center gap-4 px-6 py-3 ${i < rest.length - 1 ? "border-b border-border" : ""} ${isMe ? "bg-accent/10" : "bg-surface"}`}
                                >
                                    <span className="w-6 text-sm font-bold text-subtle">
                                        {entry.rank}
                                    </span>
                                    <span className={`flex-1 text-sm font-medium ${isMe ? "text-accent" : "text-foreground"}`}>
                                        {entry.name}
                                        {isMe && <span className="ml-2 text-xs text-muted">(jij)</span>}
                                    </span>
                                    <span className="text-sm font-semibold text-muted">
                                        {entry.score} / 10
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Personal result */}
                <div className="text-center space-y-1">
                    <p className="text-muted">
                        {name}, je scoorde
                        <span className="font-semibold text-accent"> {score} van de 10 </span>
                        vragen goed. {getMessage(score)}
                    </p>
                </div>

                {/* Play again */}
                <Link
                    href="/"
                    className="block w-full rounded-lg bg-accent px-4 py-3 text-center font-semibold text-accent-fg transition hover:bg-accent-hover active:opacity-80"
                >
                    Opnieuw spelen
                </Link>

            </div>
        </main>
    );
}
