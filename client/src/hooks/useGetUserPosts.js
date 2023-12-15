import { useEffect } from "react";
import usePostStore from "../store/postStore";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

const useGetUserPosts = () => {
  const { posts, setPosts } = usePostStore();
  const userProfile = useUserProfileStore((state) => state.userProfile);

  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile) return;
      setPosts([]);

      try {
        const q = query(
          collection(db, "posts"),
          where("createdBy", "==", userProfile.uid)
        );
        const querySnapshot = await getDocs(q);

        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });

        posts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(posts);
      } catch (error) {
        console.log(error);
        setPosts([]);
      }
    };

    getPosts();
  }, [setPosts, userProfile]);

  return { posts };
};

export default useGetUserPosts;
