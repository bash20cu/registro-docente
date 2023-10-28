import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  canActivate,
  redirectPath = "/registro-docente/",
}) => {
  if (!canActivate) {
    console.log(canActivate);
    return <Navigate to={redirectPath} replace />;
  } 
  return <Outlet />;
};

export default ProtectedRoute;
