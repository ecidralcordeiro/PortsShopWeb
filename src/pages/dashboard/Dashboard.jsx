import React, { useEffect, useState } from "react";
import Sidebar from "../../components/menus/SideBar";
import Navbar from "../../components/menus/Navbar";
import { Button, Box } from "@mui/material";
import ScannerQR from "../../components/ScannerQR";
import "./Dashboard.css";
import "../../styles/Style.css";
import { QueryStats, Engineering, CropFree } from "@mui/icons-material";

function Dashboard() {
  const [code, setCode] = useState("");

  const body = () => {
    return <ScannerQR setCode={setCode} />;
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="app_body" style={{ padding: 0, top: 85 }}>
        <div style={{ marginBottom: 20 }}>{body()}</div>
      </div>
    </div>
  );
}

export default Dashboard;
