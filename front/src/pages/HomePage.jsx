import './CSS/HomaPage.css'
import Slide from "../components/Slide.jsx";
import axios from "axios";
import {useEffect, useState} from "react";
import ProductCard from "../components/ProductCard.jsx";
import {useNavigate} from "react-router-dom";

export default function HomePage(){
    const [data, setData] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('auth/')
        }
    }, []);
    useEffect(() => {
        axios.get('http://localhost:8000/products/')
            .then(res => {
                setData(res.data)
            })

    }, [])
    console.log(data)
    return (
        <>
            <div className={"container"}>
                <Slide/>
                <div className={"products"}>
                    {data.map(item => <ProductCard item={item}/>)}
                </div>

            </div>
        </>
    )
}