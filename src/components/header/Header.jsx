import React, { useRef, useEffect } from 'react'
import defaultAvt from '../../assets/images/default-avt.png'

import { Container } from 'reactstrap'
import logo from '../../assets/images/logo.png'
import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleCartUi } from '../../store/cart_ui/cart_ui.action.jsx'
import { logoutStart } from '../../store/auth/auth.action'

import './header.css'

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
            <Container>
                <div className="nav__wrapper d-flex align-items-center justify-content-between">
                    <Link to={'/'} className="logo">
                        <img src={logo} alt="logo" />
                        {/* <h5>Tasty Treat</h5> */}
                    </Link>

                    {/* ======= menu ======= */}
                    <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                        <div className="menu d-flex align-items-center gap-5">
                            {nav__links.map((item, index) => (
                                <NavLink to={item.path} key={index} className={(navClass) => (navClass.isActive ? 'active__menu' : '')}>
                                    {item.display}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* ======== nav right icons ========= */}
                    <div className="nav__right text d-flex align-items-center gap-4">
                        <span className="cart__icon" onClick={toggleCart}>
                            <div className="cart__icon-wrap d-flex align-items-center justify-content-center gap-4">
                                <i className="cart__icon-icon ri-shopping-cart-2-line"></i>
                                <span className="cart__badge">{totalQuantity}</span>
                            </div>
                            <span className="title cursor-pointer">Giỏ hàng</span>
                        </span>
                        <div className="nav__user-wrap position-relative">
                            <Link to={isAuth ? '/account' : '/login'} className="nav__user ">
                                {!isAuth ? (
                                    <div className="d-flex flex-column align-items-center justify-content-center navbar-tool-item p-l-0">
                                        {/* <UserOutlined className="icon m-r-12" /> */}
                                        <img src={defaultAvt} className="defaultAvt" />
                                        <span className="title">Đăng nhập</span>
                                    </div>
                                ) : (
                                    <div className="d-flex flex-column navbar-tool-item p-l-0">
                                        <img src={img} size={20} className="defaultAvt" />
                                        <span className="title">{username}</span>
                                    </div>
                                )}
                            </Link>
                            <div className="user__action flex-column position-absolute bg-white">
                                <Link to="/account">
                                    <p className="user__action-title">Quản lý tài khoản</p>
                                </Link>
                                <p className="user__action-title" onClick={() => dispatch(logoutStart())}>
                                    Đăng xuất
                                </p>
                            </div>
                        </div>
                        {/* mobile menu */}
                        <span className="mobile__menu" onClick={toggleMenu}>
                            <i class="ri-menu-line"></i>
                        </span>
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default Header
