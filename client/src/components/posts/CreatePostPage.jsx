import "../../assets/styles/CreatePostPage.scss";

import Path from "../../paths";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { addDoc, doc, arrayUnion, collection, updateDoc } from 'firebase/firestore'
import { db, storage } from "../../config/firebase";
import { ref, getDownloadURL, uploadString } from 'firebase/storage';

import NavBar from '../navbar-components/NavBar';
import LeftBar from '../navbar-components/LeftBar';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import usePreviewImage from "../../hooks/usePreviewImage";
import CloseIcon from '@mui/icons-material/Close';
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";
import useUserProfileStore from "../../store/userProfileStore";


export default function CreatePostPage() {

    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const authUser = useAuthStore(state => state.user);

    const imgRef = useRef(null)

    const { selectedFile, handleImageChange, setSelectedFile } = usePreviewImage();

    const { handleCreatePost } = useCreatePost();

    const handlePostCreation = async () => {
        try {
            await handleCreatePost(selectedFile, title, content);
            navigate(`/${authUser.username}`);
            setTitle(""),
                setContent(""),
                setSelectedFile(null);
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className='create-main'>
            <NavBar />
            <div style={{ display: "flex" }}>
                <LeftBar />
                <div className="formWrapper" >
                    <img src="../../src/assets/images/popshot-logo.png" alt="logo" />
                    <div className="title">
                        <h3>Create a new post</h3>
                        <input type="text" placeholder='Title...' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="contents">
                        <textarea placeholder='Post description...' value={content} onChange={(e) => setContent(e.target.value)} />
                        <input type="file" hidden ref={imgRef} onChange={handleImageChange} />
                        <button onClick={() => imgRef.current.click()}><AddAPhotoIcon /></button>
                        {selectedFile && (
                            <div className="imagePreview" >
                                <img src={selectedFile} alt="postImage" />
                                <button onClick={() => { setSelectedFile("") }}><CloseIcon /></button>
                            </div>

                        )}
                        <div className="submit">
                            <button onClick={handlePostCreation} >Submit</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

//Create post hook

function useCreatePost() {
    const authUser = useAuthStore((state) => state.user);
    const createPost = usePostStore(state => state.createPost)
    const addPost = useUserProfileStore(state => state.addPost)

    const handleCreatePost = async (selectedFile, title, content) => {
        if (!selectedFile) throw alert("Please select an image.")

        const newPost = {
            title: title,
            content: content,
            likes: [],
            comments: [],
            createdAt: Date.now(),
            createdBy: authUser.uid,
        }

        try {
            const postDocRef = await addDoc(collection(db, "posts"), newPost);
            const userDocRef = doc(db, "users", authUser.uid);
            const postImageRef = ref(storage, `posts/${postDocRef.id}`)

            await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
            await uploadString(postImageRef, selectedFile, "data_url");
            const downloadURL = await getDownloadURL(postImageRef);
            await updateDoc(postDocRef, { imageURL: downloadURL });

            newPost.imageURL = downloadURL;

            createPost({ ...newPost, id: postDocRef.id });
            addPost({ ...newPost, id: postDocRef.id })

            alert("Post created successfully")

        } catch (error) {
            console.log(error);
        }
    }

    return { handleCreatePost }
}