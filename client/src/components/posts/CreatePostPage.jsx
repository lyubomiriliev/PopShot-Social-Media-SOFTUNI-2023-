import "../../assets/styles/CreatePostPage.scss";
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"

import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from "../../config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import NavBar from '../navbar-components/NavBar';
import LeftBar from '../navbar-components/LeftBar';
import { UserAuth } from '../../contexts/AuthConext';
import moment from "moment";


export default function CreatePostPage() {

    const navigate = useNavigate();
    const { user } = UserAuth();
    const [image, setImage] = useState(null);

    const postsRef = collection(db, "posts")
    const storage = getStorage();


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const uploadImage = async (ref) => {
        await uploadBytes(ref, image);
    };

    const getImageUrl = async (ref) => {
        return await getDownloadURL(ref);
    };


    const onCreatePost = async (data) => {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadImage(imageRef);
        const imageUrl = await getImageUrl(imageRef);

        await addDoc(postsRef, {
            ...data,
            imageUrl,
            username: user?.displayName,
            authorAvatar: user.photoURL,
            userId: auth?.currentUser?.uid,
            timestamp: moment().format(),
        });

        navigate('/');
    };

    const schema = yup.object().shape({
        title: yup.string().required("You must add a title."),
        content: yup.string().required("You must add contents."),
    });

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
    })


    return (
        <div className='create-main'>
            <NavBar />
            <div style={{ display: "flex" }}>
                <LeftBar />
                <div className="formWrapper" style={{ flex: 6 }}>
                    <img src="../../src/assets/images/popshot-logo.png" alt="logo" />

                    <form onSubmit={handleSubmit(onCreatePost)}>
                        <div className="title">
                            <h3>Create a new post</h3>
                            <input type="text" placeholder='Title...' {...register("title")} />
                            <p style={{ color: "red", fontSize: "13px", marginTop: "0px" }}> {errors.title?.message} </p>
                        </div>
                        <div className="contents">
                            <textarea placeholder='Description...' {...register("content")} />
                            <p style={{ color: "red", fontSize: "13px", marginTop: "0px" }}> {errors.content?.message} </p>
                            <input type="file" className='customInput' onChange={handleImageChange} />
                        </div>
                        <div className="submit">
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}