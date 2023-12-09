import { collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { createContext } from "react";

export const PostContext = createContext()

export const PostContextProvider = ({ children }) => {


    const getPosts = async () => {
        const postsRef = collection(db, "posts");
        const data = await getDocs(postsRef)
        setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    }



    return (
        <PostContext.Provider value={{ getPosts }}>
            {children}
        </PostContext.Provider>
    )

}