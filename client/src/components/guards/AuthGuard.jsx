import { Navigate } from "react-router-dom";
import { UserAuth } from "../../contexts/AuthConext";
import Path from "../../paths";

const AuthGuard = ({ children }) => {
    const { user } = UserAuth();

    if (!user) {
        return <Navigate to={Path.Login} />
    }
    return children;

}

export default AuthGuard;