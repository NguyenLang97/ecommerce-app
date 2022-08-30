import React, { useState, useEffect } from 'react'
import Helmet from '../../components/helmet/Helmet'
import CommonSection from '../../components/ui/common-section/CommonSection'

import { Container, Row, Col } from 'reactstrap'
import {
    collection,
    // getDocs,
    onSnapshot,
} from 'firebase/firestore'
import { db } from '../../firebase/firebase_config'

import ProductCard from '../../components/ui/product-card/ProductCard'
import ReactPaginate from 'react-paginate'

import './all_products.css'
import '../../styles/pagination.css'

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

            <section>
                <Container>
                    <Row>
                        <Col lg="6" md="6" sm="6" xs="12">
                            <div className="search__widget d-flex align-items-center justify-content-between ">
                                <input type="text" placeholder="I'm looking for...." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                <span>
                                    <i class="ri-search-line"></i>
                                </span>
                            </div>
                        </Col>
                        <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
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

                        {displayPage.map((item) => (
                            <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                                <ProductCard item={item} />
                            </Col>
                        ))}

                        <div>
                            <ReactPaginate pageCount={pageCount} onPageChange={changePage} previousLabel={'Prev'} nextLabel={'Next'} containerClassName=" paginationBttns " />
                        </div>
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default AllProducts
