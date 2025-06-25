
import './CSS/ProductCard.css'
import {data, useNavigate} from "react-router-dom";
import axios from "axios";

export default function ProductCard({item}) {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    function handleClick() {
        navigate(`/product/${item.id}`)
    }

    function handleClick2() {
        axios.post('http://localhost:8000/cartitem/',
            { product: item.id, quantity: 1 },  // тело запроса
            {                                   // опции, включая headers
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.error('Ошибка:', error.response?.data || error.message);
            });
    }


    return (
        <>
            <div className={"product-card"}>
                <div className={"product-card-image"}>
                    <img src={item.image} alt={'Product'}/>
                </div>
                <div className={"product-info"}>
                    <div className={"product-price"}>${item.price}</div>
                    <div className={"product-description"}>
                        <div style={{color: 'black', fontSize: '22px'}}>
                            <b>{item.name}</b>
                        </div>
                        {item.category.name}
                    </div>
                </div>
                <div className={"product-actions"}>
                    <button className={"details-button"} onClick={handleClick}>Details</button>
                    <button className={"buy-button"} onClick={handleClick2}>Buy Now</button>
                </div>
            </div>
        </>
    )
}