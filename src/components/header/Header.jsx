import React, { useRef, useEffect } from 'react'
import { MenuOutlined, ReconciliationOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { AutoComplete, Badge, Button, Drawer, Dropdown, Input, Menu, message } from 'antd'

import defaultAvt from '../../assets/images/default-avt.png'
import logo from '../../assets/images/logo.png'
import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleCartUi } from '../../store/cart_ui/cart_ui.action.jsx'
import { logoutStart } from '../../store/auth/auth.action'

import './header.scss'

const nav__links = [
    {
        display: 'Trang chủ',
        path: '/home',
    },
    {
        display: 'Sản phẩm',
        path: '/products',
    },
    {
        display: 'Giỏ hàng',
        path: '/cart',
    },
    {
        display: 'Liên hệ',
        path: '/contact',
    },
]

const Header = () => {
    const menuRef = useRef(null)
    const isAuth = useSelector((state) => state.AuthReducer.currentUser)
    const username = useSelector((state) => state.AuthReducer.infoUser?.username)
    const img = useSelector((state) => state.AuthReducer.infoUser?.img)

    const totalQuantity = useSelector((state) => state.CartReducer.totalQuantity)
    const dispatch = useDispatch()

    const toggleMenu = () => menuRef.current.classList.toggle('show__menu')

    const toggleCart = () => {
        dispatch(toggleCartUi(true))
    }

    return (
        <header className="header header__shrink">
            <div className='container'>
                <div className="nav__wrapper d-flex align-items-center justify-content-between">
                    <Link to={'/'} className="nav__logo text-center">
                        <img src={logo} alt="logo" />
                        {/* <h5>Tasty Treat</h5> */}
                    </Link>

                    {/* ======= menu ======= */}
                    <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                        <div className="navigation__menu d-flex align-items-center gap-5">
                            {nav__links.map((item, index) => (
                                <NavLink to={item.path} key={index} className={(navClass) => (navClass.isActive ? 'active__menu' : '')}>
                                    {item.display}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* ======== nav right icons ========= */}
                    <div className="nav__right d-flex align-items-center gap-4">
                        <span className="cart__icon" onClick={toggleCart}>
                            <div className="cart__icon-wrap d-flex align-items-center justify-content-center gap-4">
                                <i className="cart__icon-icon ri-shopping-cart-2-line"></i>
                                <span className="cart__badge">{totalQuantity}</span>
                            </div>
                            <span className="cart__icon-title cursor-pointer">Giỏ hàng</span>
                        </span>
                        <div className="nav__user-wrap position-relative">
                            <Link to={isAuth ? '/account' : '/login'} className="nav__user ">
                                {!isAuth ? (
                                    <div className="navbar-tool-item d-flex flex-row align-items-center justify-content-center  ">
                                        {/* <UserOutlined className="icon m-r-12" /> */}
                                        <img src={defaultAvt} className="defaultAvt" />
                                        <div className="d-flex flex-column">
                                            <span className="title">Đăng nhập</span>
                                            <span className="title">Đăng ký</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="navbar-tool-item navbar-tool-item--logined d-flex flex-column align-items-center p-l-0">
                                        <img src={img || defaultAvt} size={20} className="defaultAvt" />
                                        <span className="title">{username}</span>
                                    </div>
                                )}
                            </Link>
                            {!isAuth ? (
                                <div className="user__action  flex-column position-absolute bg-white">
                                    <Link to="/register">
                                        <p className="user__action-title">Đăng ký</p>
                                    </Link>
                                    <Link to="/login">
                                        <p className="user__action-title" onClick={() => dispatch(logoutStart())}>
                                            Đăng nhập
                                        </p>
                                    </Link>
                                </div>
                            ) : (
                                <div className="user__action user__action--logined flex-column position-absolute bg-white">
                                    <Link to="/account">
                                        <p className="user__action-title">Quản lý tài khoản</p>
                                    </Link>
                                    <p className="user__action-title" onClick={() => dispatch(logoutStart())}>
                                        Đăng xuất
                                    </p>
                                </div>
                            )}
                        </div>
                        {/* mobile menu */}
                        <span className="mobile__menu" onClick={toggleMenu}>
                            <MenuOutlined className="menu-icon" />
                        </span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
