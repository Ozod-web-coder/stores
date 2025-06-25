'use client'

import { useState } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import "./CSS/Auth.css"

const schema = z.object({
    username: z.string().min(3, "Минимум 3 символа"),
    password: z.string().min(6, "Минимум 6 символов")
})

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true)
    const [message, setMessage] = useState("")

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schema)
    })

    const onSubmit = async (data) => {
        try {
            const url = isLogin
                ? "http://localhost:8000/login/"
                : "http://localhost:8000/register/"

            const response = await axios.post(url, data)

            if (response.status === 200) {
                setMessage(isLogin ? "Успешный вход" : "Регистрация прошла успешно")
                console.log("Ответ сервера:", response.data)
                localStorage.setItem("token", response.data.access)
            } else {
                setMessage("Ошибка: " + response.statusText)
            }
        } catch (error) {
            console.error(error)
            setMessage("Ошибка: " + (error.response?.data?.message || "Сервер недоступен"))
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">
                    {isLogin ? "Вход в аккаунт" : "Создание аккаунта"}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                    <div className="form-group">
                        <label>Логин</label>
                        <input type="text" {...register("username")} placeholder="Введите логин" />
                        {errors.username && <p className="error-text">{errors.username.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Пароль</label>
                        <input type="password" {...register("password")} placeholder="••••••••" />
                        {errors.password && <p className="error-text">{errors.password.message}</p>}
                    </div>

                    <button type="submit" className="submit-button">
                        {isLogin ? "Войти" : "Зарегистрироваться"}
                    </button>
                </form>

                {message && <p className="message">{message}</p>}

                <p className="switch-text">
                    {isLogin ? "Нет аккаунта?" : "Уже зарегистрированы?"}{" "}
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin)
                            setMessage("")
                        }}
                        className="switch-button"
                    >
                        {isLogin ? "Регистрация" : "Войти"}
                    </button>
                </p>
            </div>
        </div>
    )
}
