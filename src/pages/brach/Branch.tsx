import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Sidebar from "../../components/menus/SideBar";
import blogFetch from "../../axios/config";
import Navbar from "../../components/menus/Navbar";
import RegisterCategory from "./RegisterBranch";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
} from "@mui/material";
import "../../styles/Style.css";
import { IBranch } from "./BranchInterface";

export default function Branch() {
  const [branch, setBranch] = useState<IBranch[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [branchId, setBranchId] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBranch();
  }, []);

  const getBranch = async () => {
    setLoading(true);
    try {
      let response = await blogFetch.get(`/branch`);
      let data = response.data;
      setBranch(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const AddModal = () => {
    return (
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "40vh",
        }}
      >
        <Box
          style={{
            minWidth: "400px",
            minHeight: "200px",
            width: "60%",
            padding: 10,
            backgroundColor: "white",
          }}
        >
          <RegisterCategory id={branchId} />
        </Box>
      </Modal>
    );
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="app_body">
        <Button
          onClick={() => {
            setBranchId(0);
            setShowModal(true);
          }}
        >
          Adicionar
        </Button>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell align="right">Editar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!branch &&
                branch.map((branch) => (
                  <TableRow
                    key={branch.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {branch.id}
                    </TableCell>
                    <TableCell>{branch.name}</TableCell>
                    <TableCell></TableCell>
                    <TableCell align="right">
                      <EditIcon
                        onClick={() => {
                          setBranchId(branch.id);
                          setShowModal(true);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {AddModal()}
    </>
  );
}
