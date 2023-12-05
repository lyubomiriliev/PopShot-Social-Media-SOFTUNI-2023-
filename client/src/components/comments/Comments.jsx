import { useAuthState } from "react-firebase-hooks/auth";
import "../../assets/styles/comments.scss";

import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

import { auth, db } from "../../config/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";

import { useContext, useEffect, useState } from "react";
import { PostContext } from "../create-post/SubmitPost";


export default function Comments() {

    const [user] = useAuthState(auth)

    const [post] = useContext(PostContext);

    const [showComments, setShowComments] = useState([]);
    const [newContent, setNewContent] = useState('');

    const commentsRef = collection(db, "comments")

    const addComment = async () => {
        await addDoc(commentsRef, { userId: user.uid, postId: post.id, author: user.displayName, content: newContent });
    }

    const deleteComment = async (id) => {
        const commentDel = doc(db, "comments", id);
        await deleteDoc(commentDel);
    }


    useEffect(() => {
        const getComments = async () => {
            const data = await getDocs(commentsRef)
            setShowComments(data.docs.map((doc) => ({ userId: doc.data().userId, postId: post.id })))
        }
        getComments();

    }, []);


    return (
        <div className="comments">
            <div className="write">
                <img src={user?.photoURL} alt="userPhoto" />
                <input type="text" placeholder='Write a comment...' onChange={(e) => { setNewContent(e.target.value) }} />
                <button onClick={addComment} ><SendOutlinedIcon /></button>
            </div>
            <div className="comment">
                <img src={user?.photoURL} alt="userPhoto" />
                <div className="info">
                    <span>Username</span>
                    <p>description</p>
                </div>
                <div className="date">
                    <span>1 hour ago</span>
                    <button onClick={() => { deleteComment(post.id) }} >Delete</button>
                </div>
            </div>
        </div>
    );
}