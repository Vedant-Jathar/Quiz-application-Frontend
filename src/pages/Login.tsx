// Login.tsx
import React from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { api } from "../axiosClient";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()

    const handleLogin = async () => {
        const data = form.getFieldsValue()
        const response = await api.post("/auth/login", data)

        if (response.status === 200) {
            navigate("/quiz-categories")
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-purple-600 mb-2">Quiz Quest</h1>
                    <p className="text-gray-500">Log in to play some quirky quizzes!</p>
                </div>
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please enter your email" },
                            { type: "email", message: "Enter a valid email" }
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please enter your password" }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full" onClick={handleLogin}>
                            Login
                        </Button>
                    </Form.Item>

                    <div className="text-center">
                        Don't have an account? <Link to="/register">Register</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};
