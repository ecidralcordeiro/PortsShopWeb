import { BrowserRouter as Router,} from "react-router-dom";
import Rotas from "./routes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Rotas />
      </Router>
    </AuthProvider>
  );
}

export default App;
