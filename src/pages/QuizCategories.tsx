// Categories.tsx
import React from "react";
import { Card } from "antd";
import { motion } from "framer-motion";

import { useQuery } from "@tanstack/react-query";
import { api } from "../axiosClient";
import { useDispatch } from "react-redux";
import { setCategory } from "../slices/quizSlice";
import { useNavigate } from "react-router-dom";


export const Categories: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { data: categories } = useQuery({
    queryKey: ["fetchCategories"],
    queryFn: async () => {
      const response = await api.get("/category/get-categories")
      return response.data.categories
    }
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-10">

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
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-gray-800 mb-12 drop-shadow-lg">
        Select a <span className="text-indigo-600">Quiz</span>
      </h1>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl w-full">
        {categories?.map((cat: string) => (
          <motion.div
            // key={cat.name}s
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full"
          >
            <Card
              hoverable
              className={`rounded-3xl shadow-2xl text-center p-10 transition-all duration-300 text-white`}
              onClick={() => {
                dispatch(setCategory(cat))
                navigate("/quiz-categories/difficulty")
              }}            >
              <div className="flex flex-col items-center gap-4">
                <p className="text-2xl font-bold tracking-wide">{cat}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>



    </div>
  );
};
