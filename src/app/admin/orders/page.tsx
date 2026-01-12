// src/app/admin/orders/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Search, RefreshCw, Loader2, ExternalLink, Eye, X } from "lucide-react";

interface Order {
  id: string;
  amount: number;
  currency: string;
  status: string;
  email: string;
  created: string;
  metadata: Record<string, string>;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Order | null>(null);

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

  const formatPrice = (cents: number) =>
    new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(cents / 100);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const filtered = orders.filter((o) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.email.toLowerCase().includes(q) ||
      (o.metadata?.product_type || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-charcoal">Orders</h1>
          <p className="text-stone-500">{orders.length} orders from Stripe</p>
        </div>
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

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          placeholder="Search by ID, email, or product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-charcoal"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-stone-400" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-stone-500">No orders found</div>
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
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50">
                  <td className="px-6 py-4 font-mono text-sm">{order.id.slice(-8)}</td>
                  <td className="px-6 py-4 text-sm">{order.email}</td>
                  <td className="px-6 py-4 text-sm capitalize">
                    {order.metadata?.product_type?.replace(/_/g, " ") || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono">{order.metadata?.size || "N/A"}</td>
                  <td className="px-6 py-4 text-sm font-medium">{formatPrice(order.amount)}</td>
                  <td className="px-6 py-4 text-sm text-stone-500">{formatDate(order.created)}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelected(order)}
                        className="p-2 hover:bg-stone-100 rounded-lg"
                        title="View details"
                      >
                        <Eye size={18} />
                      </button>

                      <a
                        href={`https://dashboard.stripe.com/test/payments/${order.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"
                        title="View in Stripe"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Order Details</h3>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-stone-100 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <p className="text-sm text-stone-500">Payment ID</p>
                <p className="font-mono text-sm">{selected.id}</p>
              </div>

              <div>
                <p className="text-sm text-stone-500">Customer Email</p>
                <p>{selected.email}</p>
              </div>

              <div>
                <p className="text-sm text-stone-500">Amount</p>
                <p className="font-medium">{formatPrice(selected.amount)}</p>
              </div>

              <div>
                <p className="text-sm text-stone-500">Date</p>
                <p>{formatDate(selected.created)}</p>
              </div>

              <div>
                <p className="text-sm text-stone-500 mb-2">Metadata</p>
                <pre className="text-xs bg-stone-50 p-3 rounded-lg overflow-auto">
                  {JSON.stringify(selected.metadata, null, 2)}
                </pre>
              </div>
            </div>

            <div className="px-6 py-4 bg-stone-50 border-t">
              <a
                href={`https://dashboard.stripe.com/test/payments/${selected.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-2 bg-charcoal text-white rounded-lg hover:bg-stone-800"
              >
                View in Stripe Dashboard
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
