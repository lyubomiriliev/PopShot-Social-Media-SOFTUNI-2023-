import "../../assets/styles/myProfileEdit.scss"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import CloseIcon from '@mui/icons-material/Close';



export default function PostEdit({ open, handleClose, post }) {

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


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const EditPost = async () => {

        const postDoc = doc(db, "posts", post.id);
        const updateFields = { title, content };
        await updateDoc(postDoc, updateFields);
        handleClose();
        post.title = title
        post.content = content
    }


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="myProfileEdit">
                        <div className="editHeading">
                            <h3>Edit post</h3>
                            <button onClick={handleClose} ><CloseIcon /></button>
                        </div>
                        <div className="profilePicEdit">
                            <img src={post.imageURL} alt="postPhoto" />
                        </div>
                        <div className="editInputs">
                            <label>Title</label>
                            <input
                                type="text"
                                placeholder='title'
                                onChange={(e) => { setTitle(e.target.value) }} value={title || post.title}
                            />
                            <label>Description</label>
                            <textarea
                                type="text"
                                placeholder='description'
                                onChange={(e) => { setContent(e.target.value) }} value={content || post.content}
                            />
                            <div className="submitBtnEdit">
                                <button onClick={EditPost}>Submit</button>
                                <button onClick={handleClose}>Cancel</button>
                            </div>
                        </div>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}