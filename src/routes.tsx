import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import { Categories } from "./pages/QuizCategories"
import DifficultyPage from "./pages/DifficultyPage"
import QuizPage from "./pages/Questions"

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/quiz-categories" element={<Categories />} />
                <Route path="/quiz-categories/difficulty" element={<DifficultyPage />} />
                <Route path="/questions" element={<QuizPage />} />
            </Routes>
        </BrowserRouter>
    )
}