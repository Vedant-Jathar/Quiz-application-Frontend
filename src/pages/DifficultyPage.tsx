import { motion } from "framer-motion";
import { Brain, Zap, Flame } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setDifficulty } from "../slices/quizSlice";
import type { RootState } from "../store";
import { useNavigate } from "react-router-dom";

const difficulties = [
    {
        label: "Easy",
        value: "easy",
        color: "from-green-400 to-green-600",
        Icon: Brain,
        desc: "Perfect for warm-up questions to test the basics.",
    },
    {
        label: "Medium",
        value: "medium",
        color: "from-blue-400 to-blue-600",
        Icon: Zap,
        desc: "A balanced challenge with tricky questions.",
    },
    {
        label: "Hard",
        value: "hard",
        color: "from-red-400 to-red-600",
        Icon: Flame,
        desc: "For experts only! Tough and thought-provoking.",
    },
];

const DifficultyPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const category = useSelector((state: RootState) => state.quiz.category);

    const handleSelect = (difficulty: string) => {
        // navigate(`/quiz/${category}/${difficulty}`);
        dispatch(setDifficulty(difficulty as "easy" | "medium" | "hard"))
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black flex flex-col items-center justify-center px-6">
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
            
            <motion.h1
                className="text-4xl md:text-5xl font-bold text-white mb-10 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Choose Your Difficulty
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                {difficulties.map(({ label, value, color, Icon, desc }) => (
                    <motion.div
                        key={value}
                        onClick={() => handleSelect(value)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClickCapture={() => { navigate("/questions") }}
                        className={`cursor-pointer bg-gradient-to-br ${color} rounded-2xl shadow-xl p-6 flex flex-col items-center text-center text-white transition`}
                    >
                        <Icon className="w-12 h-12 mb-4" />
                        <h2 className="text-2xl font-bold mb-2">{label}</h2>
                        <p className="text-sm opacity-80">{desc}</p>
                    </motion.div>
                ))}
            </div>

            <motion.p
                className="mt-12 text-gray-300 text-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                Category: <span className="font-semibold text-white text-4xl">{category}</span>
            </motion.p>
        </div>
    );
};

export default DifficultyPage;
