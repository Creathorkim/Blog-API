import { useState, useContext } from "react";
import { createPost } from "../api";
import { Editor } from "@tinymce/tinymce-react";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router-dom";
export const CreateNew = () => {
  const { token } = useContext(AuthContext);
  const [formData, setformData] = useState({
    title: "",
    content: "",
    published: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (name, value) => {
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate("/");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await createPost(formData, token);
      if (data.success) {
        setformData({ title: "", content: "", published: false });
        setLoading(false);
        navigate("/");
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Failed to create post:", error);
      setError("Failed to create post, Please try again later.");
    }
  };

  if (loading) {
    return (
      <p className="flex items-center text-center justify-center min-h-screen text-4xl text-white">
        Uploading Post.....
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
    <div className="flex flex-col items-center min-h-screen bg-neutral-950 text-white p-8">
      <div className="w-full max-w-7xl flex flex-col gap-6">
        <div className="bg-neutral-800 p-8 rounded-2xl shadow-xl">
          <h1 className="text-4xl md:text-3xl font-extrabold text-center md:text-start">
            Create a New Post
          </h1>
        </div>
        <form
          className="bg-neutral-800 p-8 rounded-2xl shadow-xl flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label
              htmlFor="post-title"
              className="text-md font-semibold mb-2 text-neutral-400"
            >
              Title:
            </label>
            <input
              type="text"
              name="title"
              className="rounded-lg w-full px-3 py-3 outline-none text-white bg-neutral-900"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="content"
              className="text-md font-semibold mb-2 text-neutral-400"
            >
              Content:
            </label>
            <Editor
              apiKey="4p0proz8akn8jodf91mbpry1cg36zduadt6gsk5nbcqh1bqp"
              init={{
                toolbar: true,
                skin: "oxide-dark",
                content_css: "dark",
                plugins:
                  "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount",
              }}
              value={formData.content}
              onEditorChange={(newContent) =>
                handleChange("content", newContent)
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 text-purple-600 bg-neutral-800 rounded "
              checked={formData.published}
              onChange={(e) =>
                setformData((prev) => ({
                  ...prev,
                  published: e.target.checked,
                }))
              }
            />
            <label
              htmlFor="is-published"
              className="text-md font-semibold text-neutral-400"
            >
              Publish Post
            </label>
          </div>
          <button className="bg-purple-500 hover:bg-purple-800 py-4 px-3 rounded-xl">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};
