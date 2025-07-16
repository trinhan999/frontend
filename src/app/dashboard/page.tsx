'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { authService } from '@/services/authService';

export default function DashboardPage() {
  const { user, updateUser } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editForm, setEditForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Update form fields when user changes
  React.useEffect(() => {
    setEditForm({
      username: user?.username || '',
      email: user?.email || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    });
  }, [user]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (!user) throw new Error('User not found');
      const res = await authService.updateUser(user.id, editForm);
      setSuccess('Profile updated successfully!');
      setShowEditModal(false);
      if (res.data) updateUser(res.data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (!user) throw new Error('User not found');
      if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
        setError('New passwords do not match');
        setLoading(false);
        return;
      }
      await authService.changePassword(user.id, passwordForm.currentPassword, passwordForm.newPassword);
      setSuccess('Password changed successfully!');
      setShowPasswordModal(false);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to change password';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Edit Profile Modal */}
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative text-black">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={() => setShowEditModal(false)}>&times;</button>
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <input name="username" value={editForm.username} onChange={handleEditChange} className="w-full border rounded px-3 py-2" placeholder="Username" required />
                <input name="email" type="email" value={editForm.email} onChange={handleEditChange} className="w-full border rounded px-3 py-2" placeholder="Email" required />
                <input name="firstName" value={editForm.firstName} onChange={handleEditChange} className="w-full border rounded px-3 py-2" placeholder="First Name" required />
                <input name="lastName" value={editForm.lastName} onChange={handleEditChange} className="w-full border rounded px-3 py-2" placeholder="Last Name" required />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</button>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                {success && <div className="text-green-500 text-sm">{success}</div>}
              </form>
            </div>
          </div>
        )}
        {/* Change Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative text-black">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={() => setShowPasswordModal(false)}>&times;</button>
              <h2 className="text-xl font-bold mb-4 ">Change Password</h2>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <input name="currentPassword" type="password" value={passwordForm.currentPassword} onChange={handlePasswordChange} className="w-full border rounded px-3 py-2" placeholder="Current Password" required />
                <input name="newPassword" type="password" value={passwordForm.newPassword} onChange={handlePasswordChange} className="w-full border rounded px-3 py-2" placeholder="New Password" required />
                <input name="confirmNewPassword" type="password" value={passwordForm.confirmNewPassword} onChange={handlePasswordChange} className="w-full border rounded px-3 py-2" placeholder="Confirm New Password" required />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" disabled={loading}>{loading ? 'Saving...' : 'Change Password'}</button>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                {success && <div className="text-green-500 text-sm">{success}</div>}
              </form>
            </div>
          </div>
        )}
        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Account</h1>
            <div className="flex gap-4 mb-8">
              <button onClick={() => setShowEditModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Edit Profile</button>
              <button onClick={() => setShowPasswordModal(true)} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">Change Password</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* User Profile Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Profile Information
                  </h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Username</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user?.username}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {user?.firstName} {user?.lastName}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Role</dt>
                      <dd className="mt-1 text-sm text-gray-900 capitalize">{user?.role?.toLowerCase()}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Member Since</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <Link
                      href="/products"
                      className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                    >
                      Browse Products
                    </Link>
                    <Link
                      href="/cart"
                      className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                    >
                      View Cart
                    </Link>
                    <Link
                      href="/orders"
                      className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                    >
                      My Orders
                    </Link>
                    {user?.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                      >
                        Admin Panel
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Account Status Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Account Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Active</p>
                        <p className="text-sm text-gray-500">Your account is active</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Verified</p>
                        <p className="text-sm text-gray-500">Email verified</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Recent Activity
                </h3>
                <div className="text-center py-8 text-gray-500">
                  <p>No recent activity to display</p>
                  <p className="text-sm mt-2">Your recent orders and activities will appear here</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 