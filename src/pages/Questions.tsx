import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { useQuery } from "@tanstack/react-query";
import { api } from "../axiosClient";
import { selectedAnswer, setQuestions } from "../slices/quizSlice";
import { useState } from "react";
import type { Question } from "../types";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {

    const quizDetails = useSelector((state: RootState) => state.quiz)
    const authDetails = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const [answers, setAnswers] = useState<Record<number, string>>({})

    const { data: questions } = useQuery({
        queryKey: ["getQuestions"],
        queryFn: async () => {
            const data = {
                category: quizDetails.category,
                difficulty: quizDetails.difficulty,
            }
            const response = await api.post("/questions/get-questions", data)
            dispatch(setQuestions(response.data.questions))
            return response.data.questions
        }
    })

    const navigate = useNavigate();

    const handleSelect = (questionId: number, answer: string) => {
        dispatch(selectedAnswer({ questionId, answer }))
        setAnswers((prev) => ({ ...prev, [questionId]: answer }))
    };

    const handleSubmit = async () => {
        if (quizDetails.questions.length > Object.keys(quizDetails.answers).length){
            alert("Answer all questions")
            return
        }
            const data = {
                category: quizDetails.category,
                difficulty: quizDetails.difficulty,
                questions: quizDetails.questions,
                userAnswers: quizDetails.answers,
                user: authDetails.user
            }

        await api.post("/result/get-result?to_be_saved=true", data)

        navigate("/result"); // navigate to result page
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white px-6 py-10 flex flex-col items-center">
            <motion.h1
                className="text-4xl md:text-5xl font-bold mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {quizDetails.category} Quiz - {quizDetails.difficulty?.toUpperCase()}
            </motion.h1>

            <div className="w-full max-w-3xl flex flex-col gap-6">
                {questions?.map((q: Question, idx: number) => (
                    <motion.div
                        key={q.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-gray-900 rounded-2xl p-6 shadow-lg"
                    >
                        <h2 className="text-xl font-semibold mb-4">
                            {idx + 1}. {q.question}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {q.options.map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => handleSelect(q.id, opt)}
                                    className={`py-2 px-4 rounded-xl text-left border-2 transition ${answers[q.id] === opt ? "bg-green-400" : ""}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.button
                onClick={handleSubmit}
                className="mt-8 px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:scale-105 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Submit
            </motion.button>
        </div>
    );
};

export default QuizPage;
