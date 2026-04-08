import { Navigate } from "react-router-dom";

// StaffLogin is no longer the entry point — the unified /login page handles all roles.
const StaffLogin = () => <Navigate to="/login" replace />;

export default StaffLogin;
