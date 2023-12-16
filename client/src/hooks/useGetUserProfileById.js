import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

const useGetUserProfileById = (userId) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      setUserProfile(null);
      try {
        const userRef = await getDoc(doc(db, "users", userId));
        if (userRef.exists()) {
          setUserProfile(userRef.data());
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserProfile();
  }, [setUserProfile, userId]);

  return { userProfile, setUserProfile };
};

export default useGetUserProfileById;
