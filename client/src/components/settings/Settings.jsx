import "../../assets/styles/settings.scss";

import NavBar from "../navbar-components/NavBar";
import LeftBar from "../navbar-components/LeftBar";

import { UserAuth } from "../../contexts/AuthConext";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";


export default function Settings() {

    const { user } = UserAuth();

    const [nickname, setNickname] = useState('');
    const [location, setLocation] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [occupation, setOccupation] = useState('');
    const [birthday, setBirthday] = useState('');

    const [settings, setSettings] = useState({
        nickname: '',
        location: '',
        hobbies: '',
        occupation: '',
        birthday: '',
    })

    const settingsRef = collection(db, 'settings');

    const getUserSettings = async () => {
        const userSettingsRef = doc(settingsRef, user.uid);
        const snapshot = await getDoc(userSettingsRef);
        if (snapshot.exists()) {
            const userData = snapshot.data();
            setSettings(userData);
            setNickname(userData.nickname || '');
            setLocation(userData.location || '');
            setHobbies(userData.hobbies || '');
            setOccupation(userData.occupation || '');
            setBirthday(userData.birthday || '');
        }

    }

    useEffect(() => {
        getUserSettings();

    }, [])

    const editUserSettings = async () => {
        const userSettingsRef = doc(settingsRef, user.uid);
        await setDoc(userSettingsRef, {
            nickname,
            location,
            hobbies,
            occupation,
            birthday,
            authorAvatar: user.photoURL
        });
        setSettings({
            nickname,
            location,
            hobbies,
            occupation,
            birthday,
            authorAvatar: user.photoURL
        });
    }



    const EditProfileSubmitHandler = async (e) => {
        e.preventDefault();
        editUserSettings();
    }





    return (
        <>
            <div >
                <NavBar />
                <div className="leftBarDiv" style={{ display: "flex" }}>
                    <LeftBar />
                    <div className="settingsContainer" style={{ flex: 6 }}>
                        <div className="upperSection">
                            <div className="header">
                                <h1> Edit profile </h1>
                            </div>
                            <div className="userHead">
                                <img src={user?.photoURL} alt="profilePic" />
                                <h2>{user.displayName}</h2>
                                <button>Change profile picture</button>
                            </div>
                        </div>
                        <div className="innerContainer">
                            <div className="inputValues">
                                <h3>Nickname: {settings.nickname}</h3>
                                <h3>Location: {settings.location}</h3>
                                <h3>Hobbies: {settings.hobbies}</h3>
                                <h3>Occupation: {settings.occupation}</h3>
                                <h3>Date of Birth: {settings.birthday}</h3>
                            </div>
                            <div className="inputMain">
                                <form onSubmit={EditProfileSubmitHandler}>
                                    <input type="text" placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                                    <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                                    <input type="text" placeholder="Hobbies" value={hobbies} onChange={(e) => setHobbies(e.target.value)} />
                                    <input type="text" placeholder="Occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
                                    <input type="date" placeholder="Birthdate" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                                    <div className="submitBtns">
                                        <button >Submit</button>
                                    </div>
                                    <button onClick={editUserSettings}>Edit</button>
                                </form>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}