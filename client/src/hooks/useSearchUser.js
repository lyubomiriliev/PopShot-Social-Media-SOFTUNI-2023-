import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firebase";

const useSearchUser = () => {
  const [user, setUser] = useState(null);

  const getUserProfile = async (username) => {
    try {
      const q = query(
        collection(db, "users"),
        where("username", "==", username)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return alert("User not found");

      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };

  return { getUserProfile, user, setUser };
};

export default useSearchUser;
