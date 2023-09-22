import React, { useEffect, useState } from "react";
import Navbar from "../../menus/Navbar";
import Sidebar from "../../menus/SideBar";
import Button from "@mui/material/Button";
import { Modal } from "react-bootstrap";
import RegisterManufacturer from "./RegisterManufacturer";
import LoadingButton from "@mui/lab/LoadingButton";
import { getIdCompany } from "../../../constantes";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import blogFetch from "../../../axios/config";
import "../../styles/Style.css";

function Manufacturer() {
  const [manufacturers, setManufacturers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [manufacturerId, setManufacturerId] = useState(0);
  const [deleteManufacturerId, setDeleteManufacturerId] = useState(0);
  const [loading, setLoading] = useState(false);

  const ref = React.useRef();

  useEffect(() => {
    getManufacturers();
  }, []);

  const getManufacturers = async () => {
    try {
      let response = await blogFetch.get(
        `/manufacturer?companyId=${getIdCompany()}`
      );
      let data = response.data;
      console.log(data);
      setManufacturers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteManufacturer = async (mfC_PK_idManufacturer) => {
    try {
      await blogFetch.delete(`/manufacturer/${mfC_PK_idManufacturer}`);
      getManufacturers();
    } catch (error) {
      console.error(error);
    }
  };

  const modalAdd = () => {
    return (
      <Modal show={showModalAdd} onHide={() => setShowModalAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Fabricante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegisterManufacturer ref={ref}></RegisterManufacturer>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="text"
            sx={{ marginRight: 2 }}
            onClick={() => setShowModalAdd(false)}
          >
            Cancelar
          </Button>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={async () => {
              setLoading(true);
              try {
                await ref.current.addManufacturer();
                setLoading(false);
                setShowModalAdd(false);
                getManufacturers();
              } catch (error) {
                console.error();
                setLoading(false);
              }
            }}
          >
            Salvar
          </LoadingButton>
        </Modal.Footer>
      </Modal>
    );
  };

  const modalEdit = () => {
    return (
      <Modal show={showModalEdit} onHide={() => setShowModalEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Fabricante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegisterManufacturer
            ref={ref}
            idManufacturer={manufacturerId}
          ></RegisterManufacturer>
        </Modal.Body>{" "}
        <Modal.Footer>
          <Button
            variant="text"
            sx={{ marginRight: 2 }}
            onClick={() => setShowModalAdd(false)}
          >
            Cancelar
          </Button>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={async () => {
              setLoading(true);
              try {
                await ref.current.updateManufacturer();
                setShowModalEdit(false);
                setLoading(false);
                getManufacturers();
              } catch (error) {
                console.error();
                setLoading(false);
              }
            }}
          >
            Salvar
          </LoadingButton>
        </Modal.Footer>
      </Modal>
    );
  };

  const modalDelete = () => {
    return (
      <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title> Inativar Fabricante</Modal.Title>
        </Modal.Header>
        <Modal.Body ref={ref} idManufacturer={manufacturerId}>
          Deseja realmente inativar o Fabricante?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="text"
            sx={{ marginRight: 2 }}
            onClick={() => setShowModalAdd(false)}
          >
            Cancelar
          </Button>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={async () => {
              setLoading(true);
              try {
                deleteManufacturer(deleteManufacturerId);
                setShowModalDelete(false);
                setLoading(false);
                getManufacturers();
              } catch (error) {
                console.error();
                setLoading(false);
              }
            }}
          >
            Salvar
          </LoadingButton>
        </Modal.Footer>
      </Modal>
    );
  };
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="app_body">
        <div className="header_tables_view">
          <div></div>
          <div>
            <h3 className="title_tables">Fabricante/Fornecedor</h3>
          </div>
          <div>
            <Button
              className="add_button"
              variant="contained"
              onClick={() => {
                setShowModalAdd(true);
              }}
            >
              Adicionar
            </Button>
          </div>
        </div>
        <table className="table table-hover">
          <thead className="table-header">
            <tr className="table_row">
              <th>#</th>
              <th>Descrição</th>
              <th>CNPJ</th>
              <th>Telefone</th>
              <th className="edit">Editar</th>
            </tr>
          </thead>
          <tbody className="table_row">
            {!!manufacturers &&
              Object.entries(manufacturers).map((item) => (
                <tr key={item[1].mfC_PK_idManufacturer}>
                  <td>{item[1].mfC_PK_idManufacturer}</td>
                  <td>{item[1].mfC_name}</td>
                  <td>{item[1].mfC_cnpj}</td>
                  <td>{item[1].mfC_phone}</td>
                  <td className="edit">
                    <center>
                      <ModeEditIcon
                        onClick={() => {
                          setManufacturerId(item[1].mfC_PK_idManufacturer);
                          setShowModalEdit(true);
                        }}
                      />
                    </center>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {modalAdd()}
      {modalDelete()}
      {modalEdit()}
    </>
  );
}

export default Manufacturer;
