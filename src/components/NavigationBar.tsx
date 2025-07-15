"use client";
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import CartIcon from './CartIcon';
import { usePathname } from 'next/navigation';

export default function NavigationBar() {
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm border-b">
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
            {isAuthenticated && (
              <CartIcon 
                className={`text-gray-700 hover:text-blue-600 ${pathname === '/cart' ? 'font-bold' : ''}`}
              />
            )}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  Welcome, {user?.firstName}!
                </span>
                <Link
                  href="/dashboard"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Account
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-red-600 flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
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