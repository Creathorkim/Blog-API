import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPost, getComment, postComment, deleteComment } from "../api";
import { MessageCircle } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const PostDetail = () => {
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const [formData, setformData] = useState({ content: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showComment, setShowComments] = useState(false);
  const { id } = useParams();
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPost(id);
        setPost(data.result.post);
        const getComments = await getComment(id);
        setComment(getComments.result.comments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <p className="flex items-center text-center justify-center min-h-screen text-4xl text-black">
        Loading post....
      </p>
    );
  }
  if (error) {
    return (
      <p className="text-red-500 flex items-center text-center justify-center min-h-screen text-4xl">
        Error: {error}
      </p>
    );
  }
  if (!post) {
    return (
      <p className="text-red-500 flex items-center text-center justify-center min-h-screen text-4xl">
        Post not found.
      </p>
    );
  }

  const handlePostSubmit = async () => {
    setLoading(true);
    const res = await postComment(id, formData, token);
    if (res.success) {
      setformData({ content: "" });
      navigate("/");
    } else {
      setError(res.error);
    }
    setLoading(false);
  };

  const handleCommentClick = () => {
    if (!token) {
      return alert("You must log in or sign up to view and post comments 🚫");
    }

    setShowComments((prev) => !prev);
  };

  const deleteComments = (commentId) => {
    return deleteComment(commentId, token);
  };
  return (
    <div className="mt-10 font-sans p-4 flex flex-col  mx-auto items-center">
      <div className="bg-purple-300 rounded-xl p-6 sm:p-8 w-full shadow-xl">
        <div className="flex flex-col mb-4 pb-4 border-b border-gray-200">
          <span className="text-sm font-medium text-gray-500">
            Written By:{" "}
            <span className="text-blue-600 ml-1">{post.author.username}</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
            {post.title}
          </h1>
        </div>
        <div
          className="text-gray-700 mb-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <button className="flex gap-2" onClick={handleCommentClick}>
            <MessageCircle />
            <span>{comment.length}</span>
          </button>

          <p>Published On: {new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div
        className={`mt-4 bg-purple-300 p-6 rounded-xl shadow-xl w-full ${
          showComment
            ? "translate-y-9 opacity-100 duration-500 ease-in-out"
            : "-translate-y-9 opacity-0 duration-500 ease-in-out"
        }`}
      >
        <div className="w-full p-4 ">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Comments</h1>
          <div className="space-y-3">
            <div>
              {comment.length === 0 ? (
                <p className="text-gray-500 italic">
                  No comments yet. Be the first
                </p>
              ) : (
                comment.map((c) => (
                  <div className="border-b border-gray-900 p-5" key={c.id}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-gray-800">
                        {c.user.username}
                      </span>
                      <span className="text-xs text-gray-400 ">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{c.content}</p>
                    {c.userId === user.id && (
                      <div
                        className="text-end mt-4"
                        onClick={() => deleteComments(c.id)}
                      >
                        <button>🗑</button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            <div className="mt-6">
              <textarea
                name="content"
                className="w-full p-3 rounded-lg focus:outline-none text-sm"
                rows={4}
                value={formData.content}
                onChange={(e) =>
                  setformData({ ...formData, content: e.target.value })
                }
                placeholder="Add a new comment..."
              ></textarea>
              <button
                className="mt-2 w-full md:w-auto px-6 py-2 bg-purple-400 text-white font-semibold rounded-lg hover:bg-purple-800 transition-colors duration-300"
                onClick={handlePostSubmit}
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
