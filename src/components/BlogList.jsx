import React, { useState, useEffect } from "react";
import { formatDistance } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import image from './image.png';
import a from './image/1.png';
import b from './image/2.png';
import c from './image/3.png';
import d from './image/4.png';
import BlogModal from "./BlogModal";
import { valuer } from "../Store/Atom";
import { useRecoilValue } from "recoil";
import image2 from '../assets/image.png'

export function BlogList({ post, fetchPosts }) {
  const [showModal, setShowModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [postToDelete, setPostToDelete] = useState(null);
  const [username, setUsername] = useState(""); // State to hold the username
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(post);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get the username from Recoil state when the component mounts or the post changes
  const usered = useRecoilValue(valuer);

  useEffect(() => {
    setUsername(usered);
  }, [usered, post]);

  useEffect(() => {
    setFilteredPosts(post);
  }, [post]);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = post.filter(blog => 
      blog.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.Post.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  

  async function deleter(id) {
    setLoading(true); 
    try {
      await axios.delete(`https://daily-blogger-c4jx.onrender.com/posts/${id}`);
       await fetchPosts();
     
    } catch (error) {
      console.error("Error deleting post:", error);
    }
    finally {
      setLoading(false); // End loading
      setShowModal(false); // Close modal
    }

  }

  function handleDeleteClick(id) {
    setPostToDelete(id);
    setShowModal(true);
  }

  async function LogoutFunc() {
    await axios.post("https://daily-blogger-c4jx.onrender.com/logout");
    navigate("/");
  }

  function handleBlogClick(index) {
    setCurrentPostIndex(index);
    setShowBlogModal(true);
  }

  function handlePrevBlog() {
    setCurrentPostIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : post.length - 1
    );
  }

  function handleNextBlog() {
    setCurrentPostIndex((prevIndex) =>
      prevIndex < post.length - 1 ? prevIndex + 1 : 0
    );
  }

  return (
    <div className="bg-[#e5ecf3] min-h-screen flex">
      {/* Side Navigation Bar */}
      <div className="bg-white dark:bg-gray-800 w-16 flex flex-col justify-between items-center py-4 border-r border-gray-300 dark:border-gray-700 sticky top-0 h-screen">
        {/* Logo at the top */}
        <div className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
  <a href="https://github.com/Anurag-Bharde" target="_blank" className="relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full">
    <img src={image2} alt="dev" className="rounded-full w-10 h-10" />
  </a>
</div>


        {/* Icon buttons at the bottom */}
        <div className="flex flex-col items-center gap-6 mb-6">
        <a href="">
          <button className="p-2 bg-slate-50 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full">
            <img src={a} alt="Icon 1" className=" w-6 h-6" />
          </button>
          </a>
          <a href="">
          <button className="p-2 bg-slate-50 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full">
            <img src={b} alt="Icon 2" className="w-6 h-6" />
          </button>
          </a>
          <a href="">
          <button className="p-2 bg-slate-50 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full">
            <img src={c} alt="Icon 3" className="w-6 h-6" />
          </button>
            </a>
          <a href="">
          <button className="p-2 bg-slate-50 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full">
            <img src={d} alt="Icon 4" className="w-6 h-6" />
          </button>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Navigation Bar */}
        <nav className="bg-gray-100 p-4 border-2 rounded-full mb-2 transition-all duration-200 ease-out hover:shadow-[0_0_6px_#23adff]">
          <div className="container mx-auto flex justify-between items-center">
          <h4 className="font-sans">Hello {username}</h4>
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-1 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-1 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Search
              </button>
            </form>
            <div className="flex items-center gap-4">

            
            <button
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => LogoutFunc()}
            >
              Logout
            </button>
          </div>
          </div>
        </nav>

        {/* Post a Blog Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => navigate("/PostBlog")}
            className="border-3 animate-badge-color-cycle px-16 py-4 rounded-full text-black font-serif text-xl font-medium hover:underline decoration-black-900 shadow-xl"
          >
            Post a Blog
          </button>
        </div>

        {/* Blog Cards */}
        <div className="grid max-w-2xl grid-cols-1 gap-x-5 gap-y-8 sm:mt-4 lg:mx-0 pl-12 lg:max-w-none lg:grid-cols-2">
          {filteredPosts.map((list, index) => (
            <div
              className="flex max-w-xl flex-col bg-[#d1e0ee] items-start justify-between p-4 border border-gray-300 rounded-lg hover:scale-[1.02] hover:shadow-[0_10px_10px_rgba(0,0,0,.7)] transition-transform transition-shadow duration-500 ease-in-out"
              key={list._id}
            >
              <div className="grid grid-cols-4 w-full">
                <p className="text-gray-500 col-start-1 col-end-2">
                  {formatDistance(new Date(), new Date(list.TimePost))} ago
                </p>
                <div className="flex justify-end col-start-4 space-x-2">
                  <button
                    className="border-2 border-slate-300 px-2 py-1 rounded-md hover:bg-gray-300"
                    onClick={() => navigate(`/edit/${list._id}`)}
                  >
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>              </button>
                  <button
                    className="border-2 border-slate-300 px-2 py-1 rounded-md hover:bg-gray-300"
                    onClick={() => handleDeleteClick(list._id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

                  </button>
                </div>
              </div>

              <article>
                <button
                  className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 hover:text-slate-600 hover:underline"
                  onClick={() => handleBlogClick(index)}
                >
                  {list.Title}
                </button>
                <button
                  className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 hover:underline"
                  onClick={() => handleBlogClick(index)}
                >
                  {list.Post}
                </button>
              </article>

              <div className="relative mt-8 flex items-center gap-x-4">
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    {list.user.firstName} {list.user.lastName}
                  </p>
                  <p className="text-gray-600">{list.user.profession}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <Modal
          OnClose={() => setShowModal(false)}
          OnConfirm={() => deleter(postToDelete)}
          loading={loading} // Pass loading state to Modal
        >
          <div className="text-center">
            <p>Are you sure you want to delete this post?</p>
          </div>
        </Modal>
      )}

      {showBlogModal && (
        <BlogModal
          post={post[currentPostIndex]}
          onClose={() => setShowBlogModal(false)}
          onPrev={handlePrevBlog}
          onNext={handleNextBlog}
        />
      )}
    </div>
  );
}
