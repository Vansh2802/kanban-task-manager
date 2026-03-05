import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/dashboard" className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-900/50 group-hover:bg-violet-500 transition-colors duration-200">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold gradient-text">TaskFlow</span>
                    </Link>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2">
                            <div className="w-8 h-8 bg-violet-700 rounded-full flex items-center justify-center text-sm font-semibold text-white">
                                {user?.name?.[0]?.toUpperCase()}
                            </div>
                            <span className="text-slate-300 text-sm font-medium">{user?.name}</span>
                        </div>
                        <button
                            id="logout-btn"
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-slate-400 hover:text-red-400 text-sm font-medium transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-red-500/10"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
