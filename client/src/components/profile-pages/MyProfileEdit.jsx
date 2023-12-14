import CloseIcon from '@mui/icons-material/Close';
import { UserAuth } from "../../contexts/AuthConext";

import "../../assets/styles/MyProfileEdit.scss";
import { useState } from 'react';


export default function MyProfileEdit({ handleClose }) {

    const { user } = UserAuth();

    const [inputs, setInputs] = useState({
        username: "",
        bio: "",
        location: "",
    });

    const handleEditProfile = () => {
        console.log(inputs)
    }


    return (
        <div className="myProfileEdit">
            <>
                <div className="editHeading">
                    <h2>Edit profile</h2>
                    <button onClick={handleClose}><CloseIcon /></button>
                </div>
                <div className="profilePicEdit">
                    <img src={user.photoUrl} alt="" />
                    <p>Change profile picture</p>
                </div>
                <div className="editInputs">
                    <span>Username</span>
                    <input
                        type="text"
                        placeholder="Username"
                        value={inputs.username}
                        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                    />
                    <span>Bio</span>
                    <input
                        type="text"
                        placeholder="Bio"
                        value={inputs.bio}
                        onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                    />
                    <span>Location</span>
                    <input
                        type="text"
                        placeholder="Location"
                        value={inputs.location}
                        onChange={(e) => setInputs({ ...inputs, location: e.target.value })}
                    />
                </div>
                <button className='submitBtnEdit' onClick={handleEditProfile}>Submit</button>
                <button className='submitBtnEdit' onClick={handleClose}>Cancel</button>
            </>
        </div>
    );
}