import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../pages/home/Home'
import AllProducts from '../pages/all_products/AllProducts'
import ProductDetails from '../pages/product_details/ProductDetails'
import CartPage from '../pages/cart_page/CartPage'
import Checkout from '../pages/checkout/Checkout'
import Contact from '../pages/contact/Contact'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import AccountPage from '../pages/account_page/AccountPage'
import { useSelector } from 'react-redux'

const Routers = () => {
    const currentUser = useSelector((state) => state.AuthReducer.currentUser)
    const RequireAuth = ({ children }) => {
        console.log('RequireAuth::', currentUser)
        return currentUser ? children : <Navigate to="/login" />
    }
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
                path="checkout"
                element={
                    <RequireAuth>
                        <Checkout />
                    </RequireAuth>
                }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/account" element={<AccountPage />} />
        </Routes>
    )
}

export default Routers
