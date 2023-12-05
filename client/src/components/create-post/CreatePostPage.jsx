import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { addDoc, collection, orderBy, query } from 'firebase/firestore'
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import "../../assets/styles/CreatePostPage.scss";

// working code title and contents store in db and displaying in home page


export default function CreatePostPage() {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    const schema = yup.object().shape({
        title: yup.string().required("You must add a title."),
        content: yup.string().required("You must add contents."),
    });

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
    })

    const postsRef = collection(db, "posts")
    const storage = getStorage();

    const onCreatePost = async (data) => {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadImage(imageRef);
        const imageUrl = await getImageUrl(imageRef);

        await addDoc(postsRef, {
            ...data,
            imageUrl,
            username: user?.displayName,
            userId: user?.uid,
        });

        navigate('/');
    };

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

    return (
        <div>
            <form onSubmit={handleSubmit(onCreatePost)}>
                <div className="title">
                    <h3>Create a new post</h3>
                    <input type="text" placeholder='Title...' {...register("title")} />
                    <p style={{ color: "red" }}> {errors.title?.message} </p>
                </div>
                <div className="contents">
                    <textarea placeholder='Description...' {...register("content")} />
                    <p style={{ color: "red" }}> {errors.content?.message} </p>
                    <input type="file" onChange={handleImageChange} />
                </div>
                <div className="submit">
                    <button>Submit</button>
                </div>
            </form>
        </div>
    );
}