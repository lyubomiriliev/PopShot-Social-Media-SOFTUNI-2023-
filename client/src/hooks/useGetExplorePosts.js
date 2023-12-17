import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

const useGetExplorePosts = () => {
  const { posts, setPosts } = usePostStore();
  const authUser = useAuthStore((state) => state.user);
  const { setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getExplorePosts = async () => {
      try {
        const allPostsQuery = query(collection(db, "posts"));
        const querySnapshot = await getDocs(allPostsQuery);

        const allPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filteredPosts = allPosts.filter(
          (post) =>
            post.createdBy !== authUser.uid &&
            !authUser.following.includes(post.createdBy)
        );

        filteredPosts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    };

    if (authUser) {
      getExplorePosts();
    }
  }, [authUser, setPosts, setUserProfile]);

  return { posts };
};

export default useGetExplorePosts;
