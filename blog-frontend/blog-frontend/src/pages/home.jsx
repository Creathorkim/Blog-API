import image from "../assets/blog.jpg";
import imageTwo from "../assets/image.jpeg";
import imageThree from "../assets/images.webp";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { token, user } = useContext(AuthContext);

  return (
    <div className="space-y-8 w-full md:max-w-4xl sm:max-w-sm mx-auto text-center mt-20 font-sans min-h-screen p-5">
      {token ? (
        <div className="flex flex-col items-center justify-center mx-auto bg-purple-400 p-16 md:p-14 rounded-2xl shadow-2xl w-full  text-center">
          <h1 className="text-5xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Welcome back, {user.username}! 👋{" "}
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            {" "}
            We're glad to see you again. Ready to share your thoughts or catch
            up on the latest posts?
          </p>
          <Link
            to="/posts"
            className="inline-block w-full px-10 py-4 bg-purple-700 text-white font-semibold rounded-full shadow-lg hover:bg-purple-900 transition-all duration-300 tranform hover:scale-105 hover:-translate-y-1"
          >
            {" "}
            Go to Posts Page
          </Link>
        </div>
      ) : (
        <>
          <div className="px-4">
            <p className="font-semibold">
              Welcome to the platform where ideas turn into impact. Whether
              you're a seasoned writer or just getting started, here you can
              draft, edit and publish your thoughts with ease. Share your
              knowledge, tell your story, or build your personal brand - all
              from one intuitive space designed to empower your voice. No
              clutter, No noise. Just you and your words, exactly how you want
              them.
            </p>
          </div>
          <div className="px-4">
            <p className="italic">
              Every post is a page in your journey. Make it meaningful.
            </p>
          </div>
          <div className="px-4 flex flex-col md:flex-row  gap-2 items-center justify-center ">
            <Link
              to="/posts"
              className="block bg-pink-300 px-3 py-3 rounded-lg  w-48 "
            >
              Explore as Guest
            </Link>
            <Link
              to="/login"
              className="bg-purple-700 px-3 py-3 w-48 rounded-lg text-white block"
            >
              Continue With Account
            </Link>
          </div>

          <div className=" hidden md:flex justify-center relative ">
            <img
              src={image}
              alt="image"
              className="  max-w-4xl h-64 object-cover rounded-xl mt-9 -mr-6 z-30"
            />
            <img
              src={imageTwo}
              alt="image"
              className=" max-w-4xl h-64 object-cover rounded-xl"
            />
            <img
              src={imageThree}
              alt="image"
              className=" max-w-4xl h-64 object-cover rounded-xl mt-9 -ml-6"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
