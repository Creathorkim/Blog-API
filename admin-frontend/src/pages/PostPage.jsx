import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import {
  getSinglePost,
  deletePost,
  deleteComment,
  togglePublished,
  getComment,
} from "../api";
import { useContext } from "react";
import { AuthContext } from "../authContext";

export const PostPage = () => {
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState({});
  const [published, setPublished] = useState(post.published);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDeletePostModal, setShowDeletePostModal] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  useEffect(() => {
    setLoading(true);
    const fetchPost = async () => {
      try {
        const data = await getSinglePost(id, token);
        setPost(data.result.post);
        const comment = await getComment(id);
        console.log(comment);
        setComments(comment.result.comments);
      } catch {
        setError("Network Error. Please try again");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [token, id]);

  const handleDeletePost = async () => {
    const res = await deletePost(id, token);
    if (res.success === true) {
      alert("Post Deleted");
      navigate("/");
    } else {
      setError(res.error);
    }
  };

  const handleDeleteComment = async (commentdel) => {
    const yes = alert("Are you sure you wanna delete this comment??");
    if (yes) {
      await deleteComment(commentdel, token);
      alert("Post Deleted");
      navigate("/");
    } else {
      return;
    }
    // if (res.success === true) {
    //   const yes = alert("Are you sure you wanna delete this comment??");

    // } else {
    //   setError(res.error);
    // }
  };

  const handleTogglePublished = async () => {
    const newPublished = !published;
    setPublished(newPublished);
    const res = await togglePublished(token, id, newPublished);
    console.log(res);
    if (res.success === true) {
      alert("Post Published");
      navigate("/");
    } else {
      setError(res.error);
    }
  };

  if (loading) {
    return (
      <p className="flex items-center text-center justify-center min-h-screen text-4xl text-white">
        Loading....
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
    <div className="flex flex-col items-center bg-neutral-950 text-white p-8 space-y-6 ">
      <>
        <div className="w-full max-w-8xl flex flex-col gap-8">
          <div className="bg-neutral-900 p-10 md:p-6 rounded-3xl shadow-2xl text-white ">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-extrabold  text-white  text-start">
                {post.title}
              </h1>
              <div className="flex gap-3 mt-1">
                <button className="p-2 text-neutral-400  hover:text-purple-400 transition-colors duration-200">
                  <Link to={`/post/${post.id}/edit`}>
                    <Edit className="w-6 h-6" />
                  </Link>
                </button>
                <button
                  className="p-2 text-neutral-400  hover:text-purple-400 transition-colors duration-200"
                  onClick={() => setShowDeletePostModal(true)}
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="flex items-center text-sm text-neutral-400 mb-6">
              <p>
                Published on {new Date(post.createdAt).toLocaleDateString()}
              </p>
              {post.published === true ? (
                <span className="ml-4 px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full">
                  Published
                </span>
              ) : (
                <span className="ml-4 px-3 py-1 bg-yellow-600 text-white text-xs font-bold rounded-full">
                  Draft
                </span>
              )}
              <button
                className="bg-neutral-600 text-white py-2 px-3 mx-3 rounded-full text-xs font-bold"
                onClick={handleTogglePublished}
              >
                {post.published === true ? "Unpublish" : "Publish"}
              </button>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
          </div>
        </div>

        <div className="bg-neutral-900 p-10 md:p-6 rounded-3xl shadow-2xl w-full max-w-8xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            Comments ({comments.length || 0})
          </h2>
          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-5 bg-neutral-800 rounded-xl flex justify-between items-start"
                >
                  <div>
                    <span className="font-semibold text-neutral-200">
                      {comment.user.email}
                    </span>
                    <p className="text-sm text-neutral-400 mt-1">
                      {comment.content}
                    </p>
                    <p className="text-xs text-neutral-500 mt-2">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    className="ml-4 p-2 text-neutral-400 hover:text-red-500 transition-colors duration-200 rounded-lg"
                    onClick={() => handleDeleteComment(comment.id, token)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-neutral-500 text-center py-6">
                No comments yet Pal!{" "}
              </p>
            )}
          </div>
        </div>

        {showDeletePostModal && (
          <div className="fixed inset-0 bg-neutral-950 bg-opacity-75 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-neutral-800 p-8 rounded-xl shadow-2xl w-full max-w-sm ">
              <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
              <p className="text-neutral-400 mb-6">
                Are you sure you want to delete this post? This action cannot be
                undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeletePostModal(false)}
                  className="px-4 py-2 bg-neutral-700 text-neutral-200 font-semibold rounded-lg hover:bg-neutral-600 transitions-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeletePost}
                  className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transitions-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};
