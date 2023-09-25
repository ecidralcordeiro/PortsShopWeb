import React, { useState, useContext } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Context } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { setUserGlobal, setPasswordGlobal } from "../../constantes";
import "./Login.css";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useContext(Context);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const loginButton = async () => {
    setUserGlobal(user);
    setPasswordGlobal(password);

    setLoading(true);
    var ret = await handleLogin();
    console.log("teste");

    if (ret) {
      setLoading(false);
      navigate("dashboard");
    } else {
      setTimeout(() => {
        setLoading(false);
        alert("Falha no Login")
      }, 1000);
    }
  };

  return (
    <div className="body">
      <div className="login-body">
        <div></div>
        <div className="img-size"></div>

        <div className="p-3 login-data size ">
          <div className="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="Usuário"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <div className="col-md-4"></div>
            <label for="floatingInput">Usuário</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="floatingInput"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.keyCode === 13) loginButton();
              }}
            />
            <div className="col-md-4"></div>
            <label for="floatingInput">Senha</label>
          </div>
          <center>
            <LoadingButton
            
              loading={loading}
              variant="contained"
              onClick={loginButton}
              className="loginButton"
            >
              Entrar
            </LoadingButton>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Login;
