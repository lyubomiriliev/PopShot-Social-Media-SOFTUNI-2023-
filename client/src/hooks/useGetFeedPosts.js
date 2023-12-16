import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

const useGetFeedPosts = () => {
  const { posts, setPosts } = usePostStore();
  const authUser = useAuthStore((state) => state.user);
  const { setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getFeedPosts = async () => {
      if (authUser.following.length === 0) {
        setPosts([]);
        return;
      }

      const q = query(
        collection(db, "posts"),
        where("createdBy", "in", authUser.following)
      );
      try {
        const querySnapshot = await getDocs(q);
        const feedPosts = [];

        querySnapshot.forEach((doc) => {
          feedPosts.push({ id: doc.id, ...doc.data() });
        });

        feedPosts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(feedPosts);
      } catch (error) {
        console.log(error);
      }
    };

    if (authUser) {
      getFeedPosts();
    }
  }, [authUser, setPosts, setUserProfile]);

  return { posts };
};

export default useGetFeedPosts;
