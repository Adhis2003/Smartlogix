// src/pages/Customers.jsx
import React from "react";
import { mockData } from "../data/mockData";
import { fmt } from "../utils/helpers";

const PLAN_BADGE = {
  Starter: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  Growth: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Pro: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  Enterprise: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

const STAT_CARDS = [
  { label: "Total Customers", val: "134", cls: "border-l-blue-400", bg: "bg-blue-50 dark:bg-blue-900/10" },
  { label: "Active This Month", val: "118", cls: "border-l-green-400", bg: "bg-green-50 dark:bg-green-900/10" },
  { label: "Enterprise Plans", val: "3", cls: "border-l-orange-400", bg: "bg-orange-50 dark:bg-orange-900/10" },
  { label: "Avg. Shipments/mo", val: "8.4", cls: "border-l-violet-400", bg: "bg-violet-50 dark:bg-violet-900/10" },
];

const Customers = () => (
  <div className="p-6 space-y-4">

    {/* Toolbar */}
    <div className="flex items-center gap-4">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 flex-1">
        {STAT_CARDS.map(({ label, val, cls, bg }) => (
          <div
            key={label}
            className={`${bg} border border-gray-200 dark:border-gray-700 border-l-4 ${cls} rounded-xl px-4 py-3`}
          >
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">{val}</div>
          </div>
        ))}
      </div>
      <button className="px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors whitespace-nowrap flex-shrink-0">
        + Add Customer
      </button>
    </div>

    {/* Table card */}
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              {["Customer", "Contact", "City", "Plan", "Shipments", "Total Value", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {mockData.customers.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">

                {/* Customer */}
                <td className="px-4 py-3">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{c.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{c.id}</div>
                </td>

                {/* Contact */}
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-700 dark:text-gray-300">{c.contact}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{c.phone}</div>
                </td>

                {/* City */}
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">{c.city}</td>

                {/* Plan */}
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${PLAN_BADGE[c.plan]}`}>
                    {c.plan}
                  </span>
                </td>

                {/* Shipments */}
                <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">{c.shipments}</td>

                {/* Total Value */}
                <td className="px-4 py-3 font-semibold text-green-600 dark:text-green-400 whitespace-nowrap">
                  ₹{fmt(c.value)}
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${c.status === "active"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${c.status === "active" ? "bg-green-500" : "bg-gray-400"}`} />
                    {c.status === "active" ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg transition-colors">
                      View
                    </button>
                    <button className="px-3 py-1.5 text-xs text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg transition-colors">
                      📱
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  </div>
);

export default Customers;