// working code for submitting title and contents and displaying on home page

import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import SinglePost from "./SinglePost";
import { PostsContext } from "../../contexts/postsContext";


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

    // преместване на пост в saved
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
            {postsList?.map((post) => <PostsContext.Provider key={post.id} value={post}><SinglePost key={post.id} post={post} deletePost={deletePost} /></PostsContext.Provider>)}
        </div>
    )
}