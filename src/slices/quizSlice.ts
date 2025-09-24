// src/slices/quizSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface QuizState {
  category: string | null;
  difficulty: "easy" | "medium" | "hard" | null;
  currentIndex: number;
  answers: Record<number, string>; // questionId -> selectedOption
}

const initialState: QuizState = {
  category: null,
  difficulty: null,
  currentIndex: 0,
  answers: {},
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setDifficulty: (state, action: PayloadAction<"easy" | "medium" | "hard">) => {
      state.difficulty = action.payload;
    },
    nextQuestion: (state) => {
      state.currentIndex += 1;
    },
    selectAnswer: (state, action: PayloadAction<{ questionId: number; answer: string }>) => {
      state.answers[action.payload.questionId] = action.payload.answer;
    },
    resetQuiz: () => initialState,
  },
});

export const { setCategory, setDifficulty, nextQuestion, selectAnswer, resetQuiz } = quizSlice.actions;

export default quizSlice.reducer;
