import { Navigate, Outlet, useLocation } from "react-router-dom"

export const PrivateRoute = ({isAuth, setAuth} :any) => {
    const location = useLocation();
    return isAuth ? <Outlet /> : <Navigate to="/signin" state={{ from: location }} replace={true} />;
}