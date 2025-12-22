import React, {type ReactNode} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTachometerAlt,
    faCogs,
    faUsers,
    faChartBar,
    faBars,
    faTimes,
    faChevronRight,
    faShieldAlt,
    faBell,
    faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const menuItems = [
        {
            path: '/',
            label: 'Dashboard',
            icon: faTachometerAlt,
            description: 'View activity logs and statistics',
            badge: null
        },
        {
            path: '/users',
            label: 'User Management',
            icon: faUsers,
            description: 'Manage user accounts and permissions',
            badge: '3'
        },
        {
            path: '/analytics',
            label: 'Analytics',
            icon: faChartBar,
            description: 'Detailed analytics and reports',
            badge: 'New'
        },
        {
            path: '/settings',
            label: 'Settings',
            icon: faCogs,
            description: 'Configure application settings',
            badge: null
        }
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-gray-100">
            {/* Mobile header */}
            <div className="lg:hidden bg-gray-900/90 backdrop-blur-sm border-b border-gray-800 p-4 sticky top-0 z-40">
                <div className="flex items-center justify-between">
                    <button
                        onClick={toggleMobileMenu}
                        className="p-3 rounded-xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105"
                    >
                        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="text-lg" />
                    </button>
                    <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                            <FontAwesomeIcon icon={faShieldAlt} />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                DebugDash
                            </h1>
                            <p className="text-xs text-gray-400">Admin Panel</p>
                        </div>
                    </div>
                    <button className="p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors relative">
                        <FontAwesomeIcon icon={faBell} />
                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs flex items-center justify-center animate-pulse">
                            2
                        </span>
                    </button>
                </div>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <aside className={`
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          fixed lg:sticky lg:top-0
          top-0 left-0
          h-screen lg:h-screen
          w-72 lg:w-80
          bg-gradient-to-b from-gray-900 to-gray-950
          border-r border-gray-800/50
          shadow-2xl shadow-black/30
          z-50 lg:z-0
          transition-transform duration-300 ease-out
          overflow-y-auto
          flex flex-col
        `}>
                    {/* Logo/brand */}
                    <div className="p-6 border-b border-gray-800/50">
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                                <FontAwesomeIcon icon={faShieldAlt} className="text-xl" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">
                                    DebugDash
                                </h1>
                                <p className="text-gray-400 text-sm">Professional Admin Panel</p>
                            </div>
                        </div>
                        <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-gray-800">
                            <p className="text-sm text-gray-300">Welcome back, <span className="font-semibold text-white">Admin</span></p>
                            <p className="text-xs text-gray-400 mt-1">Last login: Today, 14:30</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="p-5 flex-1">
                        <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-4 px-3">
                            Navigation
                        </p>
                        <ul className="space-y-2">
                            {menuItems.map((item) => {
                                const isActive = location.pathname === item.path ||
                                    (item.path !== '/' && location.pathname.startsWith(item.path));

                                return (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`
                        group relative flex items-center justify-between p-4 rounded-xl transition-all duration-300
                        ${isActive
                                                ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-300 border-l-2 border-blue-500 shadow-lg shadow-blue-500/10'
                                                : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:translate-x-1'
                                            }
                      `}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className={`
                            h-10 w-10 rounded-lg flex items-center justify-center transition-all duration-300
                            ${isActive
                                                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg'
                                                    : 'bg-gray-800 group-hover:bg-gray-700'
                                                }
                          `}>
                                                    <FontAwesomeIcon
                                                        icon={item.icon}
                                                        className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3">
                                                        <span className="font-medium">{item.label}</span>
                                                        {item.badge && (
                                                            <span className={`
                                    text-xs px-2 py-1 rounded-full font-semibold
                                    ${item.badge === 'New'
                                                                ? 'bg-green-500/20 text-green-300'
                                                                : 'bg-blue-500/20 text-blue-300'}
                                  `}>
                                                                {item.badge}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-400 group-hover:text-gray-300 mt-1">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                            {isActive && (
                                                <FontAwesomeIcon
                                                    icon={faChevronRight}
                                                    className="text-blue-400 animate-pulse"
                                                />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Help section */}
                        <div className="mt-10">
                            <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-4 px-3">
                                Support
                            </p>
                            <div className="space-y-2">
                                <button className="w-full flex items-center space-x-4 p-4 rounded-xl text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors group">
                                    <div className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-gray-700">
                                        <FontAwesomeIcon icon={faQuestionCircle} />
                                    </div>
                                    <span className="font-medium">Help & Documentation</span>
                                </button>
                            </div>
                        </div>
                    </nav>

                    {/* User profile & settings */}
                    <div className="p-5 border-t border-gray-800/50 bg-gradient-to-t from-gray-900/50 to-transparent">
                        <div className="flex items-center space-x-3 p-4 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-colors cursor-pointer group">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                                <span className="font-bold">A</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-white">Administrator</h3>
                                <p className="text-sm text-gray-400 group-hover:text-gray-300">admin@debugdash.com</p>
                            </div>
                            <Link
                                to="/settings"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                            >
                                <FontAwesomeIcon icon={faCogs} className="text-gray-400 hover:text-white" />
                            </Link>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                            <span>v2.1.0</span>
                            <span>© 2024 DebugDash</span>
                        </div>
                    </div>
                </aside>

                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* Main content */}
                <main className="flex-1 p-4 lg:p-6 lg:pl-8 overflow-x-hidden min-h-screen">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;