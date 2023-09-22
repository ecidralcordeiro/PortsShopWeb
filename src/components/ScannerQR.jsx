import React, { useState, useEffect } from "react";
import blogFetch from "../axios/config";
import { QrReader } from "react-qr-reader";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";

import "./styles/ScannerQR.css";

function ScannerQR(props) {
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");
  const [order, setOrder] = useState("");
  const [error, setError] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [functionCalled, setFunctionCalled] = useState(false);
  const [loadingHeader, setLoadingHeader] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    let timer;
    if (showSpinner) {
      timer = setTimeout(() => {
        setShowSpinner(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showSpinner]);

  const handleScan = async (scanData) => {
    setLoadingScan(true);
    if (scanData && scanData !== "") {
      setData(scanData);
      const header = await getHeader(scanData);
      if (header) {
        props.setCode(header);
        setStartScan(false);
      } else {
        setError("Error: Failed to retrieve header data.");
      }
      setLoadingScan(false);
    }
  };

  const getHeader = async (order) => {
    try {
      console.log("data:  " + order);
      setFunctionCalled(true);
      setLoadingHeader(true);
      setShowSpinner(true);
      const response = await blogFetch.get(`/SAGAViewFichaCabecalho/${order}`);
      setLoadingHeader(false);
      return response.data[0];
    } catch (error) {
      console.error(error);
      setError("Server error occurred.");
      setLoadingHeader(false);
      setShowSpinner(false);
      return null;
    }
  };

  const handleCan = () => {
    if (selected === "environment") {
      setSelected("user");
    } else {
      setSelected("environment");
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleAlertClose = () => {
    setError("");
    setOrder(""); // Reset the order input
  };

  return (
    <div className="App mt-3">
      <h1 className="mb-3">Leitor QRCODE</h1>

      <Button
        className="mb-3"
        onClick={() => {
          setStartScan(!startScan);
        }}
        disabled={disableButton}
      >
        {startScan ? "Parar Leitura" : "Começar Leitura"}
      </Button>
      <TextField
        id="outlined-basic"
        label="Ordem"
        variant="outlined"
        className="mb-3"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
        disabled={loadingHeader}
        onKeyDown={async (e) => {
          if (e.key === "Enter" || e.keyCode === 13) {
            const header = await getHeader(order);
            if (header) {
              props.setCode(header);
            } else {
              setError("Erro codigo não encontrado.");
            }
          }
        }}
      />
      {startScan && (
        <>
          <div className="container-teste" style={{ width: 300, height: 300 }}>
            <div className="navi" style={{ width: 300 }}>
              <Button
                variant="contained"
                onClick={handleCan}
                disabled={loadingHeader}
              >
                <AutorenewIcon />
              </Button>
            </div>
            <div className="infoi">
              <QrReader
                facingMode={selected}
                delay={500}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "300px" }}
              />
            </div>
          </div>
        </>
      )}
      {loadingScan && <p>Loading</p>}
      {loadingHeader && (
        <div style={{ textAlign: "center" }}>
          {showSpinner ? <CircularProgress /> : <p>Loading...</p>}
        </div>
      )}
      {data !== "" && <p>{data}</p>}
      {error && (
        <div className="error mb-2">
          <Alert severity="error" className="mb-1">
            {error}
          </Alert>
          <Button onClick={handleAlertClose}>Sair</Button>
        </div>
      )}
    </div>
  );
}

export default ScannerQR;
