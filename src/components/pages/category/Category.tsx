import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Sidebar from "../../menus/SideBar";
import blogFetch from "../../../axios/config";
import Navbar from "../../menus/Navbar";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RegisterCategory from "./RegisterCategory";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material/";

import "../../styles/Style.css";
import { ICategory } from "./CategoryInterface";

export default function Category() {
  const [category, setCategory] = useState<ICategory[]>();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      let response = await blogFetch.get(`/category`);
      let data = response.data;
      setCategory(data);
    } catch (error) {
      console.error(error);
    }
  };

  const EditModal = () => {
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
    };

    return (
      <Modal
        open={showModalEdit}
        onClose={() => setShowModalEdit(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Nome</TableCell>
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
                    <TableCell align="right">
                      <EditIcon
                        onClick={function () {
                          setCategoryId(category.id);
                          setShowModalEdit(true);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {EditModal()}
    </>
  );
}
