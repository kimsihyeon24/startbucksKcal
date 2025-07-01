import { Outlet } from "react-router-dom";
import Layout from "./components/layout/layout.js";

function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;
