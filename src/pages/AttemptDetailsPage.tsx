import { Card, Progress, Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { api } from "../axiosClient";
import { useMemo } from "react";
import type { User, UserHistory } from "../types";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const AttemptReview = () => {
    const { id } = useParams()
    const user = useSelector((state: RootState) => state.auth.user)

    const { data: history } = useQuery({
        queryKey: ["getUserHistory"],
        queryFn: async () => {
            const response = await api.post("/result/get-past-scores", { id: (user as User)._id })
            return response.data.history
        }
    })

    const particularAttempt = useMemo(() => {
        const particularAttempt: UserHistory[] = (history as UserHistory[])?.filter((item) => item._id === id)

        return particularAttempt?.[0]
    }, [history, id])


    const correctCount = particularAttempt?.reviewedAnswers.filter(
        (ans) => ans.selectedAns === ans.answer
    ).length;

    const percent = (Number(particularAttempt?.score) / Number(particularAttempt?.total)) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 py-10 px-4 flex justify-center">
            <div className="w-full max-w-4xl space-y-6">
                {/* Header Card */}
                <Card
                    className="shadow-lg rounded-2xl"
                    title={<h2 className="text-2xl font-bold text-center">Attempt Review</h2>}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="space-y-2 text-center md:text-left">
                            <p className="text-lg font-medium">
                                Category: <Tag color="blue">{particularAttempt?.quizCategory}</Tag>
                            </p>
                            <p className="text-lg font-medium">
                                Difficulty:{" "}
                                <Tag color={particularAttempt?.difficultyLevel === "easy" ? "green" : particularAttempt?.difficultyLevel === "medium" ? "orange" : "red"}>
                                    {particularAttempt?.difficultyLevel}
                                </Tag>
                            </p>
                            <p className="text-gray-600">
                                Date: {new Date(particularAttempt?.date).toLocaleString()}
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <Progress
                                type="circle"
                                percent={Math.round(percent)}
                                format={() => `${particularAttempt?.score}/${particularAttempt?.total}`}
                                size={120}
                                strokeColor={{
                                    "0%": "#108ee9",
                                    "100%": "#87d068",
                                }}
                            />
                            <p className="mt-2 text-sm text-gray-600">
                                Correct: {correctCount} / {particularAttempt?.total}
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Questions Review */}
                <div className="space-y-4">
                    {particularAttempt?.reviewedAnswers.map((ans, index: number) => {
                        const isCorrect = ans.selectedAns === ans.answer;
                        return (
                            <Card
                                key={ans.id}
                                className={`shadow-md rounded-xl ${isCorrect ? "border-green-400" : "border-red-400"
                                    }`}
                            >
                                <p className="font-semibold text-lg mb-2">
                                    Q{index + 1}. {ans.question}
                                </p>
                                <div className="flex flex-col gap-2">
                                    <p>
                                        Your Answer:{" "}
                                        <Tag color={isCorrect ? "green" : "red"} className="text-base px-3 py-1">
                                            {ans.selectedAns}{" "}
                                            {isCorrect ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                                        </Tag>
                                    </p>
                                    <p>
                                        Correct Answer:{" "}
                                        <Tag color="blue" className="text-base px-3 py-1">
                                            {ans.answer}
                                        </Tag>
                                    </p>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AttemptReview;
