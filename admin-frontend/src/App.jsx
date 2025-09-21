import { Navbar } from "./components/Navbar.";
import { Outlet } from "react-router-dom";
export const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
