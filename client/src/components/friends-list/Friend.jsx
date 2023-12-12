import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useState } from "react";

export default function Friend() {

    const [friends, setFriends] = useState([]);

    const friendsCollection = collection(db, 'friends');

    const addFriends = async () => {
        await addDoc(friendsCollection, {
            name: Jack,
            city: Sofia,
            age: Number(23),
            photoURL: photo

        })
    }




    return (
        <div className="item">
            <span>Your friends:</span>
            <div className="user">
                <div className="userInfo">
                    <img src="https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg" alt="profilePic" />
                    <span>Jane Doe</span>
                </div>
                <div className="buttons">
                    <button>Unfriend</button>
                </div>
            </div>
        </div>
    );
}