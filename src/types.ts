export interface Question {
    id: number;
    question: string;
    options: string[];
    answer: string
    category: string
    difficulty: string
}

interface UserHistory {
    quizCategory: string,
    difficultyLevel: string,
    score: string | number,
    total: string | number
    date: string
}

export interface User {
    name: string,
    email: string,
    password: string,
    history: UserHistory
}

export interface ReviewedAns {
    id: number,
    question: string,
    selectedAns: string,
    answer: string
}