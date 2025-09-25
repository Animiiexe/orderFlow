"use client";

import { Package, Settings } from "lucide-react";
import OrderForm from "../components/OrderForm";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Package className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">OrderFlow</span>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
              >
                <Settings className="w-4 h-4" />
                Admin Orders
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <OrderForm />
    </div>
  );
}
