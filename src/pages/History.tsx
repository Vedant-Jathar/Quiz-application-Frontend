import { motion } from "framer-motion";
import type { User, UserHistory } from "../types";
import { useQuery } from "@tanstack/react-query";
import { api } from "../axiosClient";
import type { RootState } from "../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function QuizHistory() {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate()

    const { data: history } = useQuery({
        queryKey: ["getHistory"],
        queryFn: async () => {
            const response = await api.post("/result/get-past-scores", { id: (user as User)._id })
            return response.data.history
        }
    })

    const handleClickAttempt = (_id: string) => {
        navigate(`/quiz-history/attempt/${_id}`)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-100 py-12 px-6">
            {/* Header */}
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 drop-shadow-md">
                📊 Your Quiz History
            </h1>

            {/* History List */}
            <div className="max-w-4xl mx-auto space-y-6">
                {history?.length > 0 ? (
                    history.map((item: UserHistory, idx: number) => (
                        <motion.div
                            key={idx}
                            onClick={() => { handleClickAttempt(item._id) }}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            className="bg-white rounded-2xl shadow-lg p-6 border-l-8 border-indigo-500 hover:shadow-2xl transition-all"
                        >
                            {/* Top Row */}
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold text-indigo-600">
                                    {item.quizCategory}
                                </h2>
                                <span className="text-sm text-gray-500">
                                    {new Date(item.date).toLocaleString("en-IN", {
                                        weekday: "short",
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </div>

                            {/* Details */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-700">
                                <p>
                                    <span className="font-medium">Difficulty: </span>
                                    <span className="capitalize">{item.difficultyLevel}</span>
                                </p>
                                <p>
                                    <span className="font-medium">Score: </span>
                                    {item.score}/{item.total}
                                </p>
                                <p>
                                    <span className="font-medium">Result: </span>
                                    {(item.score as number) >= (item.total as number) / 2 ? (
                                        <span className="text-green-600 font-semibold">Passed ✅</span>
                                    ) : (
                                        <span className="text-red-600 font-semibold">Failed ❌</span>
                                    )}
                                </p>
                                <p>
                                    <span className="font-medium">Total Qs: </span>
                                    {item.total}
                                </p>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 text-lg">
                        ❌ No quiz history found.
                    </div>
                )}
            </div>
        </div>
    );
}
