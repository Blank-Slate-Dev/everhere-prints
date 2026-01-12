// src/app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, DollarSign, RefreshCw, Loader2, ExternalLink } from "lucide-react";

interface Order {
  id: string;
  amount: number;
  currency: string;
  status: string;
  email: string;
  created: string;
  metadata: Record<string, string>;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data?.error) {
        setError(data.error);
      } else {
        setOrders(data?.orders || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);

  const formatPrice = (cents: number) =>
    new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(cents / 100);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-charcoal">Dashboard</h1>
        <button
          onClick={fetchOrders}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-charcoal text-white rounded-lg hover:bg-stone-800 disabled:opacity-50"
        >
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg">{error}</div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 border border-stone-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{orders.length}</p>
              <p className="text-sm text-stone-500">Total Orders</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-stone-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatPrice(totalRevenue)}</p>
              <p className="text-sm text-stone-500">Total Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200 flex justify-between items-center">
          <h2 className="font-semibold">Orders from Stripe</h2>
          <Link href="/admin/orders" className="text-sm text-blue-600 hover:underline">
            View all →
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-stone-400" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 text-stone-500">No orders yet</div>
        ) : (
          <table className="w-full">
            <thead className="bg-stone-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">
                  Stripe
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {orders.slice(0, 10).map((order) => (
                <tr key={order.id} className="hover:bg-stone-50">
                  <td className="px-6 py-4 font-mono text-sm">{order.id.slice(-8)}</td>
                  <td className="px-6 py-4 text-sm">{order.email}</td>
                  <td className="px-6 py-4 text-sm capitalize">
                    {order.metadata?.product_type?.replace(/_/g, " ") || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{formatPrice(order.amount)}</td>
                  <td className="px-6 py-4 text-sm text-stone-500">{formatDate(order.created)}</td>
                  <td className="px-6 py-4">
                    <a
                      href={`https://dashboard.stripe.com/test/payments/${order.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                      title="View in Stripe"
                    >
                      <ExternalLink size={14} />
                      <span className="text-sm">Open</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
