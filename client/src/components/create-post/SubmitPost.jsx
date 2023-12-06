// working code for submitting title and contents and displaying on home page

import { getDocs, collection, doc, deleteDoc, Firestore, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { createContext, useEffect, useState } from "react";
import SinglePost from "./SinglePost";
import { async } from "@firebase/util";

export const PostContext = createContext();

export default function SubmitPost() {

    const [postsList, setPostsList] = useState(null);

    const postsRef = collection(db, "posts");

    const getPosts = async () => {
        const data = await getDocs(postsRef)
        setPostsList(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    useEffect(() => {
        getPosts();
    }, [])


    const deletePost = async (id) => {
        const postDoc = doc(db, 'posts', id);
        await deleteDoc(postDoc)
    }


    // const sourceCollection = collection(db, 'posts');
    // const destinationCollection = collection(db, 'saved');

    // const sourceDocRef = doc(sourceCollection, doc.id)
    // const savedDocRef = doc(destinationCollection, id)


    // const getSavedPost = async () => {
    //     await getDocs(sourceDocRef).then((docSnapshot) => {
    //         if (docSnapshot.exists()) {
    //             const saveData = docSnapshot.data();
    //         }
    //     })
    // }

    // setDoc(savedDocRef, saveData).then(() => {
    //     console.log("successful");
    // })

    return (
        <div className="posts">
            {postsList?.map((post) => <SinglePost key={post.id} post={post} deletePost={deletePost} />)}
        </div>
    )
}