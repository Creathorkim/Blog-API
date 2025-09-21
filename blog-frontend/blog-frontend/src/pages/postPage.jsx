import { useEffect, useState } from "react";
import { getPosts } from "../api";
import { Link } from "react-router-dom";

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts();
        setPosts(data.result.posts);
        console.log(data.result.posts)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <p className="flex items-center text-center justify-center min-h-screen text-4xl text-black">
        Loading......
      </p>
    );
  if (error)
    return (
      <p className="text-red-500 flex items-center text-center justify-center min-h-screen text-4xl">
        {error}
      </p>
    );

  return (
    <div className="px-4 sm:p-8 font-sans">
      <h1 className="text-4xl mb-12 mt-6 font-bold text-left md:text-center">
        Explore Posts
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {posts.map((post) => (
          <div
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-gray-700 p-5 text-gray-500"
            key={post.id}
          >
            <div className="mb-2 h-48">
              <div className="h-40">
                <span className="text-sm font-medium text-gray-500">
                  Written By:
                  <span className="text-purple-800 ml-1 font-bold">
                    {post.author.username}
                  </span>
                </span>
                <h2 className="text-2xl font-bold text-gray-900 my-2">
                  {post.title}
                </h2>
                <div
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="h-14 truncate"
                ></div>
              </div>
              <Link
                to={`/posts/${post.id}`}
                className="text-gray-600 mb-4 hover:underline"
              >
                See more
              </Link>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500  border-t border-gray-200 pt-4">
              <p className="text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PostPage;
