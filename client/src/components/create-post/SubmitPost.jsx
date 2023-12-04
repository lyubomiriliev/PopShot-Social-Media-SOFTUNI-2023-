// working code for submitting title and contents and displaying on home page

import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import SinglePost from "./SinglePost";

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



    return (
        <div className="posts">
            {postsList?.map((post) => <SinglePost key={post.id} post={post} />)}
        </div>
    )
}