import "../../assets/styles/comments.scss";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form';


import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import CloseIcon from '@mui/icons-material/Close';

import { db } from "../../config/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";

import { useEffect, useState } from "react";
import { UserAuth } from "../../contexts/AuthConext";


export default function Comments(post_id) {


    const { user } = UserAuth();


    const [showComments, setShowComments] = useState([]);
    const [newContent, setNewContent] = useState('');

    const commentsRef = collection(db, "comments")

    const addComment = async () => {
        if (user && user.uid) {
            await addDoc(commentsRef, {
                userId: user.uid,
                commentId: post_id,
                author: user.displayName,
                authorAvatar: user.photoURL,
                content: newContent
            }).catch(err => {
                console.log(err);
            });
        }
        getComments();
        setNewContent("");
    }

    const getComments = async () => {
        const querySnapshot = await getDocs(query(commentsRef, where("commentId", "==", post_id)));
        const commentsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setShowComments(commentsData);

    }

    useEffect(() => {

        getComments();

    }, []);

    const deleteComment = async (id) => {
        const commentDoc = doc(db, 'comments', id);
        await deleteDoc(commentDoc);

        if (user) {
            getComments();
        } else
            console.log(err);
    }

    const validation = yup.object().shape({
        content: yup.string().required("You can't leave this blank."),
    });

    const { register, formState: { errors }, } = useForm({
        resolver: yupResolver(validation),
    })


    return (
        <div className="commentSection">
            <div className="commentContainer">
                <div className="writeComment">
                    <img src={user?.photoURL} alt="userPhoto" />
                    <input type="text" placeholder='Write a comment...' value={newContent} {...register("content")} onChange={(e) => { setNewContent(e.target.value) }} />
                    <p>{errors.content?.message}</p>
                    <button onClick={addComment} ><SendOutlinedIcon /></button>
                </div>
            </div>
            <div className="newCommentContainer">

                <ul className="commentMap">
                    {showComments.map((comment) => (
                        <li key={comment.id}>
                            <div className="postInner">
                                <img src={comment.authorAvatar} alt="" />
                                <h3>{comment.author}</h3>
                                <p>{comment.content}</p>
                                <button onClick={() => deleteComment(comment.id)}><CloseIcon /></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </div>

    );

}