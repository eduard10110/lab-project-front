import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { Link } from "react-router-dom";
import routes from "routes/routes";

export default function Header() {
  return (
    <div className="header-container-wrapper">
      <Link to={routes.Home} className="header-logo">
        LabTB
      </Link>
      <div className="header-right-content">
        <div className="user-container">
          <AccountCircleOutlinedIcon />
          <p>admin</p>
        </div>
        <ArrowCircleLeftOutlinedIcon />
      </div>
    </div>
  );
}
