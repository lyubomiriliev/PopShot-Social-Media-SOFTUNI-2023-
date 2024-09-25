import "../../assets/styles/editCoverImage.scss";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useRef } from "react";
import usePreviewImage from "../../hooks/usePreviewImage";
import useEditProfile from "../../hooks/useEditProfile";

import CloseIcon from '@mui/icons-material/Close';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

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

export default function EditCoverImage({ open, handleClose, onCoverImageChange }) {
    const fileRef = useRef(null);
    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImage();

    const handleCoverUpdate = () => {
        onCoverImageChange(selectedFile);
        setSelectedFile(null);
    };


    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                <div className="editCoverImage">
                    <div className="editHeading">
                        <h3>Change your cover photo</h3>
                        <button onClick={handleClose}><CloseIcon /></button>
                    </div>
                    <div className="coverImageEdit">
                        <img src={selectedFile || "https://i.imgur.com/4L3gPTn.jpg"} alt="cover" />
                        <button onClick={() => fileRef.current.click()}><AddAPhotoIcon /></button>
                    </div>
                    <input type="file" hidden ref={fileRef} onChange={handleImageChange} />
                    <div className="submitBtnEdit">
                        <button onClick={handleCoverUpdate}>Submit</button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}
