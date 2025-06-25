import './CSS/Category.css'
import {useEffect, useState} from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard.jsx";

export default function Category(){
    const [data, setData] = useState([])
    const [products, setProducts] = useState([])
    const [current, setCurrent] = useState('')
    useEffect(() => {
        axios.get('http://localhost:8000/categories/').then(res => {
            setData(res.data)
        })
    },[])

    useEffect(() => {
        axios.get(`http://localhost:8000/categorypro/?category=${current}`).then(res => {
            setProducts(res.data)
            console.log(res.data)
        })
    }, [current])
    return (
        <>
            <div className={"category"}>
                <div className={"category-container"}>
                    {data.map(item => <div className={'cat'} onClick={() => {setCurrent(item.name.toLowerCase().trim())}}>{item.name}</div>)}
                </div>
                <div className={"products-list"}>
                    <div className={"name-category"}>
                        <b style={{margin:12}}>{current.toUpperCase()}</b>
                    </div>
                    <div className={"products"}>
                        {products.map(item => <ProductCard item={item}/>)}
                    </div>
                </div>
            </div>
        </>
    )
}