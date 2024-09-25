import "../../assets/styles/search.scss"

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useRef, useState } from 'react';
import useSearchUser from '../../hooks/useSearchUser';
import SuggestedUser from '../suggested-users/SuggestedUser';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import UserSearch from "./UserSearch";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Search({ open, handleCloseModal }) {

    const { user, getUserProfile, setUser } = useSearchUser();
    const searchRef = useRef(null)

    const handleSearchUser = (e) => {
        e.preventDefault();

        getUserProfile(searchRef.current.value)
    };


    return (
        <div>
            <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="closeBtnSearch">
                        <button onClick={handleCloseModal}><CancelOutlinedIcon /></button>
                    </div>
                    <form className="modalForm" onSubmit={handleSearchUser}>
                        <h2>Search by username</h2>
                        <label >Username</label>
                        <input type="text" placeholder='Type the desired username and click search' ref={searchRef} />
                        <button type='submit'>Search</button>
                    </form>
                    {user && <UserSearch user={user} setUser={setUser} />}
                </Box>

            </Modal>
        </div>
    );
}