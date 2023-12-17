import "../../assets/styles/explorePage.scss";

import LeftBar from "../navbar-components/LeftBar";
import NavBar from "../navbar-components/NavBar";
import { useState } from "react";
import { Box, Modal } from "@mui/material";
import PostDetailModal from "./PostDetailModal";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import useUserProfileStore from "../../store/userProfileStore";

export default function ExplorePage() {


    const { posts } = useGetFeedPosts()

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
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const { userProfile } = useUserProfileStore();

    console.log(userProfile)


    return (
        <div className="explore-main">
            <div className="explore-scroller">
                <NavBar />
                <div style={{ display: "flex" }}>
                    <LeftBar />
                    <div style={{ flex: 6 }}>
                        <div className="exploreGrid">
                            {posts.length === 0 && (
                                <h1>You must follow other users to see their posts.</h1>
                            )}
                            {posts.map((post) => (
                                <div key={post.id} className="post-item" onClick={() => handlePostClick(post)}>
                                    <img src={post.imageURL} alt="" />
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