import CartProduct from "../components/CartProduct.jsx";
import './CSS/CartPage.css'
import {useEffect, useState} from "react";
import axios from "axios";

export default function CartPage(){
    const token = localStorage.getItem('token')
    const [data, setData] = useState([])
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/cartitem/',{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setData(res.data)
        })
    },[])
    useEffect(() => {
        if (data.length === 0) return;

        Promise.all(
            data.map(item =>
                axios.get(`http://localhost:8000/products/${item.product}`)
            )
        ).then(responses => {
            const allProducts = responses.map(res => res.data);
            setProducts(allProducts);
        }).catch(error => {
            console.error("Ошибка загрузки продуктов:", error);
        });
    }, [data]);
    console.log(localStorage.getItem('total'))
    return (
        <>
            <div className={"cart-container"}>
                {products.map(item => <CartProduct item={item}/>)}

                <div className={"cart-total"}>
                   Total:{localStorage.getItem('total')}
                </div>
            </div>



        </>
    )
}