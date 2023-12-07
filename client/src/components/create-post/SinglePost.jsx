import "../../assets/styles/singlePost.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';



import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Comments from "../comments/Comments";


export default function SinglePost({ post, deletePost }) {

    const [user] = useAuthState(auth)

    const [likes, setLikes] = useState([]);

    const [showComments, setShowComments] = useState(false);

    const likesRef = collection(db, "likes")

    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id });
            if (user) {
                setLikes((prev) => prev ? [...prev, { userId: user.uid, likeId: newDoc.id }] : [{ userId: user.uid, likeId: newDoc.id }])
            }
        } catch (err) {
            console.log(err);
        }
    };

    const refreshLikes = async () => {
        const data = await getDocs(likesDoc)
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
    }

    useEffect(() => {
        refreshLikes();
    }, [])

    // useEffect(() => {

    // }, [likes])

    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(likesRef,
                where("postId", "==", post.id),
                where("userId", "==", user.uid));

            const likeToDeleteData = await getDocs(likeToDeleteQuery);

            const likeId = likeToDeleteData.docs[0].id

            const likeToDelete = doc(db, "likes", likeId);

            await deleteDoc(likeToDelete);

            if (user) {
                // setLikes((prev) => prev && prev.filter((like) => like.id !== likeId));
                refreshLikes();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const showCommentHandler = () => {
        setShowComments(true);
    }


    // test
    // const userPostPhoto = query(postsRef,
    //     where("userId", "==", user.uid),
    //     where("user.photoURL", "==", auth.currentUser.user.photoURL));

    const hasUserLiked = likes?.find((like) => like.userId === user.uid);

    return (
        <div className="single-post">
            <div className="container">
                <div className="userPostInfo">
                    <img src={user?.photoURL} alt="profilePic" className="postThumbnail" />
                    <div className="details">
                        <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <span className="name">{post.username}</span>
                        </Link>
                    </div>

                    <div className="deleteBtn">
                        <button onClick={() => { deletePost(post.id) }} className="delBtn"><CloseIcon /></button>
                    </div>
                </div>
                <div className="datePosted">
                    <span className="date">1 min ago</span>
                </div>
                <div className="title">
                    <h2>{post.title}</h2>
                </div>
                <div className="content">
                    <p>{post.content}</p>
                </div>
                <div className="image">
                    <img src={post.imageUrl} alt="" />
                </div>

                <div className="info">
                    <div className="likeBtn">
                        <button onClick={hasUserLiked ? removeLike : addLike} > {hasUserLiked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />} </button>
                        {hasUserLiked && <p>Likes: {likes?.length}</p>}
                    </div>
                    <div className="item">
                        <button onClick={showCommentHandler}><AddCommentOutlinedIcon /></button>
                        <div className="comment">
                            <Comments value={post} />
                        </div>
                    </div>
                    <div className="item">
                        <EditOutlinedIcon />
                        <span>Edit</span>
                    </div>
                    <div className="item">
                        <BookmarkBorderOutlinedIcon />
                        <span>Save</span>
                    </div>
                </div>

            </div>

        </div>
    );

}