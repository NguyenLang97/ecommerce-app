import React, { useRef, useEffect } from 'react'
import Helmet from '../../components/helmet/Helmet'
import CommonSection from '../../components/ui/common-section/CommonSection'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authStart } from '../../store/auth/auth.action'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginEmailRef = useRef()
    const loginPasswordRef = useRef()

    const submitHandler = (e) => {
        e.preventDefault()
        const email = loginEmailRef.current.value
        const password = loginPasswordRef.current.value
        const isRegister = false

        dispatch(authStart({ email, password, isRegister }))
        navigate('/home')
    }

    return (
        <Helmet title="Login">
            <CommonSection title="Login" />
            <section>
                <Container>
                    <Row>
                        <Col lg="6" md="6" sm="12" className="m-auto text-center">
                            <form className="form mb-5" onSubmit={submitHandler}>
                                <div className="form__group">
                                    <input type="email" placeholder="Email" value="huonglang@gmail.com" required ref={loginEmailRef} />
                                </div>
                                <div className="form__group">
                                    <input type="password" placeholder="Password" value="123456" required ref={loginPasswordRef} />
                                </div>
                                <button type="submit" className="addToCart__btn">
                                    Login
                                </button>
                            </form>
                            <Link to="/register">Don't have an account? Create an account</Link>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default Login
