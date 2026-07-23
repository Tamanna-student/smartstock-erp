import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ children }) {

    const role = localStorage.getItem("role");

    if (role !== "admin") {

        return <Navigate to="/dashboard" replace />;

    }

    return children;

}

export default RoleProtectedRoute;