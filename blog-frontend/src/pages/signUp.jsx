import { useState } from "react";
import { signUp } from "../api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const SignUp = () => {
  const [formData, setformData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signUp(formData);
    if (res.success) {
      setformData({ email: "", username: "", password: "" });
      navigate("/login");
    } else {
      setError(res.error);
    }

    console.log(res.error);

    setLoading(false);
  };

  if(loading){
    return(
      <p className="flex items-center text-center justify-center min-h-screen text-4xl text-black">Loading.....</p>
    )
  }

  if(error){
    return(
      <p className="flex items-center text-center justify-center min-h-screen text-4xl text-red-500">{error}</p>
    )
  }
  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <div className="rounded-xl bg-purple-300 text-white p-5 w-full md:max-w-3xl sm:max-w-md shadow-lg">
        <h3 className="text-center text-3xl font-bold mb-6">Sign Up</h3>
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="mb-2 ">
            <label htmlFor="username" className="block font-semibold text-sm">
              Username:
            </label>
            <input
              type="text"
              className="px-3 py-3 mt-1 block w-full rounded-md  shadow-sm outline-none sm:text-sm p-2 text-gray-700"
              name="username"
              value={formData.username}
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block font-semibold text-sm">
              Email:
            </label>
            <input
              type="email"
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
          <div className="flex justify-between items-center text-sm">
            <p>
              Wanna Sign Up as an <br /> Author?
              <a
                href="http://localhost:5173/auth"
                className="hover:underline font-medium text-purple-600"
              >
                Sign up
              </a>
            </p>
            <p>
              Already have an
              <br /> account?{" "}
              <Link to="/login" className="font-medium text-purple-600">
                Login
              </Link>
            </p>
          </div>
          <button
            className="w-full py-3 px-4 mt-6 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors duration-200 "
            type="submit"
          >
            Sign Up
          </button>
          {loading && "Signing up..."}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
