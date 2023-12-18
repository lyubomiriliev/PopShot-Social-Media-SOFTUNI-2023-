import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import useUserProfileStore from "../store/userProfileStore";

const useGetUserProfileByUsername = (username) => {
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("username", "==", username)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return setUserProfile(null);

        let userDocument;
        querySnapshot.forEach((doc) => {
          userDocument = doc.data();
        });

        setUserProfile(userDocument);
      } catch (error) {
        console.log("Error");
      } finally {
      }
    };

    getUserProfile();
  }, [setUserProfile, username]);

  return { userProfile };
};

export default useGetUserProfileByUsername;
