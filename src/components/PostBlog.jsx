import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PostBlog({ setPost, post, fetchPosts }) {
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // For submission
  const [isNavigating, setIsNavigating] = useState(false); // For navigation

  const navigate = useNavigate();

  async function addBlog(e) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true); // Start submission process
    try {
      await axios.post("https://daily-blogger-c4jx.onrender.com/posts", {
        Title: title,
        Post: blog
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      // Refetch the posts
      await fetchPosts();

      setTitle("");
      setBlog("");
      setIsSubmitting(false); // Stop submission process
      setIsNavigating(true); // Start navigation process
      setTimeout(() => navigate('/BlogList'), 500); // Delay navigation to show feedback
    } catch (err) {
      setIsSubmitting(false); // Stop submission process
      console.log(err);
      if (err.response && err.response.data) {
        setError(err.response.data.msg);
      } else {
        setError('An error occurred while posting the blog.');
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Submit a Blog Post</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {isSubmitting ? (
          <div className="text-center">Submitting your blog, please wait...</div> // Submission indicator
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Blog Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter Title of Your Blog"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="blog">
                Blog Content
              </label>
              <textarea
                id="blog"
                placeholder="Write your blog here..."
                value={blog}
                onChange={(e) => setBlog(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md h-60 resize-none"
              />
            </div>
            <button
              onClick={addBlog}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </>
        )}
      </div>
      {isNavigating && <div className="overlay">Navigating, please wait...</div>} {/* Optional fallback during navigation */}
    </div>
  );
}
