import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteItem } from '../../../store/cart/cart.action'

const CartTable = (props) => {
    // const { id, img, title, price, quantity } = props.item
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.CartReducer.cartItems)

    const delItem = (id) => {
        dispatch(deleteItem(id))
    }
    return (
        <>
            {cartItems.length === 0 ? (
                <h5 className="text-center">Your cart is empty</h5>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id}>
                                <td className="text-center cart__img-box">
                                    <img src={item.img[0].img} alt="" />
                                </td>
                                <td className="text-center">{item.title}</td>
                                <td className="text-center">${item.price}</td>
                                <td className="text-center">{item.quantity}</td>
                                <td className="text-center cart__item-del">
                                    <i class="ri-delete-bin-line" onClick={() => delItem(item.id)}></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default CartTable
