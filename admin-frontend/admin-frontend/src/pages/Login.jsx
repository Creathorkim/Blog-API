import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";
import { useContext } from "react";
export const Login = () => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logIn } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await logIn(formData);

    if (res.success) {
      setformData({ email: "", password: "" });
      navigate("/");
    } else {
      setError(res.error);
    }

    console.log(res.error);
    setLoading(false);
  };

  if (loading) {
    return (
      <p className="flex items-center text-center justify-center min-h-screen text-4xl text-white">
        Logging you in....
      </p>
    );
  }

  if (error) {
    return (
      <p className="flex items-center text-center justify-center min-h-screen text-4xl text-red-500">
        {error}
      </p>
    );
  }
  return (
    <div className="flex items-center min-h-screen justify-center p-5">
      <div className="bg-purple-800 p-5 rounded-lg w-full md:max-w-3xl">
        <h1 className="font-bold text-3xl text-center mb-8">Login</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="email" className="font-sm block mb-2 font-semibold">
              Email :
            </label>
            <input
              type="email"
              className="px-3 py-4 rounded-lg outline-none block w-full text-gray-700"
              placeholder="kim.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="font-sm block mb-2 font-semibold">
              Password :
            </label>
            <input
              type="password"
              className="px-3 py-4 rounded-lg outline-none w-full text-gray-700"
              placeholder="kimanieisthegreatest"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <p className="mb-2">
            Don't have an account?{" "}
            <Link to="/auth" className="hover:underline hover:text-purple-900">
              Sign Up
            </Link>
          </p>
          <button className="w-full px-3 py-3 rounded bg-purple-400 hover:bg-purple-500 transform hover:transition-colors duration-200">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
