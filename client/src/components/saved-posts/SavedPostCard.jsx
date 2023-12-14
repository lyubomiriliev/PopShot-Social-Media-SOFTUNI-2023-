import { useEffect, useState } from "react";
import "../../assets/styles/savedPostCard.scss";
import { UserAuth } from "../../contexts/AuthConext";
import LeftBar from '../navbar-components/LeftBar';
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../config/firebase";
import SavedPost from "./SavedPost";

export default function SavedPostCard() {

    const user = UserAuth();
    const [savedPosts, setSavedPosts] = useState([]);

    useEffect(() => {

        const fetchSavedPosts = async () => {
            try {
                if (user) {
                    const savedPostsRef = collection(db, 'saved-posts', user.user.uid);
                    const q = query(savedPostsRef);
                    const querySnapshot = await getDocs(q);
                    const fetchedPosts = querySnapshot.docs.map((doc) => doc.data());

                    setSavedPosts(fetchedPosts);
                }
            } catch (error) {
                console.error("Error", error)
            }
        };

        fetchSavedPosts();

    }, [user]);



    return (
        <div className='page-container'>
            <LeftBar />
            <div className="saved-posts-container">
                {savedPosts.map((savedPost) => (
                    <SavedPost key={savedPost.postId} post={savedPost} />
                ))}
            </div>
        </div>
    );
}