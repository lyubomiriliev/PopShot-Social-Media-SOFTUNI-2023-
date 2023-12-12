import { collection, getDocs } from "firebase/firestore";
import "../../assets/styles/explorePage.scss";

import LeftBar from "../navbar-components/LeftBar";
import NavBar from "../navbar-components/NavBar";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import PostDetailModal from "./PostDetailModal";

export default function ExplorePage() {


    const fetchPosts = async () => {
        const postsRef = collection(db, 'posts');
        const snapshot = await getDocs(postsRef);
        const postsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return postsData;
    }

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPostsData = async () => {
            try {
                const postsData = await fetchPosts();
                setPosts(postsData);
            } catch (error) {
                console.log("Error fetching posts", error)
            }
        };

        fetchPostsData();

    }, [])

    const handlePostClick = (post) => {
        setSelectedPost(post);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);


    };

    const [selectedPost, setSelectedPost] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [open, setOpen] = useState(false);


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    return (
        <div className="explore-main">
            <div className="explore-scroller">
                <NavBar />
                <div style={{ display: "flex" }}>
                    <LeftBar />
                    <div style={{ flex: 6 }}>
                        <div className="exploreGrid">
                            {posts.map((post) => (
                                <div key={post.id} className="post-item" onClick={() => handlePostClick(post)}>
                                    <img src={post.imageUrl} alt="" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {selectedPost ? (
                        <PostDetailModal post={selectedPost} handleClose={handleCloseModal} />
                    ) : null}
                </Box>
            </Modal>
        </div>
    );
}