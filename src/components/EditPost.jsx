import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "./Modal";

export default function EditPost({ fetchPosts }) {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [blog, setBlog] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // For loading data
    const [isSubmitting, setIsSubmitting] = useState(false); // For submission
    const [isNavigating, setIsNavigating] = useState(false); // For navigation
    const navigate = useNavigate();

    useEffect(() => {
        async function fetcher() {
            try {
                const response = await axios.get(`https://daily-blogger-c4jx.onrender.com/posts/${id}`);
                setTitle(response.data.Title);
                setBlog(response.data.Post);
                setIsLoading(false); // Data has been loaded
            } catch (error) {
                console.error(error);
                setIsLoading(false); // Stop loading even if there's an error
            }
        }
        fetcher();
    }, [id]);

    async function editPosted() {
        setIsSubmitting(true); // Start submission process
        try {
            await axios.put(`https://daily-blogger-c4jx.onrender.com/posts/${id}`, {
                Title: title,
                Post: blog
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            await fetchPosts();
            setIsSubmitting(false); // Stop submission process
            setIsNavigating(true); // Start navigation process
            setTimeout(() => navigate('/BlogList'), 500); // Delay navigation to show feedback
        } catch (error) {
            console.error(error);
            setIsSubmitting(false); // Stop submission process
        }
    }

    function handleEditClick() {
        setShowModal(true);
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                    <h1 className="text-2xl font-bold mb-6">Edit your Blog</h1>
                    {isLoading ? (
                        <p className="text-gray-700">Loading content, please wait...</p>
                    ) : (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                    Blog Title
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    placeholder="Enter Title of Your Blog"
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="blog">
                                    Blog Content
                                </label>
                                <textarea
                                    type="text"
                                    value={blog}
                                    placeholder="Enter the content of your blog"
                                    onChange={(e) => setBlog(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md h-60 resize-none"
                                />
                            </div>
                            <button
                                className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 transition-colors"
                                onClick={handleEditClick}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Edit The Post'}
                            </button>
                        </>
                    )}
                </div>
            </div>
            {showModal && (
                <Modal
                    OnClose={() => setShowModal(false)}
                    OnConfirm={() => editPosted()}
                >
                    <h2>Edit the Blog</h2>
                    <h6>Do you want to save the Blog?</h6>
                    {isSubmitting && <div className="spinner">Submitting...</div>} {/* Spinner or loading indicator */}
                </Modal>
            )}
            {isNavigating && <div className="overlay">Navigating, please wait...</div>} {/* Optional fallback during navigation */}
        </>
    );
}
