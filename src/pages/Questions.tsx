import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

// Example questions type
interface Question {
    id: number;
    question: string;
    options: string[];
    answer: string
    category: string
    difficulty: string
}

const QuizPage = () => {

    const quizDetails = useSelector((state: RootState) => state.quiz)

    const { data:}

    const questions: Question[] = [{
        "id": 218,
        "question": "What is the purpose of the `useCallback` hook?",
        "options": [
            "To memoize state variables.",
            "To memoize function calls, preventing unnecessary re-creations.",
            "To memoize components.",
            "To memoize event handlers."
        ],
        "answer": "To memoize function calls, preventing unnecessary re-creations.",
        "difficulty": "hard",
        "category": "React"
    },
    {
        "id": 219,
        "question": "What is the primary use case for the `useRef` hook?",
        "options": [
            "To manage the component's state.",
            "To perform side effects in functional components.",
            "To create a reference that persists across renders, often used to access DOM elements.",
            "To optimize component rendering."
        ],
        "answer": "To create a reference that persists across renders, often used to access DOM elements.",
        "difficulty": "medium",
        "category": "React"
    },
    {
        "id": 220,
        "question": "What is the `children` prop in React?",
        "options": [
            "A prop used to pass data to a component.",
            "A prop used to define the visual style of a component.",
            "A prop used to render a list of components.",
            "A prop that represents the content nested inside a component."
        ],
        "answer": "A prop that represents the content nested inside a component.",
        "difficulty": "medium",
        "category": "React"
    }
    ]
    const navigate = useNavigate();
    const [answers, setAnswers] = useState<Record<number, string>>({});

    const handleSelect = (questionId: number, option: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: option }));
    };

    const handleSubmit = () => {
        // You can send 'answers' to backend here
        console.log("Submitted Answers:", answers);
        navigate("/quiz-result"); // navigate to result page
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
                {questions.map((q, idx) => (
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
                                    className={`py-2 px-4 rounded-xl text-left border-2 transition 
                    ${answers[q.id] === opt ? "border-green-400 bg-green-900" : "border-gray-700 hover:border-gray-400"}`}
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
