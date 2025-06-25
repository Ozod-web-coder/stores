
import './App.css'
import AuthForm from "./pages/Auth.jsx";
import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";
import Layout from "../Layout.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Category from "./pages/Category.jsx";
import CartPage from "./pages/CartPage.jsx";
import {useEffect} from "react";

function App() {
    useEffect(() => {

        localStorage.setItem('total', 0)
    },[])

  return (
    <>
        <Router>
            <Routes>
                <Route element={<Layout/>}  >
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path='category' element={<Category/>} />
                    <Route path="cart" element={<CartPage/>} />
                    <Route path="auth" element={<AuthForm/>} />
                </Route>
            </Routes>
        </Router>
    </>
  )
}

export default App
