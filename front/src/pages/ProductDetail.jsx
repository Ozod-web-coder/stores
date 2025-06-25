import {useEffect, useState} from 'react';
import './CSS/ProductDetail.css';
import {useParams} from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/products/${id}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="message">Loading...</div>;
    if (error) return <div className="message error">Error: {error}</div>;
    if (!product) return <div className="message">Product not found</div>;
    console.log(product.category.name)
    return (
        <div className="product-detail">
            <div className="product-container">
                <div className="product-detail">
                    <div className="product-container">
                        <div className="product-image">
                            <img src={product.image} alt={product.name} className="product-img"/>
                        </div>
                        <div className="product-info">
                            <h1 className="product-name">{product.name}</h1>
                            <b className={'product-category'}>{product.category.name}</b>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">${product.price}</p>
                            <p className='product-price'>Quantity:{product.quantity}</p>
                            <button className="buy-button">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
