import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSignInAlt, faEnvelope, faLock, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import {useAuth} from "../contexts/AuthContext.tsx";

export function LoginPage() {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            return;
        }

        setLoading(true);
        try {
            await signIn(formData.email, formData.password);
            navigate('/');
        } catch (error: any) {
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <>Wait for loading...</>
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-md min-h-screen">
            <div className="mb-8">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400
                     hover:text-primary-700 dark:hover:text-primary-300
                     font-medium transition-colors duration-300 group font-sans"
                >
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300"
                    />
                    Back to home
                </Link>
            </div>

            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FontAwesomeIcon icon={faUserCircle} className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 font-serif mb-3">
                    Welcome Back
                </h1>
                <p className="text-gray-600 dark:text-gray-400 font-sans">
                    Sign in to continue your journey
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-gray-100 dark:border-gray-700">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-sans">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-colors duration-300 font-sans"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-sans">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FontAwesomeIcon icon={faLock} className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-colors duration-300 font-sans"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600
                                 hover:from-pink-600 hover:to-purple-700
                                 text-white font-semibold py-3 px-6 rounded-xl
                                 transition-all duration-300 shadow-md hover:shadow-xl
                                 transform hover:-translate-y-0.5
                                 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                                 font-sans flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faSignInAlt} className="w-4 h-4" />
                                Sign In
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400 font-sans">
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="text-pink-600 hover:text-pink-700 font-medium transition-colors"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

            <div className="text-center mt-8">
                <Link
                    to="/"
                    className="bg-gradient-to-r from-primary-500 to-primary-600
                     hover:from-primary-600 hover:to-primary-700
                     text-white font-semibold py-3 px-8 rounded-xl
                     transition-all duration-300 shadow-md hover:shadow-xl
                     transform hover:-translate-y-1 font-sans
                     inline-flex items-center gap-2"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
}

export default LoginPage;