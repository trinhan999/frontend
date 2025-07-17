'use client';

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import { adminService } from '@/services/adminService';

interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  ordersToday: number;
  totalCustomers: number;
  totalProducts: number;
  lowStockProducts: number;
  recentOrders: unknown[];
}

interface ReportData {
  monthlySales: { month: string; sales: number }[];
  topProducts: { name: string; sales: number }[];
  customerGrowth: { month: string; customers: number }[];
}

export default function AdminReportsPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  useEffect(() => {
    fetchData();
  }, [selectedPeriod]);

  const fetchData = async () => {
    try {
      const dashboardStats = await adminService.getDashboardStats();
      setStats(dashboardStats);
      
      // Mock report data - in a real app, this would come from the backend
      const mockReportData: ReportData = {
        monthlySales: [
          { month: 'Jan', sales: 12500 },
          { month: 'Feb', sales: 15800 },
          { month: 'Mar', sales: 14200 },
          { month: 'Apr', sales: 18900 },
          { month: 'May', sales: 22100 },
          { month: 'Jun', sales: 19800 },
        ],
        topProducts: [
          { name: 'Intel Core i7-12700K', sales: 45 },
          { name: 'NVIDIA RTX 4070', sales: 38 },
          { name: 'Samsung 970 EVO Plus 1TB', sales: 32 },
          { name: 'Corsair Vengeance 32GB', sales: 28 },
          { name: 'ASUS ROG Strix B660-F', sales: 25 },
        ],
        customerGrowth: [
          { month: 'Jan', customers: 120 },
          { month: 'Feb', customers: 145 },
          { month: 'Mar', customers: 167 },
          { month: 'Apr', customers: 189 },
          { month: 'May', customers: 212 },
          { month: 'Jun', customers: 234 },
        ],
      };
      
      setReportData(mockReportData);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch report data';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute requiredRole="ADMIN">
        <AdminLayout>
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading reports...</div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute requiredRole="ADMIN">
        <AdminLayout>
          <div className="flex items-center justify-center h-64">
            <div className="text-red-600">Error: {error}</div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredRole="ADMIN">
      <AdminLayout>
        <div className="space-y-6">
          {/* Page header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="mt-1 text-sm text-gray-500">
                View detailed reports and analytics for your store
              </p>
            </div>
            <div className="flex items-center space-x-4  text-gray-900">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                <span className="mr-2">📊</span>
                Export Report
              </button>
            </div>
          </div>

          {/* Key metrics */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                        <span className="text-green-600 text-lg">💰</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Sales
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          ${stats.totalSales.toLocaleString()}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                        <span className="text-blue-600 text-lg">📦</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Orders
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {stats.totalOrders}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                        <span className="text-purple-600 text-lg">👥</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Customers
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {stats.totalCustomers}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-orange-100 rounded-md flex items-center justify-center">
                        <span className="text-orange-600 text-lg">🛍️</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Products
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {stats.totalProducts}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Charts and detailed reports */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Sales Chart */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Monthly Sales
                </h3>
                <div className="space-y-3">
                  {reportData?.monthlySales.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">{item.month}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(item.sales / 25000) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">${item.sales.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Top Selling Products
                </h3>
                <div className="space-y-3">
                  {reportData?.topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                        <span className="text-sm text-gray-900 truncate max-w-xs">{product.name}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{product.sales} sold</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Customer Growth */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Customer Growth
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {reportData?.customerGrowth.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{item.customers}</div>
                    <div className="text-sm text-gray-500">{item.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
} 