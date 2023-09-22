import { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Context } from "../../context/AuthContext";
import "./Navbar.css";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Navbar() {
  const { handleLogout } = useContext(Context);

  return (
    <header className="navbar2">
      <div className="navbar2">
        <div className="d-flex" style={{ gap: 8 }}></div>
        <div className="d-flex" style={{ gap: 8 }}></div>
        <div className="d-flex" style={{ gap: 8 }}>
          <IconButton size="large">
            <LogoutIcon onClick={handleLogout} />
          </IconButton>
        </div>
      </div>
    </header>
  );
}
