import React, { useEffect, useState } from "react";
import Sidebar from "../../menus/SideBar";
import Navbar from "../../menus/Navbar";
import { Button, Box } from "@mui/material";
import ScannerQR from "../../ScannerQR";
import "./Dashboard.css";
import "../../styles/Style.css";
import {
  QueryStats,
  Engineering,
  CropFree,
} from "@mui/icons-material";

function Dashboard() {
  const [code, setCode] = useState("");
  const [reBuild, setReBuild] = useState(false);
  const [idScreen, setIdScreen] = useState(1);

  const body = () => {
    if (idScreen === 1) {
      return (
        <div
          style={{ position: "relative", height: 0, paddingBottom: "56.25%" }}
        >
          <iframe
            title="Produção Diaria"
            src="https://app.powerbi.com/reportEmbed?reportId=1600c07c-30aa-45b6-89ae-8f9da0c5b572&autoAuth=true&ctid=10f1df46-3600-406b-8233-aa54d28fe447&prompt=login"
            style={{ position: "absolute", width: "100%", height: "100%" }}
            allowFullScreen={true}
          ></iframe>
        </div>
      );
    } else if (idScreen === 2) {
    } else if (idScreen === 3) {
      return <ScannerQR setCode={setCode} />;
    } 
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="div-row-button">
        <Button
          variant="contained"
          sx={idScreen === 1 ? {} : { opacity: 0.8 }}
          onClick={() => setIdScreen(1)}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <QueryStats />
            <span> Metas</span>
          </Box>
        </Button>
        <Button
          variant="contained"
          sx={idScreen === 2 ? {} : { opacity: 0.8 }}
          onClick={() => setIdScreen(2)}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Engineering />
            <span>Peças Setor</span>
          </Box>
        </Button>
        <Button
          variant="contained"
          sx={idScreen === 3 ? {} : { opacity: 0.8 }}
          onClick={() => setIdScreen(3)}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CropFree />
            <span>Leitor</span>
          </Box>
        </Button>
      </div>
      <div className="app_body" style={{ padding: 0, top: 85 }}>
        <div style={{ marginBottom: 20 }}>{body()}</div>
      </div>
    </div>
  );
}

export default Dashboard;
