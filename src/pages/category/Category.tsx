import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Sidebar from "../../components/menus/SideBar";
import blogFetch from "../../axios/config";
import Navbar from "../../components/menus/Navbar";
import RegisterCategory from "./RegisterCategory";
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
import { ICategory } from "./CategoryInterface";

export default function Category() {
  const [category, setCategory] = useState<ICategory[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    setLoading(true);
    try {
      let response = await blogFetch.get(`/category`);
      let data = response.data;
      setCategory(data);
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
          <RegisterCategory id={categoryId} />
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
            setCategoryId(0);
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
                <TableCell>Teste</TableCell>
                <TableCell>Pinto</TableCell>
                <TableCell align="right">Editar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!category &&
                category.map((category) => (
                  <TableRow
                    key={category.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {category.id}
                    </TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>asdas</TableCell>
                    <TableCell>sdfgd</TableCell>
                    <TableCell></TableCell>
                    <TableCell align="right">
                      <EditIcon
                        onClick={() => {
                          setCategoryId(category.id);
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
