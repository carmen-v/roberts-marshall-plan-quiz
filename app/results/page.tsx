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

        setName(playerName);
        setScore(playerScore);

        // Save score, then fetch updated leaderboard
        fetch("/api/scores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: playerName, score: playerScore }),
        })
            .then(() => fetch("/api/scores"))
            .then((res) => res.json())
            .then(setLeaderboard);
    }, []);

    if (score === null) return null;

    const percentage = (score / 10) * 100;

    console.log(name, score)

    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
            <div className="w-full max-w-2xl space-y-10">

                {/* Header */}
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                        Quiz afgerond
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">
                        Goed gedaan, {name}!
                    </h1>
                    <p className="text-muted">{getMessage(score)}</p>
                </div>

                {/* Score card */}
                <div className="rounded-2xl border border-border bg-surface p-8 space-y-6">
                    <div className="flex items-end gap-2">
                        <span className="text-7xl font-bold text-accent leading-none">{score}</span>
                        <span className="mb-2 text-2xl font-semibold text-muted">/ 10</span>
                    </div>
                    <p className="text-sm text-muted">vragen correct beantwoord</p>

                    <div className="space-y-2">
                        <div className="h-2 w-full overflow-hidden rounded-full bg-background">
                            <div
                                className="h-full rounded-full bg-accent transition-all duration-700"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                        <p className="text-right text-xs text-subtle">{percentage}%</p>
                    </div>
                </div>

                {/* Leaderboard */}
                {leaderboard.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-foreground">Top 10</h2>
                        <div className="overflow-hidden rounded-xl border border-border">
                            {leaderboard.map((entry) => {
                                const isCurrentPlayer = entry.name === name;
                                return (
                                    <div
                                        key={`${entry.rank}-${entry.name}`}
                                        className={`flex items-center gap-4 px-6 py-4 ${
                                            entry.rank < leaderboard.length ? "border-b border-border" : ""
                                        } ${isCurrentPlayer ? "bg-accent/10" : "bg-surface"}`}
                                    >
                                        <span className={`w-6 text-sm font-bold ${
                                            entry.rank === 1 ? "text-accent" : "text-subtle"
                                        }`}>
                                            {entry.rank}
                                        </span>
                                        <span className={`flex-1 font-medium ${
                                            isCurrentPlayer ? "text-accent" : "text-foreground"
                                        }`}>
                                            {entry.name}
                                            {isCurrentPlayer && (
                                                <span className="ml-2 text-xs text-muted">(jij)</span>
                                            )}
                                        </span>
                                        <span className="text-sm font-semibold text-muted">
                                            {entry.score} / 10
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Actions */}
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
