import QuizQuestion from "./QuizQuestion";

export default async function QuestionPage({
    params,
}: {
    params: Promise<{ number: string }>;
}) {
    const { number } = await params;
    return <QuizQuestion number={Number(number)} />;
}
