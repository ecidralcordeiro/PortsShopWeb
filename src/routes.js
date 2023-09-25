import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import NotFound from "./components/Notfound";
import Category from "./pages/category/Category";
import PrivateRoute from "./PrivateRoute";
import Branch from "./pages/brach/Branch";

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
          path="/Branch"
          element={
            <PrivateRoute>
              <Branch />
            </PrivateRoute>
          }
          exact
        />
        <Route
          path="/login"
          element={
              <Login />
          }
          exact
        />
        <Route
          path="/Category"
          element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          }
          exact
        />
        <Route path="/404" element={<NotFound />} exact />
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Rotas;
