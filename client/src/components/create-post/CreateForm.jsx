import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'


export default function CreateForm() {

    const [user] = useAuthState(auth);

    const [input, setInput] = useState("");
    const [content, setContent] = useState("");

    const titileInputHandler = (e) => {
        setInput(e.target.value);
    }
    const contentInputHandler = (e) => {
        setContent(e.target.value);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (input && content) {
            await addDoc(collection(db, "posts"), {
                title: input,
                content: content,
                username: user.displayName,
                id: user?.uid,
                timestamp: serverTimestamp(),
            })
            setInput("");
            setContent("");
        }

    }

    return (
        <form onSubmit={submitHandler} >
            <input onChange={titileInputHandler} type="text" placeholder='Title...' value={input} />
            <textarea onChange={contentInputHandler} placeholder='Description...' value={content} />
            <input type="submit" placeholder='Submit' />

        </form>
    );
}