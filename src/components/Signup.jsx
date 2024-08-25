import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import image from './image/young man.jpeg';
import { useRecoilState } from 'recoil';
import { valuer } from '../Store/Atom';

export function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [profession, setProfession] = useState("");
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // For submission
    const [isNavigating, setIsNavigating] = useState(false); // For navigation

    const [usered, setUsered] = useRecoilState(valuer);
    const navigate = useNavigate();

    async function handleSignup(e) {
        e.preventDefault();
        setError('');
        setIsSubmitting(true); // Start submission process
        try {
            await axios.post("https://daily-blogger-c4jx.onrender.com/signup", {
                username,
                password,
                firstName,
                lastName,
                profession
            }, { withCredentials: true });

            setUsered(username);
            setIsSubmitting(false); // Stop submission process
            setIsNavigating(true); // Start navigation process
            setTimeout(() => navigate("/BlogList"), 500); // Delay navigation to show feedback
        } catch (err) {
            setIsSubmitting(false); // Stop submission process
            console.error("Signup error:", err);
            if (err.response && err.response.data) {
                setError(err.response.data.msg);
            } else {
                setError('An error occurred while signing up.');
            }
        }
    }

    return (
        <div className="flex h-screen">
            {/* Image Section */}
            <div className="w-2/6 h-full relative">
                <img src={image} alt="Signup" className="absolute inset-0 w-full h-full object-cover object-bottom" />
            </div>
            <div className="w-4/6 flex items-center justify-center min-h-screen bg-[#e5ecf3]">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    {isSubmitting ? (
                        <div className="text-center">Submitting your details, please wait...</div> // Submission indicator
                    ) : (
                        <form onSubmit={handleSignup}>
                            {/* Form fields */}
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
                            <div className="mb-4">
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
                            <div className="mb-4">
                                <label htmlFor="firstName" className="block text-gray-700 text-sm font-semibold mb-2">First Name</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    placeholder="Enter your first name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="lastName" className="block text-gray-700 text-sm font-semibold mb-2">Last Name</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    placeholder="Enter your last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="profession" className="block text-gray-700 text-sm font-semibold mb-2">Profession</label>
                                <input
                                    id="profession"
                                    type="text"
                                    placeholder="Enter your profession"
                                    value={profession}
                                    onChange={(e) => setProfession(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
            {isNavigating && <div className="overlay">Navigating, please wait...</div>} {/* Optional fallback during navigation */}
        </div>
    );
}
