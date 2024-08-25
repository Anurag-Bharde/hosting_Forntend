import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import image from './image/GirlStudy.jpeg'
import { useRecoilState } from 'recoil';
import { valuer } from '../Store/Atom';

function Signin() {
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [usered,setUsered]=useRecoilState(valuer)
    const navigate=useNavigate()
  return (
    <div className="flex h-screen">
      {/* Image Section */}
      <div className="w-2/6 h-full relative">
      <img src={image} alt="Signup" className="absolute inset-0 w-full h-full object-cover object-bottom"></img>
        {/* Optionally, you can add some overlay or text here */}
      </div>
    <div className="w-4/6 flex items-center justify-center min-h-screen bg-[#e5ecf3]">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

      <form>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="button"
          onClick={async () => {
            try {
              await axios.post(`${BACKEND_URL}signin`, {
                username,
                password,
              }, {
                withCredentials: true,
              });
               setUsered(username);
              alert("You are logged in");
              navigate("BlogList");
            } catch (error) {
              console.error("Sign in error:", error);
              alert("Sign in failed");
            }
          }}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Sign In
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Don't have an account?{' '}
        <button
          onClick={async() =>{
           
            navigate("/SignUp")}
          }
          className="text-indigo-600 font-semibold hover:underline"
        >
          Sign Up
        </button>
      </p>
    </div>
  </div>
  </div>
  )
}

export default Signin
