import React, { useEffect, useState } from "react";
import blogFetch from "../../../axios/config";
import { getIdCompany } from "../../../constantes";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from "@mui/material/TextField";
const { forwardRef, useImperativeHandle } = React;

export default forwardRef((props, ref) => {
  const [name, setName] = useState(null);
  const [fantasyName, setFantasyName] = useState(null);
  const [cnpj, setCnpj] = useState(null);
  const [phone, setPhone] = useState(null);
  const [adress, setAdress] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteManufacturerId, setDeleteManufacturerId] = useState(null);

  useEffect(() => {
    getmanufacturer();
  }, []);
  useImperativeHandle(ref, () => ({
    addManufacturer,
    updateManufacturer,
    deleteManufacturer,
  }));

  const addManufacturer = async () => {
    let manufacturerId = null;
    if (selectedValue != null) {
      manufacturerId = selectedValue.MFC_PK_idManufacturer;
    }

    let manufacturer = {
      MFC_PK_idManufacturer: manufacturerId,
      MFC_name: name,
      MFC_fantasyName: fantasyName,
      MFC_cnpj: cnpj,
      MFC_phone: phone,
      MFC_adress: adress,
      MFC_active: true,
      MFC_FK_companyId: getIdCompany(),
    };
    try {
      const response = await blogFetch.post("/manufacturer", manufacturer);
      console.log(response.status);
      return response.status;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const updateManufacturer = async () => {
    let manufacturerId = null;
    if (selectedValue != null) {
      manufacturerId = selectedValue.MFC_PK_idManufacturer;
    }

    let manufacturer = {
      MFC_PK_idManufacturer: manufacturerId,
      MFC_name: name,
      MFC_fantasyName: fantasyName,
      MFC_cnpj: cnpj,
      MFC_phone: phone,
      MFC_adress: adress,
      MFC_active: true,
      MFC_FK_companyId: getIdCompany(),
    };
    console.log(manufacturer);
    try {
      const response = await blogFetch.put(
        "/manufacturer/" + props.idManufacturer,
        manufacturer
      );

      return response.status;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const deleteManufacturer = async () => {
    let manufacturer = {
      MFC_name: name,
      MFC_fantasyName: fantasyName,
      MFC_cnpj: cnpj,
      MFC_phone: phone,
      MFC_adress: adress,
      MFC_active: false,
      MFC_FK_companyId: getIdCompany(),
    };
    console.log(manufacturer);
    try {
      const response = await blogFetch.delete(
        "/manufacturer/" + props.idManufacturer
      );

      return response.status;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getmanufacturer = async () => {
    if (props.idManufacturer != null) {
      setIsLoading(true);
      try {
        setIsLoading(true);
        let response = await blogFetch.get(
          `/manufacturer/${props.idManufacturer}`
        );
        let data = response.data;
        setTimeout(() => {
          setName(data.mfC_name);
          setFantasyName(data.mfC_fantasyName);
          setCnpj(data.mfC_fantasyName);
          setPhone(data.mfC_phone);
          setAdress(data.mfC_adress);
          setIsLoading(false);
        }, 300);
        return data;
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="loading-container">
          <center>
            <FontAwesomeIcon icon={faSpinner} spin />
          </center>
        </div>
      ) : (
        <div>
          <div className="mb-3">
            <TextField
              id="outlined-basic"
              label="Razão Social"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <TextField
              id="outlined-basic"
              label="Nome Fantasia"
              variant="outlined"
              fullWidth
              value={fantasyName}
              onChange={(e) => setFantasyName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <TextField
              id="outlined-basic"
              label="CNPJ"
              variant="outlined"
              fullWidth
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <TextField
              id="outlined-basic"
              label="Telefone"
              variant="outlined"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <TextField
              id="outlined-basic"
              label="Endereço"
              variant="outlined"
              fullWidth
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
            />
          </div>
        </div>
      )}
    </>
  );
});
