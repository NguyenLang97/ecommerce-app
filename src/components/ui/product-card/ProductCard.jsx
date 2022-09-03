import { useEffect } from 'react'
import { Button, Col, Image, InputNumber, message, Rate, Row } from 'antd'

import './product-card.scss'

import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../../../store/cart/cart.action'

const ProductCard = (props) => {
    const cartItems = useSelector((state) => state.CartReducer.cartItems)
    const totalQuantity = useSelector((state) => state.CartReducer.totalQuantity)
    const totalAmount = useSelector((state) => state.CartReducer.totalAmount)

    const { id, title, img, price, total } = props.item
    const dispatch = useDispatch()
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
        localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity))
        localStorage.setItem('totalAmount', JSON.stringify(totalAmount))
    }, [totalQuantity])
    const addToCart = () => {
        dispatch(
            addItem({
                id,
                title,
                img,
                price,
            })
        )
    }

    return (
        <div className="product__item">
            <div className="product__item-img">
                <Link to={`/products/${id}`}>
                    <img src={img[0].img} alt="product-img" className="w-50" />
                </Link>
            </div>

            <div className="product__item-content">
                <h5>
                    <Link to={`/products/${id}`}>{title}</Link>
                </h5>
                <div className="product__item-info d-flex flex-column align-items-center justify-content-between ">
                    <span className="product__item-price">${price}</span>
                    <span className="product__item-total">Remain: {total}</span>

                    <Button onClick={addToCart} size="large" className="w-100 btn btn-group-item" style={{ backgroundColor: '#3555c5' }}>
                        THÊM GIỎ HÀNG
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
