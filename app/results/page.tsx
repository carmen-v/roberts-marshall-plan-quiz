"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

    useEffect(() => {
        setName(sessionStorage.getItem("quiz_name") ?? "Speler");
        setScore(parseInt(sessionStorage.getItem("quiz_score") ?? "0"));
    }, []);

    if (score === null) return null;

    const percentage = (score / 10) * 100;

    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
            <div className="w-full max-w-lg space-y-10">

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

                    {/* Progress bar */}
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

                {/* Actions */}
                <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="block w-full rounded-lg bg-accent px-4 py-3 text-center font-semibold text-accent-fg transition hover:bg-accent-hover active:opacity-80"
                    >
                        Opnieuw spelen
                    </Link>
                    <Link
                        href="/"
                        className="block w-full rounded-lg border border-border px-4 py-3 text-center font-semibold text-muted transition hover:border-accent hover:text-foreground"
                    >
                        Terug naar begin
                    </Link>
                </div>

            </div>
        </main>
    );
}
