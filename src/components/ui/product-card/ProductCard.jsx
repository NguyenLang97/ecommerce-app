import { useEffect } from 'react'

import './product-card.css'

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
            <div className="product__img">
                <Link to={`/products/${id}`}>
                    <img src={img[0].img} alt="product-img" className="w-50" />
                </Link>
            </div>

            <div className="product__content">
                <h5>
                    <Link to={`/products/${id}`}>{title}</Link>
                </h5>
                <div className=" d-flex flex-column align-items-center justify-content-between ">
                    <span className="product__price">${price}</span>
                    <span className="product__price">Remain: {total}</span>

                    <button className="addToCart__btn" onClick={addToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
