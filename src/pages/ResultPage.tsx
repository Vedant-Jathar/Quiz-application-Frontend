import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store";
import { useQuery } from "@tanstack/react-query";
import { api } from "../axiosClient";
import type { ReviewedAns } from "../types";
import { motion } from "framer-motion";

export default function ResultPage() {
    const navigate = useNavigate();
    const quizDetails = useSelector((state: RootState) => state.quiz)
    const authDetails = useSelector((state: RootState) => state.auth)

    const { data: resultData } = useQuery({
        queryKey: ["getResult"],
        queryFn: async () => {
            const data = {
                category: quizDetails.category,
                difficulty: quizDetails.difficulty,
                questions: quizDetails.questions,
                userAnswers: quizDetails.answers,
                user: authDetails.user
            }
            const response = await api.post("/result/get-result?to_be_saved=false", data)
            return response.data
        }
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-6">
            <div className="absolute top-8 right-8">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/quiz-history")}
                    className="px-6 py-3 cursor-pointer bg-gradient-to-r from-green-400 to-emerald-600 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                    View Past Scores
                </motion.button>
            </div>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl p-8">
                {/* Header */}
                <h1 className="text-3xl font-bold text-center text-gray-800">
                    🎉 Quiz Completed!
                </h1>
                <p className="text-center text-gray-500 mt-2">
                    Here are your results
                </p>

                {/* Score Section */}
                <div className="mt-8 flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center text-4xl font-bold text-indigo-600 shadow-inner">
                        {resultData?.score}/{resultData?.total}
                    </div>
                    <p className="mt-4 text-lg text-gray-600">
                        Category:{" "}
                        <span className="font-semibold text-gray-800">{quizDetails.category}</span>
                    </p>
                    <p className="text-lg text-gray-600">
                        Difficulty:{" "}
                        <span className="font-semibold capitalize text-gray-800">
                            {quizDetails.difficulty}
                        </span>
                    </p>
                </div>

                {/* Incorrect Answers */}
                {resultData?.reviewedAns.length > 0 && (
                    <div className="mt-10">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Reviewed Answers
                        </h2>
                        <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                            {(resultData?.reviewedAns as ReviewedAns[]).map((item, idx) => (
                                <div
                                    key={idx}
                                    className="bg-red-50 border border-red-200 rounded-xl p-4"
                                >
                                    <p className="text-gray-800 font-medium">
                                        Q: {item.question}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Your Answer:{" "}
                                        <span className={`${item.selectedAns !== item.answer ? "text-red-600 " : "text-green-600"} font-semibold`}>
                                            {item.selectedAns}
                                        </span>
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Correct Answer:{" "}
                                        <span className="text-green-600 font-semibold">
                                            {item.answer}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Buttons */}
                <div className="mt-10 flex justify-center gap-4">
                    <button
                        onClick={() => navigate("/quiz-categories")}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
                    >
                        🔄 Play Again
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl shadow hover:bg-gray-200 transition"
                    >
                        🏠 Go Home
                    </button>
                </div>
            </div>
        </div>
    );
}
