// src/pages/Billing.jsx
import React from "react";
import { mockData } from "../data/mockData";
import { fmt } from "../utils/helpers";

const PLAN_BADGE = {
  Starter: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  Growth: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Pro: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  Enterprise: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

const PLAN_BAR = {
  Starter: "bg-gray-400",
  Growth: "bg-blue-500",
  Pro: "bg-violet-500",
  Enterprise: "bg-orange-500",
};

const STAT_CARDS = [
  { label: "MRR (Subscriptions)", val: "₹1,34,280", cls: "border-l-green-400", bg: "bg-green-50 dark:bg-green-900/10" },
  { label: "Outstanding Invoices", val: "₹71,390", cls: "border-l-red-400", bg: "bg-red-50 dark:bg-red-900/10" },
  { label: "Collected This Month", val: "₹2,84,500", cls: "border-l-blue-400", bg: "bg-blue-50 dark:bg-blue-900/10" },
  { label: "Marketplace Revenue", val: "₹12,450", cls: "border-l-orange-400", bg: "bg-orange-50 dark:bg-orange-900/10" },
];

const INVOICES = [
  { id: "INV-1201", customer: "Reliance Retail", trip: "TRIP-2400", amount: 52000, gst: 9360, total: 61360, due: "27 Jan 2025", status: "unpaid" },
  { id: "INV-1200", customer: "ABC Textiles Ltd", trip: "TRIP-2399", amount: 22000, gst: 3960, total: 25960, due: "25 Jan 2025", status: "paid" },
  { id: "INV-1199", customer: "TVS Motors", trip: "TRIP-2397", amount: 12000, gst: 2160, total: 14160, due: "24 Jan 2025", status: "paid" },
  { id: "INV-1198", customer: "HUL", trip: "TRIP-2398", amount: 8500, gst: 1530, total: 10030, due: "27 Jan 2025", status: "unpaid" },
];

const Billing = () => (
  <div className="p-6 space-y-4">

    {/* Stat cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {STAT_CARDS.map(({ label, val, cls, bg }) => (
        <div
          key={label}
          className={`${bg} border border-gray-200 dark:border-gray-700 border-l-4 ${cls} rounded-xl px-4 py-3`}
        >
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</div>
          <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">{val}</div>
        </div>
      ))}
    </div>

    {/* Main grid */}
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">

      {/* Invoices table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">Recent Invoices</span>
          <button className="px-3 py-1.5 text-xs font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors">
            + Generate Invoice
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                {["Invoice", "Customer", "Trip", "Base", "GST", "Total", "Due Date", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {INVOICES.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-violet-600 dark:text-violet-400 whitespace-nowrap">{inv.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap">{inv.customer}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{inv.trip}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">₹{fmt(inv.amount)}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">₹{fmt(inv.gst)}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap">₹{fmt(inv.total)}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{inv.due}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${inv.status === "paid"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${inv.status === "paid" ? "bg-green-500" : "bg-yellow-500"}`} />
                      {inv.status === "paid" ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subscription plans */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">Subscription Plans</span>
        </div>
        <div className="p-4 space-y-4">
          {mockData.plans.map((p) => (
            <div
              key={p.name}
              className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3"
            >
              {/* Plan name + price */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-gray-900 dark:text-white tracking-wide">{p.name}</span>
                <span className="font-semibold text-violet-600 dark:text-violet-400 text-sm">
                  ₹{fmt(p.price)}
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">/mo</span>
                </span>
              </div>
              {/* Trucks + customer count badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">{p.trucks}</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${PLAN_BADGE[p.name]}`}>
                  {p.customers} customers
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${PLAN_BAR[p.name]}`}
                  style={{ width: `${(p.customers / 134) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
);

export default Billing;