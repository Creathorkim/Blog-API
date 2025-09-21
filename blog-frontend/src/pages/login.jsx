import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await login(formData);
    if (res.success === true) {
      setformData({ email: "", password: "" });
      navigate("/");
    } else {
      setError(res.error);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <p className="flex items-center text-center justify-center min-h-screen text-4xl text-black">
        Loading......
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
    <div className="flex items-center justify-center min-h-screen p-5">
      <div className="rounded-xl bg-purple-300 text-white p-5 w-full md:max-w-3xl sm:max-w-md shadow-lg ">
        <h3 className="text-center text-3xl font-bold mb-6">Login</h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="email" className="block font-semibold text-sm">
              Email:
            </label>
            <input
              type="text"
              className="px-3 py-3 mt-1 block w-full rounded-md shadow-sm outline-none sm:text-sm p-2 text-gray-700"
              name="email"
              value={formData.email}
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="font-semibold text-sm block">
              Password:
            </label>
            <input
              type="text"
              className="px-3 py-3 mt-1 block w-full rounded-md shadow-sm outline-none sm:text-sm p-2 text-gray-700"
              name="password"
              value={formData.password}
              required
              onChange={handleChange}
            />
          </div>
          <p>
            Dont have an account? <Link to="/signUp">Sign Up</Link>
          </p>
          <button
            className="w-full py-3 px-4 mt-6 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors duration-200 "
            type="submit"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
