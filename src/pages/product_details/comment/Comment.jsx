import { useState, useEffect } from 'react'
import { doc, setDoc, addDoc, collection, serverTimestamp, onSnapshot, getDoc } from 'firebase/firestore'
import { Button, Col, Input, message, Pagination, Progress, Rate, Row } from 'antd'
import { db } from '../../../firebase/firebase_config'
import { useDispatch, useSelector } from 'react-redux'
import 'antd/dist/antd.css'
import { useParams } from 'react-router-dom'
import defaultAvt from '../../../assets/images/default-avt.png'

import './comment.scss'

const Comment = () => {
    const { id } = useParams()
    console.log({ id })
    const [reviewMsg, setReviewMsg] = useState('')
    const [data, setData] = useState()
    const currentUser = useSelector((state) => state.AuthReducer.currentUser)
    const username = useSelector((state) => state.AuthReducer.infoUser?.username)
    const img = useSelector((state) => state.AuthReducer.infoUser?.img) || defaultAvt
    console.log('img', img)
    const docRef = doc(db, 'comment', id)
    useEffect(() => {
        const docSnap = async () => {
            await getDoc(docRef).then((docSnap) => {
                if (docSnap.exists()) {
                    setData({ ...docSnap.data() })
                } else {
                    console.log('No such document!')
                }
            })
        }
        docSnap()
    }, [])

    const commentHandler = async (e) => {
        e.preventDefault()
        const commentUser = [{ idUser: currentUser, nameUser: username, imgUser: img, commentTitle: reviewMsg, date: new Date(), userRacting: ractingValue }]
        setReviewMsg('')

        try {
            await setDoc(doc(db, 'comment', id), {
                commentUser: [...commentUser],
                timeStamp: serverTimestamp(),
            })
        } catch (err) {
            console.log(err)
        }
        if (data) {
            console.log({ ractingValue })
            const commentUser = [...data.commentUser, { idUser: currentUser, nameUser: username, imgUser: img, commentTitle: reviewMsg, date: new Date(), userRacting: ractingValue }]
            console.log('commentUser', commentUser)
            try {
                await setDoc(doc(db, 'comment', id), {
                    commentUser: [...commentUser],
                    timeStamp: serverTimestamp(),
                })
            } catch (err) {
                console.log(err)
            }
        }
        const docSnap = async () => {
            await getDoc(docRef).then((docSnap) => {
                if (docSnap.exists()) {
                    setData({ ...docSnap.data() })
                } else {
                    console.log('No such document!')
                }
            })
        }
        docSnap()
    }
    function setDate(unixTime) {
        const date = new Date(unixTime * 1000)
        // console.log(date.toLocaleDateString('en-US'))
        return date.toLocaleDateString('en-US')
    }
    console.log({ data })
    const [ractingValue, setRactingValue] = useState(0)
    // console.log({ ractingValue })

    // //Tong so tat ca binh luan
    const rateTotals = data?.commentUser.length
    console.log({ rateTotals })

    // // tim user danh gia sao >0
    const positiveStar = data?.commentUser.filter((star) => star.userRacting > 0)
    const numberStart = (number) => data?.commentUser.filter((star) => star.userRacting === number).length
    console.log('1', numberStart(1))
    // const towStar = data?.commentUser.filter((star) => (star.userRacting = 2))
    const starAvg = positiveStar?.reduce((totalStar, star) => totalStar + star.userRacting, 0) / positiveStar?.length
    console.log({ starAvg })
    const rates = [1, 2, 3, 4, 5]
    return (
        <div className="comment">
            <div className=" d-flex align-items-center gap-5 py-3">
                <h6 className="rev">Review</h6>
            </div>
            {/* đánh giá tổng quan */}
            <Col span={24} className="p-16">
                <span className="font-size-28px">Đánh giá</span>
                <div className="overview d-flex p-tb-16">
                    {/* tổng kết */}
                    <div className="d-flex flex-direction-column align-i-center overview--total">
                        <h2 className="font-size-32px">{starAvg.toFixed(1)}</h2>
                        {starAvg && <Rate disabled defaultValue={Math.floor(starAvg)} />}
                        <p className="t-color-gray font-weight-500">{rateTotals} nhận xét</p>
                    </div>
                    {/* chi tiết */}
                    <div className="overview--detail d-flex flex-grow-1 flex-direction-column p-lr-16">
                        {rates.map((item, index) => (
                            <div key={index} className="d-flex justify-content-between">
                                <Rate disabled defaultValue={item} style={{ fontSize: 14, flexBasis: 100 }} />
                                <Progress percent={(numberStart.length / positiveStar) * 100} type="line" showInfo={false} style={{ width: 172 }} />
                                <span>{numberStart(item)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Col>

            <form className="comment__form-group d-flex flex-wrap flex-row" onSubmit={commentHandler}>
                <div className="comment__form-container w-100 p-4 d-flex flex-row">
                    <div className="comment__form">
                        <textarea
                            rows={5}
                            type="text"
                            value={reviewMsg}
                            placeholder="Xin mời để lại câu hỏi, TTB Store sẽ trả lời lại trong 1h, các câu hỏi sau 22h - 8h sẽ được trả lời vào sáng hôm sau"
                            onChange={(e) => setReviewMsg(e.target.value)}
                            required
                        />
                    </div>
                    <Rate
                        onChange={(value) => {
                            setRactingValue(value)
                        }}
                        value={ractingValue}
                        className="d-flex m-1"
                    />
                    <button type="submit" className="btn btn-primary btn_comment">
                        <i class="ri-send-plane-fill"></i>
                        Gửi
                    </button>
                </div>
                <div className="comment__review w-100 p-4">
                    {data?.commentUser !== undefined ? (
                        data?.commentUser.map((item, index) => (
                            <div key={index} className="d-flex flex-column">
                                <div className="comment__user-wrap d-flex">
                                    <div className="comment__user review d-flex">
                                        <img src={item.imgUser} className="comment__user-img rounded-circle" />
                                        <p className="comment__user-name">{item.nameUser}</p>
                                        <Rate value={item.userRacting} disabled className="d-flex m-1" />
                                        <p className="comment__feedback-text">{setDate(item.date.seconds)}</p>
                                    </div>
                                </div>
                                <p className="comment__feedback-text">{item.commentTitle}</p>
                            </div>
                        ))
                    ) : (
                        <>Chưa có câu hỏi, nhận xết nào</>
                    )}
                </div>
            </form>
        </div>
    )
}

export default Comment
