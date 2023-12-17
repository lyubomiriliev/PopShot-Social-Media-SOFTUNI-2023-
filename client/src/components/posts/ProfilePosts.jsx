import { Box, Modal } from "@mui/material";
import useGetUserPosts from "../../hooks/useGetUserPosts";
import ProfilePost from "./ProfilePost";
import PostDetailModal from "../explore-page/PostDetailModal";
import { useState } from "react";

export default function ProfilePosts() {

    const [selectedPost, setSelectedPost] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const { posts } = useGetUserPosts()

    const noPostsFound = posts.length === 0;

    if (noPostsFound) return <NoPostsFound />


    const handlePostClick = (post) => {
        setSelectedPost(post);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);


    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 5,
    };

    return (
        <>
            <div className="posts">
                {posts.map((post) => (
                    <div onClick={() => handlePostClick(post)}>
                        <ProfilePost post={post} key={post.id} />
                    </div>
                ))}

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
        </>
    );
}

const NoPostsFound = () => {
    return (
        <div className="wrapper">
            <h1>No Posts Found...</h1>
        </div>
    )
}