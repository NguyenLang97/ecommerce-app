import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'
import Helmet from '../../components/helmet/Helmet'
import CommonSection from '../../components/ui/common-section/CommonSection'
import { Button, Row, Col } from 'antd'

import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../../store/cart/cart.action'

import './product_details.scss'
import ProductCard from '../../components/ui/product-card/ProductCard'
import { useMemo } from 'react'
import Policy from './Policy/Policy'
import { doc, setDoc, addDoc, collection, serverTimestamp, onSnapshot, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase_config'
import Comment from './comment/Comment'

const ProductDetails = () => {
    const [allProducts, setAllProducts] = useState([])
    const [previewImg, setPreviewImg] = useState()
    const cartItems = useSelector((state) => state.CartReducer.cartItems)
    const totalQuantity = useSelector((state) => state.CartReducer.totalQuantity)
    const totalAmount = useSelector((state) => state.CartReducer.totalAmount)
    const currentUser = useSelector((state) => state.AuthReducer.currentUser)
    const username = useSelector((state) => state.AuthReducer.infoUser?.username)
    const img = useSelector((state) => state.AuthReducer.infoUser?.img)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
        localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity))
        localStorage.setItem('totalAmount', JSON.stringify(totalAmount))
    }, [totalQuantity])

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
                    <section className="product-details container ">
                        <Row gutter={16}>
                            <Col lg={16}>
                                <Row className="bg-white bor-rad-8 p-12">
                                    <Col lg={8} md={4} className="product__lits-img">
                                        <Row className="product__main-img">
                                            <img src={previewImg || product.img[0].img} alt="" className="w-100 bor-rad-8" />
                                        </Row>
                                        <Row className="product__images d-flex flex-row mt-4">
                                            {product.img.map((item, index) => (
                                                <div key={index} className=" mb-3" onClick={() => setPreviewImg(item.img)}>
                                                    <img src={item.img} alt="" className="img__item" />
                                                </div>
                                            ))}
                                        </Row>
                                    </Col>

                                    <Col lg={16} md={8} className="product-details__content p-lr-16">
                                        <h2 className="product__title mb-3">{product.title}</h2>
                                        <p className="product__price">
                                            {' '}
                                            Price: <span>${product.price}</span>
                                        </p>
                                        <p className="category mb-5">
                                            Category: <span>{product.category}</span>
                                        </p>
                                        <p className="category mb-5">
                                            Quantity: <span>{product.total}</span>
                                        </p>

                                        <Button onClick={addProduct} className="w-100 btn btn-group-item" style={{ backgroundColor: '#3555c5' }}>
                                            Add to Cart
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={8} md={6} className="">
                                <Policy />
                            </Col>

                            <Col lg={24} className="bg-white bor-rad-8  mt-4">
                                <div className="tabs d-flex align-items-center gap-5 py-3 p-12">
                                    <h6 className="desc">Description</h6>
                                </div>

                                <div className="tab__content p-12">
                                    <p>{product.description}</p>
                                </div>
                            </Col>
                            <Col lg={24} className="bg-white bor-rad-8 p-12 mt-4">
                                <Comment />
                            </Col>
                        </Row>
                        <Row className="bg-white bor-rad-8  mt-4">
                            <Col lg={24} className="mb-5 mt-4 text-center">
                                <h2 className="">You might also like</h2>
                            </Col>

                            {relatedProduct.map((item) => (
                                <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                                    <ProductCard item={item} />
                                </Col>
                            ))}
                        </Row>
                    </section>
                </Helmet>
            ) : (
                <div>loading</div>
            )}
        </>
    )
}

export default ProductDetails
