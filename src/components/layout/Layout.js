import React from 'react'

import Header from '../header/Header.jsx'
import Footer from '../footer/Footer.jsx'
import Routes from '../../routes/Routers'

import Carts from '../ui/cart/Carts.jsx'
import { useSelector } from 'react-redux'

const Layout = () => {
    const showCart = useSelector((state) => state.CartUiReducer.cartIsVisible)
    return (
        <div>
            <Header />
            {showCart && <Carts />}
            <div>
                <Routes />
            </div>
            <Footer />
        </div>
    )
}

export default Layout
