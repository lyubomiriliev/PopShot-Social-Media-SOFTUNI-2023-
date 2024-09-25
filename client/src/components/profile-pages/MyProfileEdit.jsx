import "../../assets/styles/myProfileEdit.scss"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
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

export default function MyProfileEdit({ open, handleClose, coverOpen, handleCoverClose }) {

    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        bio: "",
    });

    const authUser = useAuthStore((state) => state.user);

    const fileRef = useRef(null)
    const coverRef = useRef(null)

    const { handleImageChange, selectedFile, selectedCoverFile, setSelectedFile, setSelectedCoverFile } = usePreviewImage();

    const { editProfile } = useEditProfile();

    const handleEditProfile = async () => {

        try {
            await editProfile(inputs, selectedFile, selectedCoverFile)
            setSelectedFile(null);
            setSelectedCoverFile(null)
            handleClose();
        } catch (error) {
            alert("Error updating your profile")
        }
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
                            <h3>Edit Profile</h3>
                            <button onClick={handleClose} ><CloseIcon /></button>
                        </div>
                        <div className="profilePicEdit">
                            <img src={selectedFile || authUser.profilePicURL} alt="avatar" />
                            <button onClick={() => fileRef.current.click()} ><AddAPhotoIcon /></button>
                        </div>
                        <div className="editInputs">
                            <input type="file" hidden ref={fileRef} onChange={handleImageChange} />
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder='FullName'
                                value={inputs.fullName || authUser.fullName}
                                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                            />
                            <label>Username</label>
                            <input
                                type="text"
                                placeholder='Username'
                                value={inputs.username || authUser.username}
                                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                            />
                            <label>Bio</label>
                            <input
                                type="text"
                                placeholder='Bio'
                                value={inputs.bio || authUser.bio}
                                onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                            />
                            <div className="submitBtnEdit">
                                <button onClick={handleEditProfile}>Submit</button>
                            </div>
                        </div>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}