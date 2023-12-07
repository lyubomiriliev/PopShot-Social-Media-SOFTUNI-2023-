import { useAuthState } from "react-firebase-hooks/auth";
import "../../assets/styles/comments.scss";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form';


import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

import { auth, db } from "../../config/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";

import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../../contexts/postsContext";


export default function Comments() {


    const [user] = useAuthState(auth);

    const value = useContext(PostsContext);

    const [showComments, setShowComments] = useState([]);
    const [newContent, setNewContent] = useState('');

    const commentsRef = collection(db, "comments")

    const addComment = async () => {
        await addDoc(commentsRef, { userId: user.uid, commentId: value.id, author: user.displayName, content: newContent }).catch(err => { console.log(err); });
    }

    const getComments = async () => {
        const querySnapshot = await getDocs(query(commentsRef, where("commentId", "==", value.id)));
        const commentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setShowComments(commentsData);
    }

    useEffect(() => {

        getComments();

    }, []);

    const deleteComment = async (id) => {
        const commentDoc = doc(db, 'comments', id);
        await deleteDoc(commentDoc);
    }

    const validation = yup.object().shape({
        content: yup.string().required("You can't leave this blank."),
    });

    const { register, formState: { errors }, } = useForm({
        resolver: yupResolver(validation),
    })


    return (
        <div className="commentContainer">
            <div className="writeComment">
                <img src={user?.photoURL} alt="userPhoto" />
                <input type="text" placeholder='Write a comment...' value={newContent} {...register("content")} onChange={(e) => { setNewContent(e.target.value) }} />
                <p>{errors.content?.message}</p>
                <button onClick={addComment} ><SendOutlinedIcon /></button>
                <h3>Comments:</h3>
                <ul>
                    {showComments.map((comment) => {
                        <li key={comment.id}>
                            <h3>{comment.author}</h3>
                            <p>{comment.content}</p>
                            <button>Delete</button>
                        </li>
                    })}
                </ul>

            </div>
        </div>
    );

}