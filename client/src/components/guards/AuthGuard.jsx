import { Navigate } from "react-router-dom";
import Path from "../../paths";
import useAuthStore from "../../store/authStore";

const AuthGuard = ({ children }) => {
    const { user } = useAuthStore();

    if (!user) {
        return <Navigate to={Path.Login} />
    }
    return children;

}

export default AuthGuard;