import "../../assets/styles/singlePost.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';


import { addDoc, getDocs, collection, query, where, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import Comments from "../comments/Comments";
import { UserAuth } from "../../contexts/AuthConext";
import { Box, Modal } from "@mui/material";
import PostEditForm from "./PostEditForm";
import { formatTime } from "../../utils/formatTime";


export default function SinglePost({ getPosts, post }) {

    const { user } = UserAuth();

    const [likes, setLikes] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const likesRef = collection(db, "likes")
    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id });
            if (user) {
                setLikes((prev) => prev ? [...prev, { userId: user.uid, likeId: newDoc.id }] : [{ userId: user.uid, likeId: newDoc.id }])
            }
        } catch (err) {
            console.log(err);
        }
    };

    const refreshLikes = async () => {
        const data = await getDocs(likesDoc)
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
    }

    useEffect(() => {
        refreshLikes();
    }, [])

    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(likesRef,
                where("postId", "==", post.id),
                where("userId", "==", user.uid));

            const likeToDeleteData = await getDocs(likeToDeleteQuery);

            const likeId = likeToDeleteData.docs[0].id

            const likeToDelete = doc(db, "likes", likeId);

            await deleteDoc(likeToDelete);

            if (user) {
                refreshLikes();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deletePost = async (id) => {
        const postDoc = doc(db, 'posts', id);
        await deleteDoc(postDoc)

        if (user) {
            getPosts();
        } else
            console.log(err);

    }

    const showCommentHandler = () => {
        setShowComments(!showComments);
    }


    const hasUserLiked = likes?.find((like) => like.userId === user.uid);

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

    const handleSave = async () => {
        try {
            if (user) {
                const savedPostsRef = collection(db, 'saved-posts');
                await addDoc(savedPostsRef, {
                    postId: post.id,
                    userId: user.uid,
                    username: post.username,
                    title: post.title,
                    content: post.content,
                    imageUrl: post.imageUrl,
                    timestamp: post.timestamp,
                    authorAvatar: post.authorAvatar,
                });
            }
        } catch (error) {
            console.error('Error saving post', error)
        }
    }


    return (
        <>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <PostEditForm handleClose={handleClose} post={post} />
                    </Box>
                </Modal>
            </div>
            <div className="single-post">
                <div className="postContainer">
                    <div className="userPostInfo">
                        <img src={post.authorAvatar} alt="profilePic" className="postThumbnail" />
                        <div className="details">
                            <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <span className="name">{post.username}</span>
                            </Link>
                        </div>

                        <div className="deleteBtn">
                            <button onClick={() => { deletePost(post.id) }} className="delBtn"><CloseIcon /></button>
                        </div>
                    </div>
                    <div className="datePosted">
                        <span className="date">{formatTime(post.timestamp)}</span>
                    </div>
                    <div className="title">
                        <h2>{post.title}</h2>
                    </div>
                    <div className="content">
                        <p>{post.content}</p>
                    </div>
                    <div className="image">
                        <img src={post.imageUrl} alt="" />
                    </div>

                    <div className="info">
                        <div className="actionBtn">
                            <button onClick={hasUserLiked ? removeLike : addLike} > {hasUserLiked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}Likes: {likes?.length}</button>
                        </div>
                        <div className="actionBtn">
                            <button onClick={handleOpen} ><EditOutlinedIcon />Edit</button>
                        </div>
                        <div className="actionBtn">
                            <button onClick={handleSave} ><BookmarkBorderOutlinedIcon />Save</button>
                        </div>
                        <div className="actionBtn">
                            <button onClick={showCommentHandler}><AddCommentOutlinedIcon />Comment</button>
                        </div>
                    </div>

                </div>
                <div className="newComments">
                    {showComments && <Comments post_id={post.id} />}
                </div>


            </div>
        </>
    );

}