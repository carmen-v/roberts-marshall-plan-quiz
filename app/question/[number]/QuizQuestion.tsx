"use client";

import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";

const LABELS = ["A", "B", "C", "D"];

export default function QuizQuestion({ number }: { number: number }) {
    const router = useRouter();
    const question = questions[number - 1];
    const next = number < 10 ? `/question/${number + 1}` : "/results";
    const progress = (number / 10) * 100;

    function handleAnswer(selectedIndex: number) {
        if (selectedIndex === question.correct) {
            const current = parseInt(sessionStorage.getItem("quiz_score") ?? "0");
            sessionStorage.setItem("quiz_score", String(current + 1));
        }
        router.push(next);
    }

    return (
        <div className="flex min-h-screen flex-col">

            {/* Progress bar */}
            <div className="h-1 bg-surface">
                <div
                    className="h-full bg-accent transition-all duration-500"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Header */}
            <header className="flex items-center justify-between border-b border-border px-8 py-4">
                <span className="text-sm text-muted">Vraag {number} van 10</span>
                <span className="text-sm font-semibold text-accent">{number * 10}%</span>
            </header>

            {/* Main */}
            <main className="flex flex-1 items-center justify-center px-8 py-12">
                <div className="w-full max-w-3xl space-y-10">

                    <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                        {question.text}
                    </h2>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {question.options.map((option, i) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => handleAnswer(i)}
                                className="group flex cursor-pointer items-center gap-4 rounded-xl border border-border bg-surface p-6 text-left transition hover:border-accent"
                            >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-sm font-bold text-subtle transition group-hover:border-accent group-hover:text-accent">
                                    {LABELS[i]}
                                </span>
                                <span className="text-base font-medium text-foreground">
                                    {option}
                                </span>
                            </button>
                        ))}
                    </div>

                </div>
            </main>

        </div>
    );
}
