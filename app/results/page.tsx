import Link from "next/link";

export default function ResultsPage() {
    return (
        <main>
            <h1>Thank you for playing!</h1>
            <p>Here is how you did:</p>

            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Player name</td>
                        <td>10 / 10</td>
                    </tr>
                </tbody>
            </table>

            <Link href="/">Play again</Link>
        </main>
    );
}
