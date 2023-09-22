import React, { useEffect, useState } from "react";
import { TextField, Tooltip, Button, IconButton } from "@mui/material";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import blogFetch from "../../../axios/config";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MaterialForm from "../../MaterialForm";
import { Modal } from "react-bootstrap";
import BuffeTable from "../../BufferTable";
import PartFlow from "../../PartFlow";
import AdditionalInformation from "../../AdditionalInformation";
import SalesOrders from "../../SalesOrders";
import {
  DisplaySettings,
  Info,
  Inventory,
  Science,
  Photo,
  Assignment,
} from "@mui/icons-material";
import "./Ficha.css";
export default function Ficha(props) {
  const [expanded, setExpanded] = useState(false);
  const [headerObj, setHeaderObj] = useState(props.data);
  const [idScreen, setIdScreen] = useState(0);
  const [bufferObj, setBufferObj] = useState({});
  const [materialFormObj, setMaterialFormObj] = useState({});
  const [toolMasurementsObj, setToolMasurementsObj] = useState({});
  const [SalesOrdersObj, setSalesOrdersObj] = useState({});
  const [glassLotObj, setGlassLotObj] = useState(props.data);
  const [moldesObj,setmoldesObj] = useState(props.data)
  const [order, setOrder] = useState(props.data);
  const [codeMaterials, setCodeMaterials] = useState();
  const [pecasObj, setPecasObj] = useState(props.data);
  const [partFlowObj, setPartFlowObj] = useState({});
  const [openText, setOpenText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showmodalIMG, setShowmodalIMG] = useState(false);
  const [toolTipText, setToolTipText] = useState("Vazio");
  const [showModal, setShowModal] = useState(false);

  const styleHeader = {
    padding: 10,
    fontWeight: "bold",
  };
  const iconStyle = {
    cursor: "pointer",
    fontSize: 26,
  };

  let url = "https://ingsglass.file.core.windows.net/ingsglass/BRASIL/";
  let token =
    "?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwlacupitfx&se=2033-05-04T04:42:27Z&st=2023-05-03T20:42:27Z&spr=https,http&sig=DBpnOqlwSWJgqZgPjRm5uCJ%2BgUIWicQ5cKPNhUQfNWI%3D";
  let imgName = headerObj._Plano + ".jpg";

  useEffect(() => {
    getMaterialForm();
  }, []);

  const getBuffers = async () => {
    try {
      let response = await blogFetch.get(`/Buffer/${headerObj.ordem}`);
      let data = response.data;
      setBufferObj(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSalesOrdersBI = async () => {
    try {
      let response = await blogFetch.get(
        `/ISAGAViewInfoPedidos/${headerObj.pedido}`
      );
      let data = response.data;
      setSalesOrdersObj(data);
      console.log(data);
    } catch (error) {}
  };

  const getMaterialForm = async () => {
    try {
      let response = await blogFetch.get(`/MaterialReserve/${headerObj.ordem}`);
      let data = response.data;
      let array = [];
      data.map((eachObj, index) => array.push(eachObj.COD_MATERIAL));
      setMaterialFormObj(data);
      setCodeMaterials(array.join(";"));
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getToolMasurementsObj = async () => {
    try {
      let response = await blogFetch.get(`/ToolMasurements/${codeMaterials}`);
      let data = response.data;
      setToolMasurementsObj(data);
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getPartFlow = async () => {
    try {
      const response = await blogFetch.get(
        `/SAGAViewOrdemApontamentos/${headerObj.ordem}`
      );
      const data = response.data;
      setPartFlowObj(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getPecas = async () => {
    try {
      const response = await blogFetch.get(
        `/ConsumpitonCost/${headerObj.ordem}`
      );
      const data = response.data;
      setPecasObj(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getGlassLot = async () => {
    try {
      let response = await blogFetch.get(`/GlassLot/${headerObj.ordem}`);
      let data = response.data;
      setGlassLotObj(data);
      console.log("Glas lot");
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };


  const getMoldes = async () => {
    try {
      let response = await blogFetch.get(`/iSAGA_View_MoldesGalgas/${headerObj.ordem}`);
      let data = response.data;
      setmoldesObj(data);
      console.log("Galgas");
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const tableView = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <center>
            <FontAwesomeIcon icon={faSpinner} spin />
          </center>
        </div>
      );
    }
    if (idScreen === 1) {
      if (partFlowObj === {}) {
        return (
          <h2 style={{ textAlign: "center", marginBottom: 10 }}>
            Sem infomação
          </h2>
        );
      }
      return (
        <div>
          <PartFlow sagA_PartFlow={partFlowObj} />
        </div>
      );
    } else if (idScreen === 2) {
      if (pecasObj === {}) {
        return (
          <h2 style={{ textAlign: "center", marginBottom: 10 }}>
            Sem infomação
          </h2>
        );
      }
      return (
        <div>
          <AdditionalInformation
            sagA_Pecas={pecasObj}
            sagA_Tool={toolMasurementsObj}
            sagA_GlassLot={glassLotObj}
            sagA_MoldesGalgas={moldesObj}
          />
        </div>
      );
    } else if (idScreen === 3) {
      if (bufferObj === {} || bufferObj.sagA_Buffers === null) {
        return (
          <h2 style={{ textAlign: "center", marginBottom: 10 }}>
            Sem infomação
          </h2>
        );
      }
      return (
        <div>
          <BuffeTable sagA_Buffers={bufferObj} />
        </div>
      );
    } else if (idScreen === 4) {
      if (materialFormObj === {}) {
        return (
          <h2 style={{ textAlign: "center", marginBottom: 10 }}>
            Sem infomação
          </h2>
        );
      }
      return <MaterialForm sagA_material={materialFormObj} />;
    } else if (idScreen === 5) {
      if (SalesOrdersObj === {}) {
        return (
          <h2 style={{ textAlign: "center", marginBottom: 10 }}>
            Sem infomação
          </h2>
        );
      }
      return (
        <div>
          <SalesOrders
            sagA_SalesOrders={SalesOrdersObj}
            setCode={props.setCode}
            setToolTipText={setToolTipText}
          />
        </div>
      );
    }
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const modalIMG = () => {
    return (
      <Modal
        show={showmodalIMG}
        scrollable
        size="xl"
        onHide={() => setShowmodalIMG(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title> Imagem: {headerObj._Plano}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="align-items-center">
            <img
              src={url + imgName + token}
              width={"110%"}
              style={{ overflow: "auto" }}
              alt=""
              srcset=""
            />
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  const modal = () => {
    return (
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Informações</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{toolTipText}</p>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <>
      <div
        className="mb-3 p-1app_body2"
        style={{ display: "flex", gap: 20, flexWrap: "wrap" }}
      >
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            className="header-flex"
          >
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <TextField
                className="header-flex"
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "ORDEM" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="Ordem"
                value={headerObj.ordem}
                onClick={() => {
                  setOpenText("ORDEM");
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "ZFER" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="ZFER"
                value={headerObj.zfer}
                onClick={() => {
                  setOpenText("ZFER");
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "PEÇA" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="PEÇA"
                value={headerObj.peca}
                onClick={() => {
                  setOpenText("PEÇA");
                }}
              />
              <div className="d-flex" style={{ gap: 10 }}>
                <TextField
                  id="outlined-multiline-flexible"
                  multiline={true}
                  maxRows={openText === "VERSÃO" ? 10 : 1}
                  InputProps={{
                    readOnly: true,
                    style: {
                      padding: 10,
                      fontWeight: "bold",
                    },
                  }}
                  label="VERSÃO"
                  style={{ width: 75 }}
                  value={headerObj.versaoEng}
                  onClick={() => {
                    setOpenText("VERSÃO");
                  }}
                />
                <TextField
                  id="outlined-multiline-flexible"
                  style={{ width: 75 }}
                  multiline={true}
                  maxRows={openText === "NIVEL" ? 10 : 1}
                  InputProps={{
                    readOnly: true,
                    style: {
                      padding: 10,
                      fontWeight: "bold",
                    },
                  }}
                  label="NIVEL"
                  value={headerObj.nivel}
                  onClick={() => {
                    setOpenText("NIVEL");
                  }}
                />
              </div>
              <TextField
                id="outlined-multiline-flexible"
                label="ESPESSURA"
                multiline={true}
                maxRows={openText === "ESPESSURA" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                value={
                  !headerObj
                    ? ""
                    : `${headerObj.esP_NOM} --- Max:${headerObj.esp_Max}/Min:${headerObj.esp_Min}`
                }
                onClick={() => {
                  setOpenText("ESPESSURA");
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "PARTNUMBER" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="PARTNUMBER"
                value={headerObj.partnumber}
                onClick={() => {
                  setOpenText("PARTNUMBER");
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "ESPEPLANOSSURA" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="PLANO"
                value={headerObj.plano}
                onClick={() => {
                  setOpenText("PLANO");
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "ANGULO" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="ANGULO"
                value={headerObj.angulo_Inst}
                onClick={() => {
                  setOpenText("ANGULO");
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "ACABAMENTO CP TRAÇABILIDADE" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="ACABAMENTO CP  TRAÇABILIDADE"
                value={
                  !headerObj
                    ? ""
                    : `${headerObj.acabamento}   ${headerObj.tracabilidade}`
                }
                onClick={() => {
                  setOpenText("ACABAMENTO CP TRAÇABILIDADE");
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "LOTE INTERNO" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="LOTE INTERNO"
                value={headerObj.lote_Interno}
                onClick={() => {
                  setOpenText("LOTE INTERNO");
                }}
              />
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div
              className=" mt-3 mb-5"
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                justifyContent: "space-between",
                marginRight: 24,
              }}
            >
              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "COR" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="COR"
                value={headerObj.cor}
                onClick={() => {
                  setOpenText("COR");
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "MARCO AÇO" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="MARCO AÇO"
                value={headerObj.marco_Aco}
                onClick={() => {
                  setOpenText("MARCO AÇO");
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "TIPO POLICABONATO" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="TIPO POLICABONATO"
                value={headerObj.tipo_PC}
                onClick={() => {
                  setOpenText("TIPO POLICABONATO");
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "FORNO PRINCIPAL" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="FORNO PRINCIPAL"
                value={headerObj.forno}
                onClick={() => {
                  setOpenText("FORNO PRINCIPAL");
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "FORNO HABILITADOS" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="FORNO HABILITADOS"
                value={headerObj.fornos_Hab}
                onClick={() => {
                  setOpenText("FORNO HABILITADOS");
                }}
              />

              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "RECEITA" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="RECEITA"
                value={headerObj.receita_Fornos}
                onClick={() => {
                  setOpenText("RECEITA");
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "BOMBA A" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="BOMBA A"
                value={headerObj.bomba_A}
                onClick={() => {
                  setOpenText("BOMBA A");
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "BOMBA B" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="BOMBA B"
                value={headerObj.bomba_B}
                onClick={() => {
                  setOpenText("BOMBA B");
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "BOMBA C" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="BOMBA C"
                value={headerObj.bomba_C}
                onClick={() => {
                  setOpenText("BOMBA C");
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "BOMBA HBT" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="BOMBA HBT"
                value={headerObj.bomba_HBT}
                onClick={() => {
                  setOpenText("BOMBA HNT");
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "DESC MOLDE" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="DESC MOLDE"
                value={headerObj.desc_Molde}
                onClick={() => {
                  setOpenText("DESC MOLDE");
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "BORDA EMBOLSADO" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="BORDA EMBOLSADO"
                value={headerObj.bordaEmbolsado}
                onClick={() => {
                  setOpenText("BORDA EMBOLSADO");
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "LOCAL MOLDE" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="LOCAL MOLDE"
                value={headerObj.local_Molde}
                onClick={() => {
                  setOpenText("LOCAL MOLDE");
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "LOCAL GALGA" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="LOCAL GALGA"
                value={headerObj.local_Galga}
                onClick={() => {
                  setOpenText("LOCAL GALGA");
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "LOCAL TELA" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="LOCAL TELA"
                value={headerObj.local_Tela}
                onClick={() => {
                  setOpenText("LOCAL TELA");
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "Veiculo" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="Veiculo"
                value={headerObj.desc_Veiculo}
                onClick={() => {
                  setOpenText("Veiculo");
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                multiline={true}
                maxRows={openText === "Parte" ? 10 : 1}
                InputProps={{
                  readOnly: true,
                  style: styleHeader,
                }}
                style={{ width: 160 }}
                label="Parte"
                value={headerObj.part_Short}
                onClick={() => {
                  setOpenText("Parte");
                }}
              />
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div
        className="mt-3 pb-3 "
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
          marginLeft: 8,
        }}
      >
        <Button
          sx={idScreen === 1 ? { width: 70 } : { opacity: 0.6, width: 70 }}
          variant="contained"
          onClick={async () => {
            setLoading(true);
            await getPartFlow();
            setLoading(false);
            setIdScreen(1);
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <DisplaySettings />
            <span style={{ fontSize: 8 }}> Fluxo</span>
          </div>
        </Button>
        <Button
          sx={idScreen === 2 ? { width: 70 } : { opacity: 0.6, width: 70 }}
          variant="contained"
          onClick={async () => {
            setLoading(true);
            await getPecas();
            await getGlassLot();
            await getMoldes()
            await getToolMasurementsObj();
            await getMaterialForm();
            setLoading(false);
            setIdScreen(2);
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Info />
            <span style={{ fontSize: 8 }}> Info </span>
          </div>
        </Button>

        <Button
          sx={idScreen === 3 ? { width: 70 } : { opacity: 0.6, width: 70 }}
          variant="contained"
          onClick={async () => {
            setLoading(true);
            await getBuffers();
            setLoading(false);
            setIdScreen(3);
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Inventory />
            <span style={{ fontSize: 8 }}> Racks</span>
          </div>
        </Button>
        <Button
          sx={idScreen === 4 ? { width: 70 } : { opacity: 0.6, width: 70 }}
          variant="contained"
          onClick={async () => {
            setLoading(true);
            await getMaterialForm();
            setLoading(false);
            setIdScreen(4);
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Science />
            <span style={{ fontSize: 8 }}> Formula</span>
          </div>
        </Button>
        <Button
          sx={idScreen === 5 ? { width: 70 } : { opacity: 0.6, width: 70 }}
          variant="contained"
          onClick={async () => {
            setLoading(true);
            await getSalesOrdersBI();
            setLoading(false);
            setIdScreen(5);
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Assignment />
            <span style={{ fontSize: 8 }}> Pedido</span>
          </div>
        </Button>
        <Button
          sx={showmodalIMG ? { width: 70 } : { opacity: 0.6, width: 70 }}
          variant="contained"
          onClick={() => setShowmodalIMG(true)}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Photo />
            <span style={{ fontSize: 8 }}> Imagem</span>
          </div>
        </Button>

        <IconButton
          sx={{ marginLeft: "auto", marginRight: 2 }}
          variant="text"
          onClick={() => setShowModal(true)}
        >
          <Info sx={iconStyle} color="black"></Info>
        </IconButton>
      </div>
      {modalIMG()}
      {modal()}
      {tableView()}
    </>
  );
}
