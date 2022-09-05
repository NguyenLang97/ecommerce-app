import React, { useMemo, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useSelector } from 'react-redux'

const ProfileUser = () => {
    const cartItems = useSelector((state) => state.CartReducer.cartItems)
    const totalQuantity = useSelector((state) => state.CartReducer.totalQuantity)
    console.log({ totalQuantity })
    const totalAmount = useSelector((state) => state.CartReducer.totalAmount)
    console.log({ cartItems })
    const address = useSelector((state) => state.AuthReducer.infoUser.address)
    const phone = useSelector((state) => state.AuthReducer.infoUser.phone)
    const fullname = useSelector((state) => state.AuthReducer.infoUser.fullname)
    const email = useSelector((state) => state.AuthReducer.infoUser.email)
    const yearofbirth = useSelector((state) => state.AuthReducer.infoUser.yearofbirth)

    const [enterFullName, setEnterFullName] = useState(fullname)
    const [enterYearofbirth, setEnterYearofbirth] = useState(yearofbirth)
    const [enterEmail, setEnterEmail] = useState(email)
    const [enterPhone, setEnterPhone] = useState(phone)
    const [enterAddress, setEnterAddress] = useState(address)

    const submitHandler = async (e) => {}
    return (
        <Col lg="9" className="details__user">
            <form className="checkout__form" onSubmit={submitHandler}>
                <div className="form__group">
                    <label htmlFor="">Tên người nhận</label>
                    <input type="text" placeholder="Enter your name" required value={enterFullName} onChange={(e) => setEnterFullName(e.target.value)} />
                </div>
                <div className="form__group">
                    <label htmlFor="">Ngày- Thánh- Năm sinh</label>
                    <input type="date" placeholder="Enter your name" required value={enterYearofbirth} onChange={(e) => setEnterYearofbirth(e.target.value)} />
                </div>

                <div className="form__group">
                    <label htmlFor="">Email</label>

                    <input type="email" placeholder="Enter your email" value={enterEmail} required onChange={(e) => setEnterEmail(e.target.value)} />
                </div>
                <div className="form__group">
                    <label htmlFor="">Số điện thoại</label>

                    <input type="number" placeholder="Phone number" value={enterPhone} required onChange={(e) => setEnterPhone(e.target.value)} />
                </div>
                <div className="form__group">
                    <label htmlFor="">Địa chỉ nhận hàng</label>

                    <input type="text" placeholder="Country" value={enterAddress} required onChange={(e) => setEnterAddress(e.target.value)} />
                </div>
            </form>

            <Col lg="12" className="update__user__profile">
                <div>
                    <button>Cập nhật thông tin tài khoản</button>
                </div>
            </Col>
        </Col>
    )
}

export default ProfileUser
