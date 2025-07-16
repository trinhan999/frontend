'use client';

import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
  color: string;
}

function StatCard({ title, value, change, changeType = 'neutral', icon, color }: StatCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 p-3 rounded-md ${color}`}>
            <span className="text-2xl">{icon}</span>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {value}
                </div>
                {change && (
                  <div className={`ml-2 flex items-baseline text-sm font-semibold ${getChangeColor()}`}>
                    {change}
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DashboardStatsProps {
  stats: {
    totalSales: number;
    totalOrders: number;
    ordersToday: number;
    totalCustomers: number;
    totalProducts: number;
    lowStockProducts: number;
  };
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: 'Total Sales',
      value: `$${stats.totalSales.toLocaleString()}`,
      change: '+12%',
      changeType: 'positive' as const,
      icon: '💰',
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      change: '+8%',
      changeType: 'positive' as const,
      icon: '📦',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Orders Today',
      value: stats.ordersToday,
      change: '+5',
      changeType: 'positive' as const,
      icon: '📅',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers.toLocaleString(),
      change: '+3%',
      changeType: 'positive' as const,
      icon: '👥',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      title: 'Total Products',
      value: stats.totalProducts.toLocaleString(),
      change: '+2',
      changeType: 'positive' as const,
      icon: '🛍️',
      color: 'bg-indigo-100 text-indigo-600',
    },
    {
      title: 'Low Stock Alerts',
      value: stats.lowStockProducts,
      change: stats.lowStockProducts > 0 ? 'Needs attention' : 'All good',
      changeType: stats.lowStockProducts > 0 ? 'negative' as const : 'positive' as const,
      icon: '⚠️',
      color: stats.lowStockProducts > 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {statCards.map((card, index) => (
        <StatCard key={index} {...card} />
      ))}
    </div>
  );
} 