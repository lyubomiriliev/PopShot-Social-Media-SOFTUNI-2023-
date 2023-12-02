import { auth, db, storage } from '../../config/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

import { v4 } from "uuid"
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/styles/createForm.scss";


export default function CreateForm() {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [postData, setPostData] = useState({
        title: "",
        content: "",
        imageUrl: "",
    });

    const { title, content, imageUrl } = postData

    const [submittedPosts, setSubmittedPosts] = useState([]);

    const imageSubmitHandler = (e) => {
        const imgRef = ref(storage, `uploads/${v4()}`);
        const file = e.target.files && e.target.files[0];

        if (file) {
            uploadBytes(imgRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setPostData({
                        ...postData,
                        imageUrl: url,
                    });
                })
            })
        }
    }

    const titileInputHandler = (e) => {
        setPostData({ ...postData, title: e.target.value });
    }
    const contentInputHandler = (e) => {
        setPostData({ ...postData, content: e.target.value });
    }

    const imageInputHandler = (e) => {
        const data = e.target.files && e.target.files[0];
        if (data) {
            setPostData({ ...postData, imageUrl: data });
        }
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        if (title && content && imageUrl) {
            await addDoc(collection(db, "posts"), {
                title,
                content,
                imageUrl,
                username: user?.displayName,
                userId: user?.uid,
                timestamp: serverTimestamp(),
            })
            setPostData({
                title: "",
                content: "",
                imageUrl: "",
            })
            navigate(`/profile/${user?.uid}`);
        }

    }

    return (
        <div className="wrapper">
            <form onSubmit={submitHandler} >
                <div className="title">
                    <AddAPhotoOutlinedIcon />
                    <h3>Create post</h3>
                </div>
                <div className="inputBoxes">
                    <input onChange={titileInputHandler} type="text" placeholder='Title...' value={title} required="required" />
                    <textarea onChange={contentInputHandler} placeholder='Description...' value={content} required="required" />
                </div>
                <div className="contents">
                    <input onChange={imageInputHandler} type="file" name='imageUrl' required="required" />
                </div>
                <div className="submit">
                    <button onClick={imageSubmitHandler}>Submit</button>
                </div>

                {submittedPosts.map((post, index) => (
                    <div key={index} className='post-card'>
                        <img src={post.imageUrl} alt={post.title} />
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </div>
                ))}

            </form >
        </div>
    );
}