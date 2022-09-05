import React from 'react'
import { CloseSquareOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons'

import './cart-item.scss'

import { useDispatch } from 'react-redux'
import { addItem, removeItem, deleteItem } from '../../../../store/cart/cart.action'
import { List } from 'antd'
import CartItemsState from '../../../../models/cart_items'

const CartItem = ( item : CartItemsState) => {
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
        <List className="cart__item p-2">
            <div className="cart__content d-flex gap-2">
                <img src={img[0].img} alt="product-img" />

                <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
                    <div className="cart__item">
                        <h6 className="cart__item-title">{title}</h6>
                        <p className=" cart__item-price d-flex align-items-center gap-5">
                            SL: {quantity}
                            <span>{price} VND/SP</span>
                            <span className="quantity">{Number(totalPrice)} VND</span>
                        </p>

                        <div className="cart__btn d-flex align-items-center justify-content-between ">
                            <div className="d-flex cart__btn-increase" onClick={incrementItem}>
                                <PlusOutlined />
                            </div>
                            <span className="quantity">{quantity}</span>
                            <div className="d-flex cart__btn-decrease" onClick={decreaseItem}>
                                <MinusOutlined />
                            </div>
                        </div>
                    </div>

                    <span className="cart__delete" onClick={delItem}>
                        <CloseSquareOutlined />
                    </span>
                </div>
            </div>
        </List>
    )
}

export default CartItem
