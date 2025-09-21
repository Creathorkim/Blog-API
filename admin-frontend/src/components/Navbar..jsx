import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../authContext";
export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    return logOut();
  };
  return (
    <nav className=" bg-purple-800 text-white p-5 rounded-lg font-sans ">
      <div className="flex justify-between">
        <Link to="/" className="font-bold text-2xl">
          Blog Craft
        </Link>
        <ul className="hidden md:flex  gap-3 items-center">
          {token ? (
            <>
              <li>
                <Link to="/">Posts</Link>
              </li>
              <li>
                <Link to="/CreateNew">Create New</Link>
              </li>
              <button onClick={handleLogOut}>Log-Out</button>
            </>
          ) : (
            <>
              <Link to="/auth">Sign In</Link>
              <Link to="/auth/login">Login</Link>
            </>
          )}
        </ul>

        <button
          className="md:hidden rounded-lg p-3 bg-slate-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="flex flex-col w-6 gap-1 items-center">
            <div className="bg-gray-800 w-full h-0.5"></div>
            <div className="bg-gray-800 w-full h-0.5"></div>
            <div className="bg-gray-800 w-full h-0.5"></div>
          </div>
        </button>
      </div>
      {menuOpen && (
        <ul className="flex flex-col gap-3 font-bold md:hidden text-center">
          {token ? (
            <>
              <li>Posts</li>
              <li>Create new Post</li>
              <button onClick={handleLogOut}>Log-Out</button>
            </>
          ) : (
            <>
              <li>Sign Up</li>
              <li>Log-In</li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};
