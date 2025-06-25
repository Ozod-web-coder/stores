import React, { useState } from 'react';
import './CSS/Header.css';
import {useNavigate} from "react-router-dom";
import { BsCart4 } from "react-icons/bs";

export default function Header() {
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate()

    return (
        <aside className="sidebar">
            {/* Левая часть — текст */}
            <div className="menu">
                <span className="menu-item" onClick={() => {navigate('/')}}>Home</span>
                <span className="menu-item" onClick={() => {navigate('category/')}}>Category</span>
            </div>

            {/* Нижняя часть — имя / выйти */}
            <div
                className="user-block"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {hovered ? (
                    <span className="logout-text" onClick={() => {navigate('cart/')}}>Корзина</span>
                ) : (
                    <span style={{margin:32}}><BsCart4 /></span>
                )}
            </div>
        </aside>
    );
}
