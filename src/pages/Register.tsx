import React from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { api } from "../axiosClient";
import { useNavigate } from "react-router-dom";
import { setUser } from "../slices/authSlice";
import { useDispatch } from "react-redux";

export const Register: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleRegister = async () => {
        const data = form.getFieldsValue()
        const response = await api.post("/auth/register", data)

        if (response.status === 201) {
            const responseUser = await api.get("/auth/get-user")
            if (responseUser.status === 200) {
                dispatch(setUser(responseUser.data.user))
            }
            navigate("/quiz-categories")
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
                {/* App Logo / Title */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-purple-600 mb-2">Quiz Quest</h1>
                    <p className="text-gray-500">Sign up to start your quiz adventure!</p>
                </div>

                <Form form={form} layout="vertical" >

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter your name" }]}
                    >
                        <Input
                            placeholder="Your Name"
                            className="rounded-xl border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please enter your email" },
                            { type: "email", message: "Enter a valid email" }
                        ]}
                    >
                        <Input
                            placeholder="Email"
                            className="rounded-xl border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: "Please enter your password" },
                            { min: 6, message: "It should have at least 6 characters" }
                        ]}
                    >
                        <Input.Password
                            placeholder="Password"
                            className="rounded-xl border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-3 rounded-xl shadow-lg transition-all"
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                    </Form.Item>

                    <div className="text-center text-gray-500 mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="text-purple-600 font-medium hover:underline">
                            Login
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};
