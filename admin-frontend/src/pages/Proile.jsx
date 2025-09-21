import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../authContext";
import { getPosts } from "../api";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
export const Home = () => {
  const { user, token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getPosts(token, );
        if (res.success ===true) {
          setPosts(res.result.posts);
        } else {
          setError(res.error);
          console.log(res.error);
        }
      } catch (err) {
        setError("Oops something went wrong");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <p className="flex items-center text-center justify-center min-h-screen text-4xl text-white">
        Loading......
      </p>
    );
  }

  if (error) {
    return (
      <p className="flex items-center text-center justify-center min-h-screen text-4xl text-white">
        {error}
      </p>
    );
  }
  return (
    <div className="flex flex-col   bg-stone-950 text-white p-8 sm:p-4">
      <div className="w-full max-w-7xl flex flex-col gap-6 mt-4">
        <div className="bg-neutral-800 p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-3xl font-extrabold">
              Welcome back,{user.username}👋
            </h1>
            <p className="text-neutral-400 mt-4 md:mt-1 text-center md:text-left">
              Your author dashboard at a glance.
            </p>
          </div>
          <Link
            to="/createNew"
            className="px-6 py-3 mt-5 md:mt-1 bg-purple-600 font-semibold rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-200 transform hover:scale-105"
          >
            Create New Post
          </Link>
        </div>

        <div className="bg-neutral-800 p-6 rounded-xl shadow-lg flex  items-center gap-4">
          <div className="w-12 h-12  rounded-full  bg-purple-600 text-white flex items-center justify-center">
            <Edit />
          </div>
          <div>
            <p className="text-xl font-bold">{posts.length}</p>
            <p className="text-sm text-neutral-400">Post Created</p>
          </div>
        </div>

        <div className="bg-neutral-800 p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
          <div className="space-y-4">
            {posts?.length > 0 ? (
              posts.map((post) => (
                <Link key={post.id} to={`postDetail/${post.id}`}>
                  <div className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg border border-neutral-700 hover:bg-neutral-700 transition-colors duration-200">
                    <div>
                      <h3 className="font-semibold">{post.title}</h3>
                      {post.published === true ? (
                        <p className="text-sm text-neutral-400">
                          Published on{" "}
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      ) : (
                        <p className="text-sm text-neutral-400">Draft</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <>
                <Link
                  to="/createNew"
                  className="hover:underline hover:text-purple-700"
                >
                  <p className="text-2xl font-bold flex justify-center mx-auto my-5">
                    You have no Post Pal, Start writing today.
                  </p>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
