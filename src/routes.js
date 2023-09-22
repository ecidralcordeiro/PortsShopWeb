import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Login from "./components/pages/login/Login";
import NotFound from "./components/Notfound";
import Category from "./components/pages/category/Category";
import PrivateRoute from "./PrivateRoute";

const Rotas = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
          exact
        />
        <Route
          path="/bloc"
          element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          }
          exact
        />
        <Route path="/404" element={<NotFound />} exact />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default Rotas;
