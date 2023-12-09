import "../../assets/styles/postEditForm.scss";
import { Box, Typography } from "@mui/material";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function PostEditForm({ closeEvent, post }) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const EditPost = async () => {

        const postDoc = doc(db, "posts", post.id);
        const newFields = { title, content };
        await updateDoc(postDoc, newFields);
        closeEvent();
        post.title = title
        post.content = content
    }

    return (
        <div className="editForm">
            <>
                <button onClick={closeEvent}><CloseIcon /></button>

                <Box sx={{ m: 2 }} />
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit your post:
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <input type="text" onChange={(e) => { setTitle(e.target.value) }} value={title} placeholder="Change title post..." />
                    <input type="text" onChange={(e) => { setContent(e.target.value) }} value={content} placeholder="Change title description..." />
                </Typography>
                <button onClick={EditPost}><SendOutlinedIcon /></button>
            </>
        </div>
    );
}