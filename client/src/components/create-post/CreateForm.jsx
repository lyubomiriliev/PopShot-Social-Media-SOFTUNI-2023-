import { auth, db, storage } from '../../config/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid"


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/styles/createForm.scss";
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';


export default function CreateForm() {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    // title and description states
    const [input, setInput] = useState("");
    const [content, setContent] = useState("");

    // upload image states
    const [image, setImage] = useState(null);
    const [imageList, setImageList] = useState([]);

    const titileInputHandler = (e) => {
        setInput(e.target.value);
    }
    const contentInputHandler = (e) => {
        setContent(e.target.value);
    }

    const imageInputHandler = (e) => {
        setImage(e.target.files[0])
    }

    const imageSubmitHandler = (e) => {
        const imgRef = ref(storage, `uploads/${v4()}`)
        uploadBytes(imgRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList((prev) => [...prev, url])
            })
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (input && content) {
            await addDoc(collection(db, "posts"), {
                title: input,
                content: content,
                username: user?.displayName,
                userId: user?.uid,
                timestamp: serverTimestamp(),
            })
            setInput("");
            setContent("");
            // navigate('/');
        }

    }

    const imageListRef = ref(storage, "uploads/")

    useEffect(() => {
        listAll(imageListRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                })
            })
        })
    }, [])



    return (
        <div className="wrapper">
            <form onSubmit={submitHandler} >
                <div className="title">
                    <AddAPhotoOutlinedIcon />
                    <h3>Create post</h3>
                </div>
                <div className="inputBoxes">
                    <input onChange={titileInputHandler} type="text" placeholder='Title...' value={input} required="required" />
                    <textarea onChange={contentInputHandler} placeholder='Description...' value={content} required="required" />
                </div>
                <div className="contents">
                    <input onChange={imageInputHandler} type="file" required="required" />
                </div>
                <div className="submit">
                    <button onClick={imageSubmitHandler}>Submit</button>
                </div>

                {imageList.map((url) => {
                    return <img src={url} />
                })}
            </form >
        </div>
    );
}