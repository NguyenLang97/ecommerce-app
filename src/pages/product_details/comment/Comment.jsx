import { useState, useEffect } from 'react'
import { doc, setDoc, addDoc, collection, serverTimestamp, onSnapshot, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase/firebase_config'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './comment.scss'

const Comment = () => {
    const { id } = useParams()
    console.log({ id })
    const [reviewMsg, setReviewMsg] = useState('')
    const [data, setData] = useState()
    const currentUser = useSelector((state) => state.AuthReducer.currentUser)
    const username = useSelector((state) => state.AuthReducer.infoUser?.username)
    const img = useSelector((state) => state.AuthReducer.infoUser?.img)
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
        const commentUser = [{ idUser: currentUser, nameUser: username, imgUser: img, commentTitle: reviewMsg }]
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
            const commentUser = [...data.commentUser, { idUser: currentUser, nameUser: username, imgUser: img, commentTitle: reviewMsg }]
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
    return (
        <div className="comment">
            <div className=" d-flex align-items-center gap-5 py-3">
                <h6 className="rev">Review</h6>
            </div>
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
                    <button type="submit" className="btn btn-primary btn_comment">
                        <i class="ri-send-plane-fill"></i>
                        Gửi
                    </button>
                </div>
                <div className="comment__review w-100 p-4">
                    {data?.commentUser !== undefined ? (
                        data.commentUser.map((item) => (
                            <div className="d-flex flex-column">
                                <div className="comment__user-wrap d-flex">
                                    <div className="comment__user review d-flex">
                                        <img src={item.imgUser} className="comment__user-img rounded-circle" />
                                        <p className="comment__user-name">{item.nameUser}</p>
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
