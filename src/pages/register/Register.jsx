import React, { useRef } from 'react'
import Helmet from '../../components/helmet/Helmet'
import CommonSection from '../../components/ui/common-section/CommonSection'
import { Container, Row, Col } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authStart } from '../../store/auth/auth.action'

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate
    const signupFullNameRef = useRef()
    const signupUserNameRef = useRef()
    const signupEmailRef = useRef()
    const signupPasswordRef = useRef()

    const submitHandler = (e) => {
        e.preventDefault()
        const fullname = signupFullNameRef.current.value
        const username = signupEmailRef.current.value
        const email = signupUserNameRef.current.value
        const password = signupPasswordRef.current.value
        const isRegister = true
        console.log({ email, password, isRegister, fullname, username })
        dispatch(authStart({ email, password, isRegister, fullname, username }))
        navigate('/login')
    }

    return (
        <Helmet title="Signup">
            <CommonSection title="Signup" />
            <section>
                <Container>
                    <Row>
                        <Col lg="6" md="6" sm="12" className="m-auto text-center">
                            <form className="form mb-5" onSubmit={submitHandler}>
                                <div className="form__group">
                                    <input type="text" placeholder="Full name" required ref={signupFullNameRef} />
                                </div>
                                <div className="form__group">
                                    <input type="text" placeholder="Username" required ref={signupUserNameRef} />
                                </div>
                                <div className="form__group">
                                    <input type="email" placeholder="Email" required ref={signupEmailRef} />
                                </div>
                                <div className="form__group">
                                    <input type="password" placeholder="Password" required ref={signupPasswordRef} />
                                </div>
                                <button type="submit" className="addToCart__btn">
                                    Sign Up
                                </button>
                            </form>
                            <Link to="/login">Already have an account? Login</Link>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default Register
