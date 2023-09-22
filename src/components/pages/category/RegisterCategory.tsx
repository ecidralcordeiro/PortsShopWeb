import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import blogFetch from "../../../axios/config";
import { ICategory } from "./CategoryInterface";

const { forwardRef, useImperativeHandle } = React;
interface MyComponentProps {
  id: number;
}
export default forwardRef((props: MyComponentProps, ref) => {
  const [category, setCategory] = useState<ICategory>({ id: 0, name: "" });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getBlocs();
  }, []);

  useImperativeHandle(ref, () => ({
    addBloc,
  }));

  const getBlocs = async () => {
    if (props.id != null) {
      setLoading(true);
      try {
        let response = await blogFetch.get(`/category/${props.id}`);
        let data = response.data;
        setTimeout(() => {
          setCategory(data);
          setLoading(false);
        }, 300);
        return data;
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  const addBloc = async () => {
    try {
      const response = await blogFetch.post("/bloc", category);
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
        <center>
          <div className="loading-container"></div>
        </center>
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
    </>
  );
});
