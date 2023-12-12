import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const SignUp = (email, password) => {
        try {
            return createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.log(err);
        }
    };

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const google = (auth, provider) => {
        try {
            return signInWithPopup(auth, provider)
        } catch (err) {
            return err;
        }
    }

    const logOut = () => {
        try {
            return signOut(auth)
        } catch (err) {
            return err;
        }
    };


    const usersCollection = collection(db, 'users')

    const createUserDoc = (username, email) => {
        addDoc(usersCollection, {
            username,
            email,
            displayName: username,
            photoURL: "https://www.whitechapelgallery.org/wp-content/uploads/2020/07/blank-head-profile-pic-for-a-man.jpg"
        });
    };



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <UserContext.Provider value={{ SignUp, user, logOut, signIn, google, createUserDoc }}>
            {children}
        </UserContext.Provider>
    )

}

export const UserAuth = () => {
    return useContext(UserContext)
}