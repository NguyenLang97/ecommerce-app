import { useState } from 'react'
import { Link } from 'react-router-dom'
// import { logoutStart } from '../../redux/action'
import { Container, Row, Col } from 'reactstrap'
import './account_page.scss'
import defaultAvt from '../../assets/images/default-avt.png'
// import OrderList from './OrderList'
// import UpdateAccountForm from './UpdateForm'
// import AddressUserList from './UserAddressList'
import ProfileUser from './profile_user/ProfileUser'
import AddressUser from './address_user/AddressUser'
import OrderList from './oder_list/OrderList'
import { useSelector, useDispatch } from 'react-redux'
import { logoutStart } from '../../store/auth/auth.action'
import RootReducerState from '../../models/root_reducer'

function AccountPage() {
    const dispatch = useDispatch()
    const [activeKey, setActiveKey] = useState('')

    const img = useSelector((state: RootReducerState) => state.AuthReducer.infoUser?.img)
    const username = useSelector((state: RootReducerState) => state.AuthReducer.infoUser?.username)

    const menu = [
        {
            Icon: <i className="ri-user-settings-line"></i>,
            title: 'Thông tin tài khoản',
            key: '',
        },
        {
            Icon: <i className="ri-file-list-line"></i>,
            title: 'Quản lý đơn hàng',
            key: 'orders',
        },
        {
            Icon: <i className="ri-compass-3-line"></i>,
            title: 'Địa chỉ giao hàng',
            key: 'address',
        },
        {
            Icon: <i className="ri-notification-2-line"></i>,
            title: 'Thông báo',
            key: 'notifications',
        },
    ]

    // render component with key
    function renderComponent(key = '') {
        switch (key) {
            case '':
                return (
                    <>
                        <h2 className="m-b-16">Thông tin tài khoản</h2>
                        <ProfileUser />
                    </>
                )
            case 'orders':
                return (
                    <>
                        <h2 className="m-b-16">Các đơn hàng của bạn</h2>
                        <OrderList />
                    </>
                )
            case 'address':
                return (
                    <>
                        <h2 className="m-b-16">Danh sách địa chỉ giao hàng của bạn</h2>
                        <AddressUser />
                    </>
                )
            case 'notifications':
                return (
                    <>
                        <h2 className="m-b-16">Thông báo</h2>
                        <p>Hiện tại không có thông báo</p>
                    </>
                )
            default:
                ;<>
                    <h2 className="m-b-16">Thông tin tài khoản</h2>
                    <ProfileUser />
                </>
        }
    }

    return (
        <section className="profile__container">
            <Container>
                {/* <button onClick={()=>dispatch(logoutStart())}>logout</button> */}
                <Row>
                    <Col lg="3" className="profile__user text-center ">
                        <img className="w-25 mb-3 rounded-circle" src={img || defaultAvt} alt="" />
                        <h6 className=" mb-3">
                            Tài khoản của : <span>{username}</span>
                        </h6>
                        <ul className="list-group d-flex flex-column ">
                            {menu.map((item, index) => (
                                <Link key={index} to={`${item.key}`}>
                                    <li className="list-group-item d-flex gap-2" onClick={() => setActiveKey(item.key)}>
                                        {item.Icon}
                                        {item.title}
                                    </li>
                                </Link>
                            ))}
                            <li className="list-group-item d-flex gap-2" onClick={() => dispatch(logoutStart())}>
                                <i className="ri-logout-box-line"></i>
                                Đăng xuất
                            </li>
                        </ul>
                    </Col>
                    <Col lg="9" className="details__user">
                        {renderComponent(activeKey)}
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AccountPage
