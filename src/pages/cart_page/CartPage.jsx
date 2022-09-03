import React from 'react'

import CommonSection from '../../components/ui/common-section/CommonSection'
import Helmet from '../../components/helmet/Helmet'
import './cart_page.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Button } from 'antd'
import { Link } from 'react-router-dom'
import CartTable from './cartTable/CartTable'

const CartPage = () => {
    const cartItems = useSelector((state) => state.CartReducer.cartItems)
    const totalAmount = useSelector((state) => state.CartReducer.totalAmount)
    const totalQuantity = useSelector((state) => state.CartReducer.totalQuantity)
    console.log({ totalQuantity })

    return (
        <Helmet title="Cart">
            <CommonSection title="Your Cart" />
            <section className="cart-page container">
                <Row>
                    <Col lg={24}>
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
                                Total Product: <span className="cart__subtotal">{totalQuantity}</span>
                            </h6>
                            <h6>
                                Subtotal: $<span className="cart__subtotal">{totalAmount}</span>
                            </h6>
                            <p>Taxes and shipping will calculate at checkout</p>
                            <div className="cart__page-btn d-flex justify-content-between flex-row gap-3 flex-wrap">
                                <Button size="large" className="btn btn-group-item" style={{ backgroundColor: '#3555c5' }}>
                                    <Link to="/products">Continue Shopping</Link>
                                </Button>
                                <Button size="large" className="btn btn-group-item" style={{ backgroundColor: '#3555c5' }}>
                                    <Link to="/checkout">Proceed to checkout</Link>
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
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
