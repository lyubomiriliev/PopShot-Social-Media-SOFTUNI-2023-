import "../../assets/styles/savedPostCard.scss";

import { db } from '../../config/firebase';
import { collection, getDocs } from "firebase/firestore"
import LeftBar from '../navbar-components/LeftBar';


import { useState, useEffect } from 'react';
import { UserAuth } from "../../contexts/AuthConext";
import SavedPost from "./SavedPost";

export default function SavedPostCard() {
    const [posts, setPosts] = useState([]);
    const { user } = UserAuth();


    useEffect(() => {
        const fetchSavedPosts = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'saved-posts'));
                const fetchPosts = [];
                for (let index = 0; index < snapshot.docs.length; index++) {
                    const element = snapshot.docs[index];
                    const result = await getPostById(element.data().postId, user.uid);
                    fetchPosts.push(result)
                }
                setPosts(fetchPosts);
            } catch (error) {
                console.error('Error fetching saved posts: ', error);
            }
        };

        fetchSavedPosts();
    }, []);

    const postsRef = collection(db, "posts");

    const getPostById = async (postId, useruid) => {
        const data = await getDocs(postsRef)
        return (data.docs.filter((p) => p.id === postId).map((doc) => ({ ...doc.data(), id: doc.id })));

    }


    return (
        <div className='page-container'>
            <LeftBar />
            <div className="saved-posts-container">
                <div className="content">
                    <h1>Saved Posts</h1>
                </div>
                {posts.map((post) =>
                    <SavedPost post={post} />
                )}
            </div>
        </div>
    );
}