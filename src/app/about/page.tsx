"use client";

import React from "react";
import Link from 'next/link';
import { 
  Shield, 
  Truck, 
  Headphones, 
  Clock, 
  Star, 
  Users, 
  Award,
  CheckCircle,
  Package,
  Zap
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About PC Component Store
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Your trusted destination for premium PC components and exceptional service
            </p>
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-blue-200">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-blue-200">Products Sold</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">5+</div>
                <div className="text-blue-200">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At PC Component Store, we're passionate about empowering tech enthusiasts, gamers, and professionals 
                to build their dream computers. Our mission is to provide the highest quality PC components with 
                exceptional customer service and competitive prices.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Whether you're a first-time builder or a seasoned enthusiast, we're here to guide you through 
                every step of your PC building journey with expert advice and reliable products.
              </p>
              <Link 
                href="/products" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Products
                <Zap className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Us?</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Genuine products from authorized dealers</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Expert technical support</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Fast and secure shipping</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Comprehensive warranty coverage</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Competitive pricing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions for all your PC component needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Thousands of products from top brands including Intel, AMD, NVIDIA, Samsung, and more
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                All products are tested and verified to meet the highest quality standards
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Shipping</h3>
              <p className="text-gray-600">
                Quick and reliable delivery with real-time tracking and secure packaging
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600">
                24/7 customer support with knowledgeable technicians ready to help
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Categories</h2>
            <p className="text-lg text-gray-600">
              Everything you need to build the perfect PC
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Processors (CPUs)</h3>
              <p className="mb-4">High-performance CPUs from Intel and AMD for gaming, workstations, and everyday computing</p>
              <Link href="/products?category=CPU" className="text-blue-100 hover:text-white font-semibold">
                Checkout CPUs →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Graphics Cards (GPUs)</h3>
              <p className="mb-4">Powerful graphics cards for gaming, content creation, and professional applications</p>
              <Link href="/products?category=GPU" className="text-green-100 hover:text-white font-semibold">
                Checkout GPUs →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Memory (RAM)</h3>
              <p className="mb-4">High-speed DDR4 and DDR5 memory modules for optimal system performance</p>
              <Link href="/products?category=RAM" className="text-purple-100 hover:text-white font-semibold">
                Checkout RAM →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Storage (SSDs/HDDs)</h3>
              <p className="mb-4">Fast NVMe SSDs and reliable hard drives for all your storage needs</p>
              <Link href="/products?category=Storage" className="text-red-100 hover:text-white font-semibold">
                Checkout Storage →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Motherboards</h3>
              <p className="mb-4">Feature-rich motherboards with the latest connectivity and expansion options</p>
              <Link href="/products?category=Motherboard" className="text-yellow-100 hover:text-white font-semibold">
                Checkout Motherboards →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Power Supplies</h3>
              <p className="mb-4">Reliable and efficient power supplies to keep your system running smoothly</p>
              <Link href="/products?category=Power Supply" className="text-indigo-100 hover:text-white font-semibold">
                Checkout PSUs →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-gray-300">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-gray-300">Support Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">48hr</div>
              <div className="text-gray-300">Average Delivery</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">3yr</div>
              <div className="text-gray-300">Warranty Coverage</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Dream PC?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their PC component needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Shopping
            </Link>
            <Link 
              href="/register" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 