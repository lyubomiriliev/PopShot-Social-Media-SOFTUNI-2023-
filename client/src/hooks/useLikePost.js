import { useState } from "react";
import useAuthStore from "../store/authStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const useLikePost = (post) => {
  const authUser = useAuthStore((state) => state.user);
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid));

  const handleLikePost = async () => {
    try {
      const postsRef = doc(db, "posts", post.id);
      await updateDoc(postsRef, {
        likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      });

      setIsLiked(!isLiked);
      isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return { isLiked, likes, handleLikePost };
};

export default useLikePost;
