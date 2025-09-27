export interface Question {
    id: number;
    question: string;
    options: string[];
    answer: string
    category: string
    difficulty: string
}

export interface reviewedAns {
    id: number,
    question: string,
    selectedAns: string,
    answer: string
}

export interface UserHistory {
    _id: string,
    quizCategory: string,
    difficultyLevel: string,
    score: string | number,
    total: string | number
    date: string
    reviewedAnswers: reviewedAns[]
}

export interface User {
    _id: string
    name: string,
    email: string,
    password: string,
    history: UserHistory[]
}

export interface ReviewedAns {
    id: number,
    question: string,
    selectedAns: string,
    answer: string
}