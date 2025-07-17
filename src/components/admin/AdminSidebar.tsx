'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItem {
  name: string;
  href: string;
  icon: string;
}

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', href: '/admin', icon: '🏠' },
  { name: 'Products', href: '/admin/products', icon: '🛍️' },
  { name: 'Orders', href: '/admin/orders', icon: '📦' },
  { name: 'Customers', href: '/admin/customers', icon: '👥' },
  // { name: 'Payments', href: '/admin/payments', icon: '💳' },
  // { name: 'Shipping', href: '/admin/shipping', icon: '🚚' },
  // { name: 'Promotions', href: '/admin/promotions', icon: '🎯' },
  { name: 'Reports', href: '/admin/reports', icon: '📈' },
  // { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
  // { name: 'Admin Users', href: '/admin/users', icon: '🔐' },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:z-auto
      `}>
        {/* Logo */}
        <div className="flex items-center justify-center h-16 bg-gray-800 border-b border-gray-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>

        {/* Navigation */}
        <nav className="min-h-screen mt-8 flex-1">
          <div className="px-4 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                    ${isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  `}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </div>
          {/* Bottom section */}
          <div className="  p-4 border-t border-gray-700">
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-200"
            >
              <span className="mr-3">←</span>
              Back to Store
            </Link>
          </div>
        </nav>        
      </div>
    </>
  );
} 