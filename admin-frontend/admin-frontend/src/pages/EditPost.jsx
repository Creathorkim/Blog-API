import { useNavigate, useParams } from "react-router-dom";
import { getSinglePost, updatePost } from "../api";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../authContext";
import { Editor } from "@tinymce/tinymce-react";

export const EditPost = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    published: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSinglePost(id, token);
        if (data.success) {
          setFormData({
            title: data.result.title,
            content: data.result.content,
            published: data.result.published,
          });
          setLoading(false);
        } else {
          setError(data.error);
        }
      } catch {
        setError("Network Error, Please try again later");
      }
    };
    fetchData();
  }, [id, token]);

  const handleChange = (name, value) => {
    console.log(name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await updatePost(token, formData, id);
    if (data.success) {
      navigate("/");
      setFormData({ content: "", title: "", published: "" });
    } else {
      console.log(data.error);
    }
  };

  if (loading) {
    return (
      <p className="flex items-center text-center justify-center min-h-screen text-4xl text-white">
        Loading.....
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
    <div className="flex flex-col items-center p-8 min-h-screen bg-neutral-950 text-white ">
      <div className="w-full max-w-8xl flex flex-col gap-8">
        <div className="bg-neutral-900 p-10 md:p-6 rounded-2xl shadow-sm text-white">
          <h1 className="text-4xl md:text-3xl font-extrabold">Edit Post</h1>
          <p className="text-neutral-400 mt-1">
            Make changes to your existing post.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-neutral-800 p-8 md:p-6 rounded-2xl shadow-xl flex flex-col gap-6 "
        >
          <div className="mb-2 flex flex-col">
            <label
              htmlFor="title"
              className="text-sm font-semibold mb-2 text-neutral-400"
            >
              Title
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-neutral-900 text-white outline-none"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-2">
            <label
              htmlFor="content"
              className="text-sm font-semibold mb-2 text-neutral-400"
            >
              Content
            </label>
            <Editor
              apiKey="4p0proz8akn8jodf91mbpry1cg36zduadt6gsk5nbcqh1bqp"
              value={formData.content}
              init={{
                toolbar: true,
                skin: "oxide-dark",
                content_css: "dark",
                plugins:
                  "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount",
              }}
              onEditorChange={(content) => handleChange("content", content)}
            />
          </div>
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={formData.published}
              className="w-4 h-4 text-purple-600 bg-neutral-800"
              onChange={(e) => handleChange("published", e.target.checked)}
            />
            <label
              htmlFor="publish"
              className="text-sm font-semibold text-neutral-400"
            >
              Publish Post
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
