"use client";

import React, { useEffect, useState, Suspense } from "react";
import { productService, Product, ProductFilters } from "@/services/productService";
import { Filter } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useSearchParams } from 'next/navigation';
import toast from "react-hot-toast";
import ProductCard from "@/components/ProductCard";

function ProductsPageContent() {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  // Initialize filters with category from URL
  const [filters, setFilters] = useState<ProductFilters>({ category: initialCategory, page: 0, size: 12 });
  const [appliedFilters, setAppliedFilters] = useState<ProductFilters>({ category: initialCategory, page: 0, size: 12 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    productService.getCategories().then(setCategories);
    productService.getBrands().then(setBrands);
  }, []);

  useEffect(() => {
    setLoading(true);
    productService.getProducts(appliedFilters).then((data) => {
      setProducts(data.content);
      setTotalPages(data.totalPages);
      setPage(data.number);
      setLoading(false);
    });
  }, [appliedFilters]);

  useEffect(() => {
    const category = searchParams.get('category') || '';
    if (category !== filters.category) {
      setFilters(f => ({ ...f, category, page: 0 }));
      setAppliedFilters(f => ({ ...f, category, page: 0 }));
    }
    // You can add similar logic for other filters if needed
    // eslint-disable-next-line
  }, [searchParams]);

  const handleFilterChange = (key: keyof ProductFilters, value: string | number | undefined) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 0 }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters, page: 0 });
  };

  const handleAddToCart = async (productId: number) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }
    
    try {
        await addToCart({ productId, quantity: 1 });
        toast.success('Item added to cart successfully!');
    } catch (error) {
        console.error('Error adding to cart:', error);
        toast.error('Failed to add item to cart');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Filters */}
            <aside className="bg-white p-6 rounded-lg shadow space-y-6">
              <div>
                <h2 className="font-semibold mb-2 text-black">Category</h2>
                <select
                  className="w-full border rounded p-2 text-gray-600"
                  value={filters.category || ""}
                  onChange={e => handleFilterChange("category", e.target.value)}
                >
                  <option value="">All</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <h2 className="font-semibold mb-2 text-black">Brand</h2>
                <select
                  className="w-full border rounded p-2 text-gray-600"
                  value={filters.brand || ""}
                  onChange={e => handleFilterChange("brand", e.target.value)}
                >
                  <option value="">All</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              <div>
                <h2 className="font-semibold mb-2 text-black">Price</h2>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    className="w-20 border rounded p-1 text-gray-600"
                    value={filters.minPrice ?? ""}
                    min={0}
                    max={filters.maxPrice ?? 10000}
                    placeholder="Min"
                    onChange={e => handleFilterChange("minPrice", e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    className="w-20 border rounded p-1 text-gray-600"
                    value={filters.maxPrice ?? ""}
                    min={filters.minPrice ?? 0}
                    max={10000}
                    placeholder="Max"
                    onChange={e => handleFilterChange("maxPrice", e.target.value ? Number(e.target.value) : undefined)}
                  />
                </div>
              </div>
              <div>
                <h2 className="font-semibold mb-2 text-black">Rating</h2>
                <select
                  className="w-full border rounded p-2 text-gray-600"
                  value={filters.minRating || 0}
                  onChange={e => handleFilterChange("minRating", Number(e.target.value))}
                >
                  <option value={0}>All</option>
                  {[5,4,3,2,1].map(r => (
                    <option key={r} value={r}>{r} stars & up</option>
                  ))}
                </select>
              </div>
              <button 
                onClick={handleApplyFilters}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Apply Filters</span>
              </button>
            </aside>
            {/* Product List */}
            <section className="md:col-span-3">
              {loading ? (
                <div className="text-center text-gray-500 py-16">Loading...</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500 py-16">
                      No products found.
                    </div>
                  ) : (
                    products.map(product => (
                      <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                    ))
                  )}
                </div>
              )}
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1 rounded ${i === page ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-600"}`}
                      onClick={() => setAppliedFilters(f => ({ ...f, page: i }))}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
} 