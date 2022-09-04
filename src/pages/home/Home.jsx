import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Helmet from '../../components/helmet/Helmet'
import { Container, Col, Row } from 'antd'

// import Category from '../../components/ui/category/Category'
import _ from 'lodash'

import './home.scss'

// import products from '../../api/products'

import {
    collection,
    // getDocs,
    onSnapshot,
} from 'firebase/firestore'
import { db } from '../../firebase/firebase_config'
import foodCategoryImg01 from '../../assets/images/hamburger.png'
import foodCategoryImg02 from '../../assets/images/pizza.png'
import foodCategoryImg03 from '../../assets/images/bread.png'
import laptopImg from '../../assets/products/laptop_32px.png'
import mobileImg from '../../assets/products/mobile_32px.png'
import mouseImg from '../../assets/products/mouse_32px.png'

import ProductCard from '../../components/ui/product-card/ProductCard'
import SaleOff from '../../components/sale_off/SaleOff'
import FamousBrand from '../../components/famous_brand/FamousBrand'
// import DiscountList from '../../components/DiscountList/index'

const Home = () => {
    const [category, setCategory] = useState('ALL')
    const [allProducts, setAllProducts] = useState([])
    const [filter, setFilter] = useState(allProducts)
    const [loading, setLoading] = useState(true)
    const [hotProduct, setHotProduct] = useState([])

    const currentUser = useSelector((state) => state.AuthReducer.currentUser)
    const infoUser = useSelector((state) => state.AuthReducer.infoUser)

    const totalAmount = useSelector((state) => state.CartReducer.totalAmount)
    const cartItems = useSelector((state) => state.CartReducer.cartItems)
    const totalQuantity = useSelector((state) => state.CartReducer.totalQuantity)
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
        localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity))
        localStorage.setItem('totalAmount', JSON.stringify(totalAmount))
    }, [totalQuantity])

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        localStorage.setItem('infoUser', JSON.stringify(infoUser))
    }, [currentUser])

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, 'products'),
            (snapShot) => {
                let list = []
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() })
                })
                const cloneList = _.clone(list)
                setFilter(cloneList)
                setAllProducts(list)

                const filteredPizza = list.filter((item) => item.category === 'Điện thoại')
                const slicePizza = filteredPizza.slice(0, 4)
                setHotProduct(slicePizza)
                setLoading(false)
            },
            (error) => {
                console.log(error)
            }
        )
        return () => {
            unsub()
        }
    }, [])
    // console.log('allProducts:', allProducts)
    const filterProduct = (category) => {
        const updateProduct = allProducts.filter((item) => item.category === category)
        setFilter(updateProduct)
    }

    useEffect(() => {
        if (category === 'ALL') {
            setFilter(allProducts)
        }

        if (category === 'Laptop') {
            filterProduct('Laptop')
        }

        if (category === 'Mouse') {
            filterProduct('Mouse')
        }

        if (category === 'Điện thoại') {
            filterProduct('Điện thoại')
        }
    }, [category])

    return (
        <div className="home">
            <Helmet title="home">
                {/* Sale off */}
                <section>
                    <SaleOff />
                </section>

                {/* Thương hiệu nổi bật */}
                <section className="home__famous-brand-wrap container">
                    <Row>
                        <Col className="home__famous-brand bg-white box-sha-home bor-rad-8 ">
                            <FamousBrand />
                        </Col>
                    </Row>
                </section>

                {/* Quảng cáo */}
                <section className="home__adv-wrap container">
                    <Row>
                        <Col className="home__adv w-100">
                            <a href="https://www.apple.com/watch/" target="blank">
                                <img className="home__adv-img w-100 bor-rad-8" src="https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608268459/others/1_iorzsj.webp" />
                            </a>
                        </Col>
                    </Row>
                </section>

                <section className="home__category-wrap container">
                    <Row>
                        <Col span={24} className="text-center">
                            <h2>Sản phẩm phổ biến</h2>
                        </Col>

                        <Col span={24}>
                            <div className="home__category d-flex align-items-center justify-content-between gap-4-xl flex-wrap">
                                <Col sm={6} md={6} lg={6} xl={6}>
                                    <button className={`all__btn  ${category === 'ALL' ? ' home__category-btn--active' : ''} `} onClick={() => setCategory('ALL')}>
                                        All
                                    </button>
                                </Col>
                                <Col sm={6} md={6} lg={6} xl={6}>
                                    <button className={`d-flex align-items-center ${category === 'Laptop' ? 'home__category-btn--active' : ''} `} onClick={() => setCategory('Laptop')}>
                                        <img src={laptopImg} alt="" />
                                        Laptop
                                    </button>
                                </Col>
                                <Col sm={6} md={6} lg={6} xl={6}>
                                    <button className={`d-flex align-items-center ${category === 'Điện thoại' ? ' home__category-btn--active' : ''} `} onClick={() => setCategory('Điện thoại')}>
                                        <img src={mobileImg} alt="" />
                                        Điện thoại
                                    </button>
                                </Col>
                                <Col sm={6} md={6} lg={6} xl={6}>
                                    <button className={`d-flex align-items-center ${category === 'Mouse' ? ' home__category-btn--active' : ''} `} onClick={() => setCategory('Mouse')}>
                                        <img src={mouseImg} alt="" />
                                        Chuột
                                    </button>
                                </Col>
                            </div>
                        </Col>
                        <Row className="w-100 bg-white bor-rad-8 mt-5 p-3">
                            {filter.map((item) => (
                                <Col span={24} sm={12} lg={8} xl={6} key={item.id} className="w-100">
                                    <ProductCard item={item} />
                                </Col>
                            ))}
                        </Row>
                    </Row>
                </section>

                {/* Quảng cáo */}
                <section className="home__adv-wrap container">
                    <Row>
                        <Col className="home__adv w-100">
                            <a href="https://www.panasonic.com/vn/" target="blank">
                                <img className="home__adv-img w-100 bor-rad-8" src="https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608268459/others/2_wapowv.webp" />
                            </a>
                        </Col>
                    </Row>
                </section>

                {/* Sản phẩm bán chạy: Laptop */}
                <section className="container">
                    <Row>
                        <Col span={24} className="text-center ">
                            <h2>Sản phẩm bán chạy</h2>
                        </Col>
                    </Row>
                    <Row className="w-100 bg-white bor-rad-8 mt-5 p-3">
                        {hotProduct.map((item) => (
                            <Col span={24} sm={12} lg={8} xl={6} key={item.id}>
                                <ProductCard item={item} />
                            </Col>
                        ))}
                    </Row>
                </section>
            </Helmet>
        </div>
    )
}

export default Home
