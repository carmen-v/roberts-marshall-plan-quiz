"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
    const [name, setName] = useState("");
    const router = useRouter();

    function handleStart() {
        sessionStorage.setItem("quiz_name", name.trim() || "Anoniem");
        sessionStorage.setItem("quiz_score", "0");
        sessionStorage.removeItem("quiz_submitted");
        router.push("/question/1");
    }

    return (
        <main className="flex min-h-screen flex-col lg:flex-row">

            {/* Left — branding */}
            <div className="flex flex-1 flex-col justify-center px-8 py-16 lg:px-16 xl:px-16">
                <div className="max-w-xxl">
                    <div className="mb-6 h-px w-10 bg-accent" />

                    <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">
                        Welkom in de spel
                    </p>

                    <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-foreground lg:text-7xl">
                        Europa in herstel
                    </h1>

                    <p className="mb-12 text-lg text-muted">
                        10 meerkeuzevragen over de Marshall Plan en de wederopbouw van Europa na de Tweede Wereldoorlog. Test je kennis en ontdek hoe goed jij het verhaal van Europa in herstel kent!
                        Als je in de top 10 bent dan zie je je naam terug in de Hall of Fame! Als je je naam niet ziet, dan ben je de op de tweede scherm zonder score te zien. Maar niet getreurd, je kunt het altijd opnieuw proberen!
                    </p>

                    <div className="flex items-center gap-4 text-sm text-subtle">
                        <span>Robert Vernica</span>
                        <span className="h-px w-4 bg-border" />
                        <span>Groep 7A</span>
                        <span className="h-px w-4 bg-border" />
                        <span>Thema 4: Europa is geen spelletje. De Marshallplan</span>
                        <span className="h-px w-4 bg-border" />
                        <span>24 maart 2026</span>
                    </div>
                </div>
            </div>

            {/* Right — form */}
            <div className="flex w-full flex-col justify-center border-t border-border bg-surface px-8 py-16 lg:w-110 lg:border-l lg:border-t-0 lg:px-12 xl:w-120">
                <div className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-foreground">
                            Ben je klaar om te spelen?
                        </h2>
                        <p className="mt-1 text-sm text-muted">
                            Vul je naam in en start de quiz. Je naam zal worden weergegeven in de Hall of Fame als je in de top 10 eindigt!
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label htmlFor="name" className="text-sm font-medium text-muted">
                                Je naam
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Vul hier je naam in"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleStart()}
                                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-subtle outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleStart}
                            className="block w-full rounded-lg bg-accent px-4 py-3 text-center font-semibold text-accent-fg transition hover:bg-accent-hover active:opacity-80 cursor-pointer"
                        >
                            Start Quiz
                        </button>
                    </div>
                </div>
            </div>

        </main>
    );
}
