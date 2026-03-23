import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./DashboardLayout.css";

const DashboardLayout = ({ role }) => {
  return (
    <div className="layout">
      <Sidebar role={role} />
      <div className="layout__main">
        <Navbar role={role} />
        <div className="layout__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
