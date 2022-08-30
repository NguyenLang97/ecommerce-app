import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// import { logoutStart } from '../../redux/action'
import { Container, Row, Col } from 'reactstrap'
import './account_page.scss'
import defaultAvt from '../../assets/images/default-avt.png'
// import OrderList from './OrderList'
// import UpdateAccountForm from './UpdateForm'
// import AddressUserList from './UserAddressList'
import ProfileUser from './profile_user/ProfileUser'

function AccountPage() {
    const dispatch = useDispatch()

    const menu = [
        {
            Icon: <i class="ri-user-settings-line"></i>,
            title: 'Thông tin tài khoản',
            key: '',
        },
        {
            Icon: <i className="ri-file-list-line"></i>,
            title: 'Quản lý đơn hàng',
            key: 'orders',
        },
        {
            Icon: <i class="ri-compass-3-line"></i>,
            title: 'Địa chỉ giao hàng',
            key: 'addresses',
        },
        {
            Icon: <i class="ri-notification-2-line"></i>,
            title: 'Thông báo',
            key: 'notifications',
        },
    ]

    // render component with key
    // function renderComponent(key = '') {
    //     switch (key) {
    //         case '':
    //             return (
    //                 <>
    //                     <h2 className="m-b-16">Thông tin tài khoản</h2>
    //                     <UpdateAccountForm />
    //                 </>
    //             )
    //         case 'orders':
    //             return (
    //                 <>
    //                     <h2 className="m-b-16">Các đơn hàng của bạn</h2>
    //                     <OrderList />
    //                 </>
    //             )
    //         case 'addresses':
    //             return (
    //                 <>
    //                     <h2 className="m-b-16">Danh sách địa chỉ giao hàng của bạn</h2>
    //                     <AddressUserList />
    //                 </>
    //             )
    //         case 'notifications':
    //             return (
    //                 <>
    //                     <h2 className="m-b-16">Thông báo</h2>
    //                     <Result icon={<NotificationOutlined />} title="Hiện tại, không có thông báo nào" />,
    //                 </>
    //             )
    //         default:
    //             ;<>
    //                 <h2 className="m-b-16">Thông tin tài khoản</h2>
    //                 <UpdateAccountForm />
    //             </>
    //     }
    // }

    return (
        <section className="profile__container">
            <Container>
                {/* <button onClick={()=>dispatch(logoutStart())}>logout</button> */}
                <Row>
                    <Col lg="3" className="profile__user text-center ">
                        <img className="w-25 mb-3" src={defaultAvt} alt="" />
                        <h6 className=" mb-3">
                            Tài khoản của : <span>Lăng</span>
                        </h6>
                        <ul className="list-group d-flex flex-column ">
                            {menu.map((item, index) => (
                                <Link key={index} to={`${item.key}`}>
                                    <li className="list-group-item d-flex gap-2">
                                        {item.Icon}
                                        {item.title}
                                    </li>
                                </Link>
                            ))}
                            <li
                                className="list-group-item d-flex gap-2"
                                // onClick={
                                // () => dispatch(logoutStart())
                                // }
                            >
                                <i class="ri-logout-box-line"></i>
                                Đăng xuất
                            </li>
                        </ul>
                    </Col>
                    <ProfileUser/>
                    <Col lg="9" className="details__user">
                        <p className="common__info mb-5 ">Thông tin tài khoản</p>
                        <ul>
                            <li>
                                <span>Họ và tên:</span>Lăng
                            </li>
                            <li>
                                <span>Email:</span>abc@gmail.com
                            </li>
                            <li>
                                <span>Địa chỉ:</span>
                            </li>
                            <li>
                                <span>Ngày sinh:</span>01/01/1997
                            </li>
                            <li>
                                <span>Điện thoại:</span>
                            </li>
                        </ul>
                        <hr />
                        <Col lg="12" className="update__user__profile">
                            <div>
                                <button>Cập nhật thông tin tài khoản</button>
                            </div>
                        </Col>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AccountPage
