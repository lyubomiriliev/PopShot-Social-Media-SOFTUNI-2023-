import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

const useEditPost = () => {
  const editPost = async (postId, newTitle, newContent) => {
    try {
      const postsRef = doc(db, "posts", postId);

      await updateDoc(postsRef, {
        title: newTitle,
        content: newContent,
      });
    } catch (error) {
      alert("Error");
    }
  };

  return { editPost };
};

export default useEditPost;
