import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import blogFetch from "../../axios/config";
import { IBranch } from "./BranchInterface";

interface MyComponentProps {
  id: number;
}

const Registerbranch: React.FC<MyComponentProps> = (props) => {
  const [branch, setBranch] = useState<IBranch>({ id: 0, name: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.id !== null && props.id !== 0) {
      getBranch();
    }
  }, [props.id]);

  const getBranch = async () => {
    setLoading(true);
    try {
      let response = await blogFetch.get(`/branch/${props.id}`);
      let data = response.data;
      setBranch(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addbranch = async () => {
    try {
      const response = await blogFetch.post("/branch", branch);
      console.log(response.status);
      return response.status;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranch({ ...branch, name: e.target.value });
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
            label="Nome da Marca"
            variant="outlined"
            fullWidth
            value={branch?.name}
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

export default Registerbranch;
