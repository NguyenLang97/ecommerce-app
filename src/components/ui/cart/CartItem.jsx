import React from 'react'
import { ListGroupItem } from 'reactstrap'

import '../../../styles/cart-item.css'

import { useDispatch } from 'react-redux'
import { addItem, removeItem, deleteItem } from '../../../store/cart/cart.action'

// import { cartActions } from '../../../store/shopping-cart/cartSlice'

const CartItem = ({ item }) => {
    const { id, title, price, img, quantity, totalPrice } = item
    console.log(item)

    const dispatch = useDispatch()

    const incrementItem = () => {
        dispatch(
            addItem({
                id,
                title,
                price,
                img,
            })
        )
    }

    const decreaseItem = () => {
        dispatch(removeItem(id))
    }

    const delItem = () => {
        dispatch(deleteItem(id))
    }

    return (
        <ListGroupItem className="border-0 cart__item">
            <div className="cart__item-info d-flex gap-2">
                <img src={img[0].img} alt="product-img" />

                <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
                    <div>
                        <h6 className="cart__product-title">{title}</h6>
                        <p className=" d-flex align-items-center gap-5 cart__product-price">
                            SL: {quantity}
                            <span>{price} VND/SP</span>
                            <span className="quantity">{Number(totalPrice)} VND</span>
                        </p>

                        <div className=" d-flex align-items-center justify-content-between increase__decrease-btn">
                            <span className="increase__btn" onClick={incrementItem}>
                                <i class="ri-add-line"></i>
                            </span>
                            <span className="quantity">{quantity}</span>
                            <span className="decrease__btn" onClick={decreaseItem}>
                                <i class="ri-subtract-line"></i>
                            </span>
                        </div>
                    </div>

                    <span className="delete__btn" onClick={delItem}>
                        <i class="ri-close-line"></i>
                    </span>
                </div>
            </div>
        </ListGroupItem>
    )
}

export default CartItem
