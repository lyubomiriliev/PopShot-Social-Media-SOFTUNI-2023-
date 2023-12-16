import '../../assets/styles/postDetailModal.scss';

import { Box, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


export default function PostDetailModal({ post, handleClose }) {
    return (

        <div className="post-detail-modal">
            <button onClick={handleClose}><CloseIcon /></button>
            {post ? (
                <Box>
                    <Typography variant="body1" component="p">
                        <h4 className='author-modal'>{post.username}</h4>
                    </Typography>
                    <Typography variant="h6" component="h2">
                        <h3 className='title-modal'>{post.title}</h3>
                    </Typography>
                    <Typography variant="body1" component="p">
                        <p className='content'>{post.content}</p>
                    </Typography>
                    <Typography variant="body1" component="p">
                        <img src={post.imageUrl} alt="" />
                    </Typography>
                    <Typography variant="body1" component="p">
                        <p className='timestamp'>{formatTime(post.timestamp)}</p>
                    </Typography>
                </Box>
            ) : (
                <Typography variant="body1" component="p">No post details available.</Typography>
            )}
        </div>
    );
}