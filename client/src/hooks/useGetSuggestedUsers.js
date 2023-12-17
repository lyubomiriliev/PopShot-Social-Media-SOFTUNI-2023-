import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

const useGetSuggestedUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const authUser = useAuthStore((state) => state.user);

  useEffect(() => {
    const getSuggestedUsers = async () => {
      setIsLoading(true);
      try {
        const usersRef = collection(db, "users");
        const q = query(
          usersRef,
          where("uid", "not-in", [authUser.uid, ...authUser.following]),
          orderBy("uid"),
          limit(4)
        );

        const querySnapshot = await getDocs(q);
        const users = [];

        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });

        setSuggestedUsers(users);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser) getSuggestedUsers();
  }, [authUser]);

  return { isLoading, suggestedUsers };
};

export default useGetSuggestedUsers;
