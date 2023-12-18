import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import Path from "../paths";

const useLogin = () => {
  const [signInWithEmailAndPassword, error] =
    useSignInWithEmailAndPassword(auth);

  const loginUser = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleUserLogin = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      return alert("Please fill all the fields");
    }
    try {
      const userCredentials = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (userCredentials) {
        const docRef = doc(db, "users", userCredentials.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
        loginUser(docSnap.data());
        navigate(Path.Home);
      }
    } catch (error) {
      alert("Firebase Auth Error:", error);
    }
  };

  return { error, handleUserLogin };
};

export default useLogin;
