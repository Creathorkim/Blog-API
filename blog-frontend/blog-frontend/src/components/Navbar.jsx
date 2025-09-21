import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout, token } = useContext(AuthContext);

  const [IsMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logOut = () => {
    const confirmed = confirm("Are you sure you want to logout?");
    if (confirmed) {
      logout();
      navigate("/");
    }
  };
  return (
    <nav className=" p-5  border-b border-gray-400 font-sans">
      <div className="flex justify-between items-center text-stone-950">
        <h1 className="font-sans text-2xl font-bold">
          <Link to="/">BlogCraft </Link>
        </h1>

        <ul className="hidden md:flex gap-3 font-semibold">
          {token ? (
            <>
              <li>
                <Link to="/posts">Post</Link>
              </li>
              <li>
                <button return onClick={logOut}>
                  Log-Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/signUp">Sign-Up</Link>
              </li>
              <li>
                <Link to="/login">Log-in</Link>
              </li>
            </>
          )}
        </ul>

        <button
          className="md:hidden  bg-transparent p-3  hover:bg-white rounded-lg"
          onClick={() => setIsMenuOpen(!IsMenuOpen)}
        >
          <div className="flex flex-col w-6  gap-1 items-center ">
            <div className="bg-gray-800 w-full h-0.5"></div>
            <div className="bg-gray-800 w-full h-0.5"></div>
            <div className="bg-gray-800 w-full h-0.5"></div>
          </div>
        </button>
      </div>

      {IsMenuOpen && (
        <ul className="md:hidden flex flex-col gap-3 font-sans  font-semibold text-center mt-6 items-center">
          {token ? (
            <>
              <li>
                <Link to="/posts">Post</Link>
              </li>
              <li>
                <button onClick={logOut}>Log-Out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/signUp">Sign-Up</Link>
              </li>
              <li>
                <Link to="/login">Log-in</Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
