import { formatDistance } from "date-fns";
import { useState, useEffect } from "react";
import axios from "axios";

export default function BlogModal({ post, onClose, onPrev, onNext }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, [post._id]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://daily-blogger-c4jx.onrender.com/comments/${post._id}`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://daily-blogger-c4jx.onrender.com/comments", {
        postId: post._id,
        content: comment
      }, { withCredentials: true });
      setComment("");
      fetchComments();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{post.Title}</h2>
          <button onClick={onClose} className="text-2xl text-gray-600 hover:text-gray-900">&times;</button>
        </div>
        <p className="text-gray-500 mb-2">
          {formatDistance(new Date(), new Date(post.TimePost))} ago
        </p>
        <p className="whitespace-pre-wrap mb-4">
          {post.Post}
        </p>
        <div className="border-t pt-4">
          <p className="font-semibold">{post.user.firstName} {post.user.lastName}</p>
          <p className="text-gray-600">{post.user.profession}</p>
        </div>
        <div className="flex justify-between mt-4 mb-6">
          <button onClick={onPrev} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-200">&larr; Previous</button>
          <button onClick={onNext} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-200">Next &rarr;</button>
        </div>

        {/* Comment Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
          <form onSubmit={handleSubmitComment} className="mb-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Add a comment..."
              rows="3"
            ></textarea>
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Submit Comment
            </button>
          </form>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment._id} className="bg-gray-100 p-3 rounded">
                <p className="font-semibold">{comment.user.username}</p>
                <p>{comment.content}</p>
                <p className="text-sm text-gray-500">{formatDistance(new Date(comment.createdAt), new Date())} ago</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}