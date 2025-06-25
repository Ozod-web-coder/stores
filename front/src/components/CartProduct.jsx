import './CSS/CartProduct.css'
import {useEffect, useState} from "react";
import axios from "axios";



export default function CartProduct({item}) {

    const current = localStorage.getItem('total')
    useEffect(() => {
        localStorage.setItem('total',parseInt(current) + parseInt(item.price))
    })

    function plus(){
        localStorage.setItem(item.id, parseInt(localStorage.getItem(item.id)) || 1 + 1)
        localStorage.setItem('total',parseInt(current) + parseInt(item.price))
    }
    function minus(){
        localStorage.setItem(item.id, parseInt(localStorage.getItem(item.id)) - 1)
        localStorage.setItem('total',parseInt(current) - parseInt(item.price))
        window.location.reload()
    }

    function handleClick() {
        axios.delete(`http://localhost:8000/cartitem/remove/${item.id}/`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res.data);
        })
        window.location.reload()
    }
    return (

        <>
        <div className={"cart-product"}>
            <div className={'cart-image'}>
                <img src={item.image} alt={'Product'}/>
            </div>
            <div className={'cart-info'}>
                <div className={'cart-info-name'}>
                    <div className={'cart-name'}>{item.name}</div>
                    <div className={'cart-price'}>${item.price}</div>
                </div>

                <div className={'cart-description'}>
                    {item.description}
                </div>
            </div>
            <div className={'cart-actions'}>
                <div className={'quantity'}>
                    <div className={'quantity-button'}>
                        -
                    </div>
                    <div className={'quantity-value'}>
                        1
                    </div>
                    <div className={'quantity-button'}>
                        +
                    </div>
                    <div className='cart-message'>This is a feature under development</div>
                </div>
                <div className={'cart-delete'}>
                    <div className={'delete-button'} onClick={handleClick}>
                        Delete
                    </div>
                </div>
            </div>
        </div>

        </>

    )

}