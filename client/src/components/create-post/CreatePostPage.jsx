// working code title and contents store in db and displaying in home page

import "../../assets/styles/createPostPage.scss";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export default function CreatePostPage() {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("You must add a title."),
        content: yup.string().required("You must add contents."),
    });

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
    })

    const postsRef = collection(db, "posts")

    const onCreatPost = async (data) => {
        await addDoc(postsRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid, //uid works for Google Login  
        });

        navigate('/');
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onCreatPost)}>
                <div className="title">
                    <h3>Create a new post</h3>
                    <input type="text" placeholder='Title...' {...register("title")} />
                    <p style={{ color: "red" }}> {errors.title?.message} </p>
                </div>
                <div className="contents">
                    <textarea placeholder='Description...' {...register("content")} />
                    <p style={{ color: "red" }}> {errors.content?.message} </p>
                    <input type="file" />
                </div>
                <div className="submit">
                    <button>Submit</button>
                </div>
            </form>
        </div>
    );
}