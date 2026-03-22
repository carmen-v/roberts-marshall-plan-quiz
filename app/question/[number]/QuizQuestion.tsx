"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";

const LABELS = ["A", "B", "C", "D"];

export default function QuizQuestion({ number }: { number: number }) {
    const router = useRouter();
    const question = questions[number - 1];
    const next = number < 10 ? `/question/${number + 1}` : "/results";
    const progress = (number / 10) * 100;
    const [selected, setSelected] = useState<number | null>(null);

    function handleAnswer(selectedIndex: number) {
        if (selected !== null) return;
        setSelected(selectedIndex);
        if (selectedIndex === question.correct) {
            const current = parseInt(sessionStorage.getItem("quiz_score") ?? "0");
            sessionStorage.setItem("quiz_score", String(current + 1));
        }
        if (number === 10) {
            sessionStorage.setItem("quiz_just_finished", "true");
        }
        setTimeout(() => router.push(next), 400);
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
                        {question.options.map((option, i) => {
                            const isSelected = selected === i;
                            return (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handleAnswer(i)}
                                    disabled={selected !== null}
                                    className={`group flex cursor-pointer items-center gap-4 rounded-xl border p-6 text-left transition
                                        ${isSelected
                                            ? "border-accent bg-accent/10"
                                            : "border-border bg-surface hover:border-accent"}
                                        ${selected !== null && !isSelected ? "opacity-40" : ""}
                                    `}
                                >
                                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-sm font-bold transition
                                        ${isSelected
                                            ? "border-accent text-accent"
                                            : "border-border text-subtle group-hover:border-accent group-hover:text-accent"}
                                    `}>
                                        {LABELS[i]}
                                    </span>
                                    <span className="text-base font-medium text-foreground">
                                        {option}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                </div>
            </main>

        </div>
    );
}
