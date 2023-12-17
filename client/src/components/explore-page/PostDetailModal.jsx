import '../../assets/styles/postDetailModal.scss';

import { Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import useGetUserProfileById from '../../hooks/useGetUserProfileById';
import { timeAgo } from '../../utils/timeAgo';
import { Link } from 'react-router-dom';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import usePostComment from '../../hooks/usePostComment';
import { useState } from 'react';
import useLikePost from '../../hooks/useLikePost';



export default function PostDetailModal({ post, handleClose }) {

    const { userProfile } = useGetUserProfileById(post.createdBy)


    const { handleLikePost, isLiked, likes } = useLikePost(post)
    const { handlePostComment } = usePostComment()


    const [comment, setComment] = useState('');

    const handleSubmitComment = async () => {
        await handlePostComment(post.id, comment)
        setComment("")
    }


    return (


        <div className="post-detail-modal">
            <button className='closeBtnModalDetail' onClick={handleClose}><CloseIcon /></button>
            <Box>
                <div className='detailsHeaderModal'>
                    <Link to={`/${userProfile?.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <img src={userProfile?.profilePicURL} alt="" />
                    </Link>
                    <Link to={`/${userProfile?.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <h4 className='author-modal'>{userProfile?.fullName}</h4>
                    </Link>
                </div>
                <div className="detailContentModal">
                    <h3 className='title-modal'>{post.title}</h3>
                    <p className='content'>{post.content}</p>
                </div>
                <img src={post.imageURL} alt="" />
                <div className="info">
                    <div className="actionBtn">
                        <button onClick={handleLikePost}>{!isLiked ? <FavoriteBorderOutlinedIcon /> : <FavoriteOutlinedIcon />}</button>
                        <p>{likes} likes</p>

                    </div>
                    <div className="actionBtn">
                        <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
                        <button onClick={handleSubmitComment} ><SendOutlinedIcon /></button>
                    </div>
                </div>
                <p className='timestamp'>{timeAgo(post.createdAt)}</p>
            </Box>
        </div>
    );
}