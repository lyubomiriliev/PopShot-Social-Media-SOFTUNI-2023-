import { getDownloadURL, ref, uploadString } from "firebase/storage";
import useAuthStore from "../store/authStore";
import { db, storage } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";

const useEditProfile = () => {
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

  const editProfile = async (inputs, selectedFile) => {
    if (!authUser) return;

    const storageRef = ref(storage, `profilePics/${authUser.uid}`);
    const userDocRef = doc(db, "users", authUser.uid);

    let URL = "";
    try {
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url");
        URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
      }

      const updatedUser = {
        ...authUser,
        fullName: inputs.fullName || authUser.fullName,
        username: inputs.username || authUser.username,
        bio: inputs.bio || authUser.bio,
        profilePicURL: URL || authUser.profilePicURL,
      };

      await updateDoc(userDocRef, updatedUser);
      localStorage.setItem("user-info", JSON.stringify(updatedUser));
      setAuthUser(updatedUser);
      setUserProfile(updatedUser);
      alert("Profile updated successfully");
    } catch (error) {
      alert("Error");
    }
  };

  return { editProfile };
};

export default useEditProfile;
