import { ListGroup } from 'reactstrap'
import { Link } from 'react-router-dom'
import CartItem from './CartItem'

import { useDispatch, useSelector } from 'react-redux'
import { toggleCartUi } from '../../../store/cart_ui/cart_ui.action'

import '../../../styles/shopping-cart.css'

const Carts = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.CartReducer.cartItems)
    const totalAmount = useSelector((state) => state.CartReducer.totalAmount)

    const toggleCart = () => {
        dispatch(toggleCartUi(false))
    }
    return (
        <div className="cart__container">
            <ListGroup className="cart">
                <div className="cart__close">
                    <span onClick={toggleCart}>
                        <i class="ri-close-fill"></i>
                    </span>
                </div>

                <div className="cart__item-list">
                    {cartItems.length === 0 ? <h6 className="text-center mt-5">No item added to the cart</h6> : cartItems.map((item, index) => <CartItem item={item} key={index} />)}
                </div>

                <div className="cart__bottom d-flex align-items-center justify-content-between">
                    <h6>
                        Subtotal : <span>${totalAmount}</span>
                    </h6>
                    <button>
                        <Link to="/checkout" onClick={toggleCart}>
                            Checkout
                        </Link>
                    </button>
                </div>
            </ListGroup>
        </div>
    )
}

export default Carts
