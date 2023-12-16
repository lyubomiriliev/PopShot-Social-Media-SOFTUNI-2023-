import "../../assets/styles/search.scss"

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useRef, useState } from 'react';
import useSearchUser from '../../hooks/useSearchUser';
import SuggestedUser from '../suggested-users/SuggestedUser';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

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

export default function Search() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { user, getUserProfile, setUser } = useSearchUser();
    const searchRef = useRef(null)

    const handleSearchUser = (e) => {
        e.preventDefault();

        getUserProfile(searchRef.current.value)
    };

    const handleCloseModal = () => {
        setOpen(false)
        setUser(null)
    }

    return (
        <div>
            <button onClick={handleOpen}>Search</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="closeBtnSearch">
                        <button onClick={handleCloseModal}><CancelOutlinedIcon /></button>
                    </div>
                    <form className="modalForm" onSubmit={handleSearchUser}>
                        <h2>Search user</h2>
                        <label >Username</label>
                        <input type="text" placeholder='Search...' ref={searchRef} />
                        <button type='submit'>Search</button>
                    </form>
                    {user && <SuggestedUser user={user} setUser={setUser} />}
                </Box>

            </Modal>
        </div>
    );
}