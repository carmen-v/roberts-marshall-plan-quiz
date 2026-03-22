"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState<string | null>(null);
    const [isChecking, setIsChecking] = useState(false);
    const router = useRouter();

    async function handleNameBlur() {
        if (!name.trim()) return;
        setIsChecking(true);
        const res = await fetch(`/api/check-name?name=${encodeURIComponent(name.trim())}`);
        const { taken } = await res.json();
        setIsChecking(false);
        setNameError(taken ? "Deze naam is al in gebruik. Kies een andere naam voor jullie duo." : null);
    }

    async function handleStart() {
        if (!canStart) return;
        const res = await fetch("/api/check-name", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name.trim() }),
        });
        const { reserved } = await res.json();
        if (!reserved) {
            setNameError("Deze naam is al in gebruik. Kies een andere naam voor jullie duo.");
            return;
        }
        sessionStorage.setItem("quiz_name", name.trim());
        sessionStorage.setItem("quiz_score", "0");
        sessionStorage.removeItem("quiz_submitted");
        router.push("/question/1");
    }

    const canStart = !!name.trim() && !nameError;

    return (
        <main className="flex min-h-screen flex-col lg:flex-row">

            {/* Left — branding */}
            <div className="flex flex-1 flex-col justify-center px-8 py-16 lg:px-16 xl:px-16">
                <div className="max-w-xxl">
                    <div className="mb-6 h-px w-10 bg-accent" />

                    <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">
                        Welkom bij het spel
                    </p>

                    <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-foreground lg:text-7xl">
                        Europa in herstel
                    </h1>

                    <p className="mb-12 text-sm lg:text-lg text-muted">
                        10 meerkeuzevragen over het Marshallplan en de wederopbouw van Europa na de Tweede Wereldoorlog. Speel samen met je partner en ontdek hoe goed jullie het verhaal van Europa in herstel kennen! Na afloop zie je de resultaten van alle duo's, gerangschikt op score.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-subtle">
                        <span>Robert Vernica</span>
                        <span className="h-px w-4 bg-border" />
                        <span>Groep 7A</span>
                        <span className="h-px w-4 bg-border" />
                        <span>Thema 4: Europa is geen spelletje. Het Marshallplan</span>
                        <span className="h-px w-4 bg-border" />
                        <span>26 maart 2026</span>
                    </div>
                </div>
            </div>

            {/* Right — form */}
            <div className="flex w-full flex-col justify-center border-t border-border bg-surface px-8 py-16 lg:w-110 lg:border-l lg:border-t-0 lg:px-12 xl:w-120">
                <div className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-foreground">
                            Zijn jullie klaar om te spelen?
                        </h2>
                        <p className="mt-1 text-sm text-muted">
                            Vul de naam van jullie duo in en start de quiz. Elke vraag heeft één goed antwoord. Na afloop zie je hoe jullie het hebben gedaan ten opzichte van alle andere duo's.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label htmlFor="name" className="text-sm font-medium text-muted">
                                Naam van jullie duo
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Vul hier jullie naam in"
                                value={name}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setName(val.charAt(0).toUpperCase() + val.slice(1));
                                    setNameError(null);
                                }}
                                onBlur={handleNameBlur}
                                onKeyDown={(e) => e.key === "Enter" && canStart && handleStart()}
                                className={`w-full rounded-lg border bg-background px-4 py-3 text-foreground placeholder:text-subtle outline-none transition focus:ring-1 ${
                                    nameError
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                        : "border-border focus:border-accent focus:ring-accent"
                                }`}
                            />
                            {isChecking && (
                                <p className="text-xs text-muted">Naam controleren...</p>
                            )}
                            {nameError && (
                                <p className="text-xs text-red-500">{nameError}</p>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={handleStart}
                            disabled={!canStart}
                            className="block w-full rounded-lg bg-accent px-4 py-3 text-center font-semibold text-accent-fg transition hover:bg-accent-hover active:opacity-80 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-accent"
                        >
                            Start Quiz
                        </button>
                    </div>
                </div>
            </div>

        </main>
    );
}
