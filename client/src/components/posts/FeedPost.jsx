import "../../assets/styles/feedPost.scss";
import { Link } from "react-router-dom";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import useFollowUser from "../../hooks/useFollowUser";
import { timeAgo } from "../../utils/timeAgo";
import useLikePost from "../../hooks/useLikePost";

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

import Comments from "../comments/Comments";
import usePostComment from "../../hooks/usePostComment";
import { useState } from "react";


export default function FeedPost({ post }) {

    const { userProfile } = useGetUserProfileById(post.createdBy)
    const { handleFollowUser, isFollowing } = useFollowUser(post.createdBy)
    const { handleLikePost, isLiked, likes } = useLikePost(post)
    const { handlePostComment } = usePostComment()


    const [comment, setComment] = useState('');

    const handleSubmitComment = async () => {
        await handlePostComment(post.id, comment)
        setComment("")
    }


    return (
        <div className="feedPost">
            <div className="postContainers">
                <div className="innerPostContainer">
                    <div className="userPostInfo">
                        <div className="leftPostInfo">
                            <Link to={`/${userProfile?.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <img src={userProfile?.profilePicURL} alt="profilePic" className="postThumbnail" />
                            </Link>
                            <Link to={`/${userProfile?.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <span className="name">{userProfile?.fullName}</span>
                            </Link>
                        </div>
                        <div>
                            <button className="followUnfollow" onClick={handleFollowUser} >{isFollowing ? "Unfollow" : "Follow"}</button>
                        </div>
                    </div>
                    <div className="subTitles">
                        <div className="title">
                            <h2>{post.title}</h2>
                        </div>
                        <div className="subContent">
                            <p>{post.content}</p>
                            <div className="datePosted">
                                <span className="date">{timeAgo(post.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="image">
                        <img src={post.imageURL} alt="" />
                    </div>
                    <div className="postInfo">
                        <div className="postCTA">
                            <button onClick={handleLikePost}>{!isLiked ? <FavoriteBorderOutlinedIcon /> : <FavoriteOutlinedIcon />}</button>
                            <p>{likes} likes</p>
                            <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
                            <button onClick={handleSubmitComment} ><SendOutlinedIcon /></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="commentsDiv">
                <div className="commentsTitle">
                    <h3>Comments</h3>
                </div>
                {post.comments.map((comment, index) => (
                    <Comments key={comment.id || index} comment={comment} />
                ))}
            </div>
        </div>
    );
}