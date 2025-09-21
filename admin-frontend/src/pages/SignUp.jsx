import { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../api";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setformData] = useState({
    email: "",
    username: "",
    password: "",
  });

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
      navigate("/auth/login");
    } else {
      setError(res.error);
    }

    console.error(res.error);

    setLoading(false);
  };

  if (loading) {
    return (
      <p className="flex items-center text-center justify-center min-h-screen text-4xl text-white">
        Signing you up....
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
        <h1 className="text-3xl font-bold text-center mb-8">Sign Up</h1>

        <form action="" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="username"
              className="font-sm font-semibold block  mb-2 "
            >
              Username :
            </label>
            <input
              type="text"
              className="px-3 py-3 rounded-lg block w-full text-gray-700 outline-none "
              placeholder="Asake"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="font-sm font-semibold block  mb-2"
            >
              Email :
            </label>
            <input
              type="email"
              className="px-3 py-3 rounded-lg block w-full text-gray-700 outline-none"
              placeholder="kim.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="font-sm block font-semibold mb-2"
            >
              Password :
            </label>
            <input
              type="password"
              name="password"
              className="px-3 py-3 rounded-lg block w-full text-gray-700 outline-none"
              placeholder="kimanieisthegreatest"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <p className="mb-2">
            Have an account?{" "}
            <Link
              to="/auth/login"
              className="hover:underline hover:text-purple-950"
            >
              Login
            </Link>
          </p>
          <button className="w-full rounded-lg py-3 px-3 bg-purple-400 hover:bg-purple-500 transform hover:transition-colors duration-200">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
