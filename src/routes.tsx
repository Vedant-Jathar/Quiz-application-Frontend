import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import { Categories } from "./pages/QuizCategories"
import DifficultyPage from "./pages/DifficultyPage"
import QuizPage from "./pages/Questions"
import ResultPage from "./pages/ResultPage"
import { Home } from "./pages/Home"
import QuizHistory from "./pages/History"
import AttemptReview from "./pages/AttemptDetailsPage"
import LeaderboardPage from "./pages/LeaderBoardPage"

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/quiz-categories" element={<Categories />} />
                <Route path="/quiz-categories/difficulty" element={<DifficultyPage />} />
                <Route path="/questions" element={<QuizPage />} />
                <Route path="/result" element={<ResultPage />} />
                <Route path="/quiz-history" element={<QuizHistory />} />
                <Route path="/quiz-history/attempt/:id" element={<AttemptReview />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
            </Routes>
        </BrowserRouter>
    )
}