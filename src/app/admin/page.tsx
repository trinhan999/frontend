'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function AdminPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute requiredRole="ADMIN">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <Link
                href="/dashboard"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Welcome to Admin Panel
                </h3>
                <p className="text-gray-600 mb-6">
                  You are logged in as an administrator. Here you can manage products, users, and orders.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Manage Products */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="text-lg font-medium text-blue-900 mb-2">Manage Products</h4>
                    <p className="text-blue-700 mb-4">Add, edit, or remove products from the store.</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                      Manage Products
                    </button>
                  </div>

                  {/* Manage Users */}
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="text-lg font-medium text-green-900 mb-2">Manage Users</h4>
                    <p className="text-green-700 mb-4">View and manage user accounts and permissions.</p>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                      Manage Users
                    </button>
                  </div>

                  {/* Manage Orders */}
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="text-lg font-medium text-purple-900 mb-2">Manage Orders</h4>
                    <p className="text-purple-700 mb-4">Process and track customer orders.</p>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700">
                      Manage Orders
                    </button>
                  </div>

                  {/* Analytics */}
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h4 className="text-lg font-medium text-orange-900 mb-2">Analytics</h4>
                    <p className="text-orange-700 mb-4">View sales reports and analytics.</p>
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700">
                      View Analytics
                    </button>
                  </div>

                  {/* Settings */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Settings</h4>
                    <p className="text-gray-700 mb-4">Configure store settings and preferences.</p>
                    <button className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                      Settings
                    </button>
                  </div>

                  {/* System Status */}
                  <div className="bg-red-50 p-6 rounded-lg">
                    <h4 className="text-lg font-medium text-red-900 mb-2">System Status</h4>
                    <p className="text-red-700 mb-4">Monitor system health and performance.</p>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700">
                      System Status
                    </button>
                  </div>
                </div>

                {/* Admin Info */}
                <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Admin Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Admin Name</p>
                      <p className="text-gray-900">{user?.firstName} {user?.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-gray-900">{user?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Role</p>
                      <p className="text-gray-900 capitalize">{user?.role?.toLowerCase()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Last Login</p>
                      <p className="text-gray-900">Just now</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 