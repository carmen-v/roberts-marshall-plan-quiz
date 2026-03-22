"use client";

import { useEffect, useRef, useState } from "react";

type LeaderboardEntry = {
    rank: number;
    names: string[];
    score: number;
};

function getMessage(score: number) {
    if (score === 10) return "Perfecte score! Jullie weten alles over het Marshallplan en de EU!";
    if (score >= 8)  return "Uitstekend! Jullie kennen de geschiedenis van Europa heel goed!";
    if (score >= 6)  return "Goed gedaan! Jullie weten al veel over Europa en de EU!";
    if (score >= 4)  return "Prima! Nog een beetje oefenen en jullie weten alles!";
    return "Niet getreurd — de volgende keer gaat het beter!";
}

function TrophyCup({ className }: { className: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 2h12v7a6 6 0 0 1-12 0V2Z" />
            <path d="M4 4H2v3a3 3 0 0 0 3 3M20 4h2v3a3 3 0 0 1-3 3" strokeWidth="0" />
            <rect x="9" y="15" width="6" height="2" rx="0.5" />
            <rect x="7" y="19" width="10" height="2" rx="1" />
            <rect x="11" y="13" width="2" height="3" rx="0.5" />
        </svg>
    );
}

function rankStyle(rank: number) {
    if (rank === 1) return {
        badge: "bg-amber-400/15 border border-amber-400 text-amber-400",
        card: "border-amber-400/40 bg-amber-400/5",
        score: "text-amber-400",
    };
    if (rank === 2) return {
        badge: "bg-slate-400/10 border border-slate-500 text-slate-400",
        card: "border-slate-600 bg-surface",
        score: "text-slate-400",
    };
    if (rank === 3) return {
        badge: "bg-orange-700/10 border border-orange-700 text-orange-500",
        card: "border-orange-900 bg-surface",
        score: "text-orange-500",
    };
    return {
        badge: "bg-surface border border-border text-subtle",
        card: "border-border bg-surface",
        score: "text-muted",
    };
}

export default function ResultsPage() {
    const [name, setName] = useState("");
    const [score, setScore] = useState<number | null>(null);
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const saved = useRef(false);

    useEffect(() => {
        if (saved.current) return;
        saved.current = true;

        const justFinished = sessionStorage.getItem("quiz_just_finished") === "true";
        sessionStorage.removeItem("quiz_just_finished");

        const playerName = sessionStorage.getItem("quiz_name");
        const playerScore = parseInt(sessionStorage.getItem("quiz_score") ?? "0");
        const alreadySaved = sessionStorage.getItem("quiz_submitted") === "true";

        if (justFinished && playerName) {
            setName(playerName);
            setScore(playerScore);
        }

        const saveAndFetch = justFinished && playerName && !alreadySaved
            ? fetch("/api/scores", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: playerName, score: playerScore }),
            }).then(() => {
                sessionStorage.setItem("quiz_submitted", "true");
            })
            : Promise.resolve();

        saveAndFetch
            .then(() => fetch("/api/scores"))
            .then((res) => res.json())
            .then(setLeaderboard);
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
            <div className="w-full max-w-2xl space-y-10">

                {leaderboard.length > 0 && (
                    <div className="space-y-4">
                        <p className="text-xs font-semibold uppercase tracking-widest text-accent text-center">
                            Goed gedaan 7A! Dit zijn de resultaten:
                        </p>

                        {leaderboard.map((entry) => {
                            const style = rankStyle(entry.rank);
                            const hasMe = entry.names.includes(name);
                            return (
                                <div
                                    key={entry.rank}
                                    className={`rounded-xl border px-5 py-4 ${style.card} ${hasMe ? "ring-1 ring-accent/40" : ""}`}
                                >
                                    {/* Header row */}
                                    <div className="mb-3 flex items-center gap-3">
                                        {entry.rank === 1 && <TrophyCup className="w-7 h-7 text-amber-400" />}
                                        {entry.rank === 2 && <TrophyCup className="w-7 h-7 text-slate-400" />}
                                        {entry.rank === 3 && <TrophyCup className="w-7 h-7 text-orange-600" />}
                                        {entry.rank > 3 && (
                                            <span className={`rounded-md px-2.5 py-0.5 text-sm font-black ${style.badge}`}>
                                                {entry.rank}e
                                            </span>
                                        )}
                                        <span className={`text-sm font-bold ${style.score}`}>
                                            {entry.score} / 10
                                        </span>
                                        <span className="ml-auto text-xs text-muted">
                                            {entry.names.length === 1 ? "1 speler" : `${entry.names.length} spelers`}
                                        </span>
                                    </div>

                                    {/* Names */}
                                    <div className="flex flex-wrap gap-2">
                                        {entry.names.map((n) => {
                                            const isMe = n === name;
                                            return (
                                                <span
                                                    key={n}
                                                    className={`rounded-md px-2.5 py-1 text-sm font-medium ${
                                                        isMe
                                                            ? "bg-accent text-accent-fg"
                                                            : "bg-border/40 text-foreground"
                                                    }`}
                                                >
                                                    {n}{isMe ? " (jullie)" : ""}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Personal result — only shown if they actually played */}
                {score !== null && (
                    <div className="text-center space-y-1">
                        <p className="text-muted">
                            {name}, jullie scoorden
                            <span className="font-semibold text-accent"> {score} van de 10 </span>
                            vragen goed. {getMessage(score)}
                        </p>
                    </div>
                )}

            </div>
        </main>
    );
}
