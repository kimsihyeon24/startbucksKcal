import { Outlet } from "react-router-dom";
import Layout from "./pages/Layout/layout.js";

function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;
