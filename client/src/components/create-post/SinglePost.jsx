import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import "../../assets/styles/singlePost.scss";

export default function SinglePost({ post }) {


    const likeArr = [{ userId: "", likeId: "" }]
    const likesRef = collection(db, "likes")
    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const [user] = useAuthState(auth)
    const [likes, setLikes] = useState(likeArr);

    const getLikes = async () => {
        const data = await getDocs(likesDoc)
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
    }


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

    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(likesRef,
                where("postId", "==", post.id),
                where("userId", "===", user.uid));

            const likeToDeleteData = await getDocs(likeToDeleteQuery);

            const likeId = likeToDeleteData.docs[0].id

            const likeToDelete = doc(db, "likes", likeId);

            console.log(likeToDelete);

            await deleteDoc(likeToDelete);

            if (user) {
                setLikes((prev) => prev && prev.filter((like) => like.id !== likeId));
            }
        } catch (err) {
            console.log(err);
        }
    };

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);


    useEffect(() => {
        getLikes();
    }, [likesDoc])

    return (
        <div className="single-post">

            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="content">
                <p>{post.content}</p>
            </div>
            <div className="image">
                <img src={post.imageUrl} alt="" />
            </div>

            <div className="username">
                <p>@{post.username}</p>
                <button onClick={hasUserLiked ? removeLike : addLike} > {hasUserLiked ? <>&#128078;</> : <>&#128077;</>} </button>
                {likes && <p>Likes: {likes?.length}</p>}
            </div>

        </div>
    );

}