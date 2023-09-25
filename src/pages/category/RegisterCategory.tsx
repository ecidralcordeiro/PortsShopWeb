import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import blogFetch from "../../axios/config";
import { ICategory } from "./CategoryInterface";

interface MyComponentProps {
  id: number;
}

const RegisterCategory: React.FC<MyComponentProps> = (props) => {
  const [category, setCategory] = useState<ICategory>({ id: 0, name: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.id !== null && props.id !== 0) {
      getCategory();
    }
  }, [props.id]);

  const getCategory = async () => {
    setLoading(true);
    try {
      let response = await blogFetch.get(`/category/${props.id}`);
      let data = response.data;
      setCategory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async () => {
    try {
      const response = await blogFetch.post("/category", category);
      console.log(response.status);
      return response.status;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, name: e.target.value });
  };

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="mb-3">
          <TextField
            required
            id="outlined-basic"
            label="Nome da Categoria"
            variant="outlined"
            fullWidth
            value={category?.name}
            onChange={handleNameChange}
          />
        </div>
      )}
      <div style={{display:"flex", justifyContent:"end", gap:8}}>
        <Button> Cancelar</Button>
        <Button> Salvar</Button>
        </div>
    </>
  );
};

export default RegisterCategory;
