import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteItem, removeItem, addItem } from '../../../store/cart/cart.action'

const CartTable = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.CartReducer.cartItems)

    const { id, title, price, img, quantity } = cartItems
    console.log({ id })

    const totalAmount = useSelector((state) => state.CartReducer.totalAmount)
    const totalQuantity = useSelector((state) => state.CartReducer.totalQuantity)
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
        localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity))
        localStorage.setItem('totalAmount', JSON.stringify(totalAmount))
    }, [totalQuantity])

    const delItem = (id) => {
        dispatch(deleteItem(id))
    }

    const decreaseItem = (id) => {
        console.log('giam')
        dispatch(removeItem(id))
    }

    const incrementItem = ({ id, title, price, img }) => {
        dispatch(
            addItem({
                id,
                title,
                price,
                img,
            })
        )
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
                            <th>totalPrice</th>
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
                                <td className="text-center">
                                    {item.quantity}
                                    <div className=" d-flex align-items-center justify-content-between increase__decrease-btn">
                                        <span className="increase__btn" onClick={() => incrementItem({ id: item.id, title: item.title, price: item.price, img: item.img[0].img })}>
                                            <i class="ri-add-line"></i>
                                        </span>
                                        <span className="decrease__btn" onClick={() => decreaseItem(item.id)}>
                                            <i class="ri-subtract-line"></i>
                                        </span>
                                    </div>
                                </td>
                                <td className="text-center cart__item-del">${item.totalPrice}</td>
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
