import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'
import Helmet from '../../components/helmet/Helmet'
import CommonSection from '../../components/ui/common-section/CommonSection'
import { Container, Row, Col } from 'reactstrap'

import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../../../src/store/cart/cart.action'

import './product_details.css'
import ProductCard from '../../components/ui/product-card/ProductCard'
import { useMemo } from 'react'
import Policy from './Policy/Policy'
import { doc, setDoc, addDoc, collection, serverTimestamp, onSnapshot, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase_config'
import Comment from './comment/Comment.jsx'

const ProductDetails = () => {
    const [allProducts, setAllProducts] = useState([])
    const [previewImg, setPreviewImg] = useState()
    const cartItems = useSelector((state) => state.CartReducer.cartItems)
    const totalQuantity = useSelector((state) => state.CartReducer.totalQuantity)
    const totalAmount = useSelector((state) => state.CartReducer.totalAmount)
    const currentUser = useSelector((state) => state.AuthReducer.currentUser)
    const username = useSelector((state) => state.AuthReducer.infoUser?.username)
    const img = useSelector((state) => state.AuthReducer.infoUser?.img)

    const { id } = useParams()
    console.log(id)
    const dispatch = useDispatch()

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, 'products'),
            (snapShot) => {
                let list = []
                snapShot.docs.forEach((doc, index) => {
                    list.push({ id: doc.id, ...doc.data() })
                })
                setAllProducts(list)
            },
            (error) => {
                console.log(error)
            }
        )
        return () => {
            unsub()
        }
    }, [])
    const product = useMemo(() => {
        if (allProducts) return allProducts.find((item) => item.id === id)
    }, [allProducts])

    const relatedProduct = allProducts.filter((item) => product.category === item.category)

    const addProduct = () => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
        localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity))
        localStorage.setItem('totalAmount', JSON.stringify(totalAmount))

        if (product) {
            const { title, price, category, description, img } = product
            dispatch(
                addItem({
                    id,
                    title,
                    price,
                    img,
                })
            )
        }
    }

    // useEffect(() => {
    //     setPreviewImg(product.image01)
    // }, [product])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [product])

    return (
        <>
            {product ? (
                <Helmet title="Product-details">
                    <CommonSection title={product.title} />
                    <section>
                        <Container>
                            <Row>
                                <Col lg="2" md="2">
                                    <div className="product__images ">
                                        {product.img.map((item, index) => (
                                            <div key={index} className="img__item mb-3" onClick={() => setPreviewImg(item.img)}>
                                                <img src={item.img} alt="" className="w-50" />
                                            </div>
                                        ))}
                                    </div>
                                </Col>

                                <Col lg="3" md="3">
                                    <div className="product__main-img">
                                        <img src={previewImg || product.img[0].img} alt="" className="w-100" />
                                    </div>
                                </Col>

                                <Col lg="4" md="4">
                                    <div className="single__product-content">
                                        <h2 className="product__title mb-3">{product.title}</h2>
                                        <p className="product__price">
                                            {' '}
                                            Price: <span>${product.price}</span>
                                        </p>
                                        <p className="category mb-5">
                                            Category: <span>{product.category}</span>
                                        </p>

                                        <button onClick={addProduct} className="addTOCart__btn">
                                            Add to Cart
                                        </button>
                                    </div>
                                </Col>
                                <Col lg="3" md="3">
                                    <Policy />
                                </Col>

                                <Col lg="12">
                                    <div className="tabs d-flex align-items-center gap-5 py-3">
                                        <h6 className="desc">Description</h6>
                                    </div>

                                    <div className="tab__content">
                                        <p>{product.description}</p>
                                    </div>
                                    <Comment />
                                </Col>

                                <Col lg="12" className="mb-5 mt-4">
                                    <h2 className="related__Product-title">You might also like</h2>
                                </Col>

                                {relatedProduct.map((item) => (
                                    <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                                        <ProductCard item={item} />
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </section>
                </Helmet>
            ) : (
                <div>loading</div>
            )}
        </>
    )
}

export default ProductDetails
