import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return(
    <div className="bg-purple-200 min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
