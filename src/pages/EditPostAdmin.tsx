import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const EditPostAdmin: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Use id instead of slug
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/posts/${id}`, { // Use /api/posts/:id
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setPost(data.data);
          setTitle(data.data.title || "");
          setContent(data.data.content || "");
          setStatus(data.data.status || "draft");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
      setLoading(false);
    }
    if (id) fetchPost(); // Only fetch if id exists
  }, [id, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/posts/${id}`, { // Use /api/posts/:id
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, status }),
      });
      if (res.ok) {
        // If publishing, use the publish endpoint
        if (status === "published" && post.status !== "published") {
          const publishRes = await fetch(`${API_URL}/api/posts/${id}/publish`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (publishRes.ok) {
            navigate("/admin/posts");
          }
        } else {
          navigate("/admin/posts");
        }
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`${API_URL}/api/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        navigate("/admin/posts");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!post) return <div className="p-8">Post not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Content</label>
          <textarea
            className="w-full border px-3 py-2 rounded min-h-[120px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Status</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostAdmin;