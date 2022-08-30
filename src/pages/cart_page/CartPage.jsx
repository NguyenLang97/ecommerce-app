import React from 'react'

import CommonSection from '../../components/ui/common-section/CommonSection'
import Helmet from '../../components/helmet/Helmet'
import './cart_page.css'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import CartTable from './cartTable/CartTable'

const CartPage = () => {
    const cartItems = useSelector((state) => state.CartReducer.cartItems)
    const totalAmount = useSelector((state) => state.CartReducer.totalAmount)
    return (
        <Helmet title="Cart">
            <CommonSection title="Your Cart" />
            <section>
                <Container>
                    <Row>
                        <Col lg="12">
                            {/* {cartItems.length === 0 ? (
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
                                            <Tr item={item} key={item.id} />
                                        ))}
                                    </tbody>
                                </table>
                            )} */}
                            <CartTable />
                            <div className="mt-4">
                                <h6>
                                    Subtotal: $<span className="cart__subtotal">{totalAmount}</span>
                                </h6>
                                <p>Taxes and shipping will calculate at checkout</p>
                                <div className="cart__page-btn">
                                    <button className="addTOCart__btn me-4">
                                        <Link to="/products">Continue Shopping</Link>
                                    </button>
                                    <button className="addTOCart__btn">
                                        <Link to="/checkout">Proceed to checkout</Link>
                                    </button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

// const Tr = (props) => {
//     const { id, img, title, price, quantity } = props.item
//     const dispatch = useDispatch()

//     const deleteItem = () => {
//         dispatch(cartActions.deleteItem(id))
//     }
//     return (
//         <tr>
//             <td className="text-center cart__img-box">
//                 <img src={img[0].img} alt="" />
//             </td>
//             <td className="text-center">{title}</td>
//             <td className="text-center">${price}</td>
//             <td className="text-center">{quantity}px</td>
//             <td className="text-center cart__item-del">
//                 <i class="ri-delete-bin-line" onClick={deleteItem}></i>
//             </td>
//         </tr>
//     )
// }

export default CartPage
