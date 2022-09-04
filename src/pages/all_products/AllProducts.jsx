import React, { useState, useEffect } from 'react'
import Helmet from '../../components/helmet/Helmet'
import CommonSection from '../../components/ui/common-section/CommonSection'

import { Row, Col } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import {
    collection,
    // getDocs,
    onSnapshot,
} from 'firebase/firestore'
import { db } from '../../firebase/firebase_config'

import ProductCard from '../../components/ui/product-card/ProductCard'
import ReactPaginate from 'react-paginate'

import './all_products.scss'
import '../../styles/pagination.scss'

const AllProducts = () => {
    const [searchTerm, setSearchTerm] = useState('')

    const [pageNumber, setPageNumber] = useState(0)
    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, 'products'),
            (snapShot) => {
                let list = []
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() })
                })
                setAllProducts(list)

                // setLoading(false)
            },
            (error) => {
                console.log(error)
            }
        )
        return () => {
            unsub()
        }
    }, [])

    const searchedProduct = allProducts.filter((item) => {
        if (searchTerm.value === '') {
            return item
        }
        if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return item
        } else {
            return console.log('not found')
        }
    })

    const productPerPage = 12
    const visitedPage = pageNumber * productPerPage
    const displayPage = searchedProduct.slice(visitedPage, visitedPage + productPerPage)

    const pageCount = Math.ceil(searchedProduct.length / productPerPage)

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    return (
        <Helmet title="All-Products">
            <CommonSection title="All Products" />

            <section className="all-products container bg-white bor-rad-8 p-16">
                <Row gutter={16} className="d-flex flex-wrap">
                    <Col span={24} xl={12} lg={12} sm={12}>
                        <div className="search__widget d-flex align-items-center justify-content-between ">
                            <input type="text" placeholder="I'm looking for...." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            <span className="d-flex ">
                                <SearchOutlined />
                            </span>
                        </div>
                    </Col>

                    <Col span={24} xl={12} lg={12} sm={12} className="mb-5">
                        <div className="sorting__widget text-end">
                            <select className="w-50">
                                <option>Default</option>
                                <option value="ascending">Alphabetically, A-Z</option>
                                <option value="descending">Alphabetically, Z-A</option>
                                <option value="high-price">High Price</option>
                                <option value="low-price">Low Price</option>
                            </select>
                        </div>
                    </Col>
                </Row>

                <Row gutter={16} className="w-100">
                    {displayPage.map((item) => (
                        <Col span={24} sm={12} lg={8} xl={6} key={item.id} className="mb-4">
                            <ProductCard item={item} />
                        </Col>
                    ))}
                </Row>
                <Row>
                    <Col span={24}>
                        <ReactPaginate pageCount={pageCount} onPageChange={changePage} previousLabel={'Prev'} nextLabel={'Next'} containerClassName=" paginationBttns " />
                    </Col>
                </Row>
            </section>
        </Helmet>
    )
}

export default AllProducts
