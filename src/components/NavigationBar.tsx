"use client";
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import CartIcon from './CartIcon';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

export default function NavigationBar() {
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="bg-white shadow-sm ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            PC Component Store
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href="/products"
              className={`text-gray-700 hover:text-blue-600 ${pathname === '/products' ? 'font-bold' : ''}`}
            >
              Products
            </Link>
            <Link
              href="/about"
              className={`text-gray-700 hover:text-blue-600 ${pathname === '/about' ? 'font-bold' : ''}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-gray-700 hover:text-blue-600 ${pathname === '/contact' ? 'font-bold' : ''}`}
            >
              Contact
            </Link>
            {isAuthenticated && (
              <CartIcon 
                className={`text-gray-700 hover:text-blue-600 ${pathname === '/cart' ? 'font-bold' : ''}`}
              />
            )}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
                <button
                  className="text-gray-700 hover:text-blue-600 focus:outline-none flex items-center gap-1"
                  onClick={() => setDropdownOpen((open) => !open)}
                >
                  Welcome, {user?.firstName}!
                  <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute top-10 right-4 mt-2 w-40 bg-white border rounded-md shadow-lg z-20">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Account
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Orders
                    </Link>
                    {user?.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        onClick={() => setDropdownOpen(false)}
                      >
                      Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => { logout(); setDropdownOpen(false); }}
                      className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-1"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 