import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";
import { db } from "../config/firebase";
import usePostStore from "../store/postStore";

const usePostComment = () => {
  const authUser = useAuthStore((state) => state.user);
  const addComment = usePostStore((state) => state.addComment);

  const handlePostComment = async (postId, comment) => {
    if (!authUser) return alert("You must be logged in to comment");

    const newComment = {
      comment,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId,
    };
    try {
      await updateDoc(doc(db, "posts", postId), {
        comments: arrayUnion(newComment),
      });

      addComment(postId, newComment);
    } catch (error) {
      console.log(error);
    }
  };

  return { handlePostComment };
};

export default usePostComment;
