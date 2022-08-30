import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import './common-section.scss'

const CommonSection = (props) => {
    return (
        <section className="common__section">
            <Container>
                <Link to="/">
                    <i className="ri-home-4-line icon-home"></i>
                    {/* <HomeOutlined className="p-12 icon-home font-size-16px bg-white" /> */}
                </Link>
                <span className="r-arrow">{`>`}</span>
                <span className="pro-name">{props.title}</span>
            </Container>
        </section>
    )
}

export default CommonSection
