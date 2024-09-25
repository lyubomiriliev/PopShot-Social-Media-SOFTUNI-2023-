import "../../assets/styles/singlePost.scss";

import { Link } from "react-router-dom";
import { useState } from "react";
import { timeAgo } from "../../utils/timeAgo";
import usePostStore from "../../store/postStore";
import useAuthStore from "../../store/authStore";
import useUserProfileStore from "../../store/userProfileStore";

import useLikePost from "../../hooks/useLikePost";
import usePostComment from "../../hooks/usePostComment";

import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../../config/firebase";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

import Comments from "../comments/Comments";
import PostEdit from "./PostEdit";



export default function ProfilePost({ post, handlePostClick }) {

    const authUser = useAuthStore((state) => state.user);
    const userProfile = useUserProfileStore((state) => state.userProfile);
    const deletePost = usePostStore((state) => state.deletePost);
    const decrementPostsCount = useUserProfileStore((state) => state.deletePost)
    const { handlePostComment } = usePostComment()
    const { handleLikePost, isLiked, likes } = useLikePost(post)


    const handleDeletePost = async () => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            const imageRef = ref(storage, `posts/${post.id}`);
            await deleteObject(imageRef)
            const userRef = doc(db, "users", authUser.uid);
            await deleteDoc(doc(db, "posts", post.id))
            await updateDoc(userRef, {
                posts: arrayRemove(post.id)
            })

            deletePost(post.id)
            decrementPostsCount(post.id)
            alert("Post deleted successfully");

        } catch (error) {
            console.log(error)
        }
    }

    const [comment, setComment] = useState('');

    const handleSubmitComment = async () => {
        await handlePostComment(post.id, comment)
        setComment("")
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <>
            <div className="single-post">
                <div className="postContainer">
                    <div className="userPostInfo">
                        <div className="details">
                            <img src={userProfile.profilePicURL} alt="profilePic" className="postThumbnail" />
                            <Link to={`/${userProfile.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <span className="name">{userProfile.fullName}</span>
                            </Link>
                        </div>
                        {authUser?.uid === userProfile.uid && (
                            <div className="deleteBtn">
                                <button onClick={handleDeletePost}><CloseIcon /></button>
                            </div>
                        )}
                    </div>
                    <div className="postTitles">
                        <h2>{post.title}</h2>
                        <div className="subTitles">
                            <p>{post.content}</p>
                            <span className="date">{timeAgo(post.createdAt)}</span>
                        </div>
                    </div>
                    <div className="image">
                        <img src={post.imageURL} alt="" />
                    </div>
                    <div className="postData">
                        <div className="info">

                            <div className="actionBtn">
                                <button onClick={handleLikePost}>{!isLiked ? <FavoriteBorderOutlinedIcon /> : <FavoriteOutlinedIcon />}</button>
                                <p>{likes}</p>
                            </div>
                            <div className="actionBtn">
                                <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
                                <button onClick={handleSubmitComment} ><SendOutlinedIcon /></button>
                            </div>
                            {authUser?.uid === userProfile.uid && (
                                <div className="actionBtn">
                                    <button onClick={handleOpen} ><EditOutlinedIcon /></button>
                                    <PostEdit open={open} handleClose={handleClose} post={post} />
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                <div className="commentsDiv">
                    {post.comments.map(comment => (

                        <Comments key={comment.id} comment={comment} />
                    ))}
                </div>
            </div>

        </>
    )
}