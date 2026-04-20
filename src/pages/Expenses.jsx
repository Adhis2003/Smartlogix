// src/pages/Expenses.jsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { mockData } from "../data/mockData";
import { fmt } from "../utils/helpers";

const TYPE_ICON = { fuel: "⛽", toll: "🛣️", maintenance: "🔧" };
const TYPE_BADGE = {
  fuel: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  toll: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  maintenance: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const expByType = [
  { type: "Fuel", amount: 9800 },
  { type: "Toll", amount: 1300 },
  { type: "Maintenance", amount: 1800 },
];

const STAT_CARDS = [
  { label: "Total Expenses (Trip)", val: "₹12,900", icon: "💸", cls: "border-l-orange-400", bg: "bg-orange-50 dark:bg-orange-900/10" },
  { label: "Fuel Costs", val: "₹9,800", icon: "⛽", cls: "border-l-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-900/10" },
  { label: "Toll Charges", val: "₹1,300", icon: "🛣️", cls: "border-l-blue-400", bg: "bg-blue-50 dark:bg-blue-900/10" },
  { label: "Maintenance", val: "₹1,800", icon: "🔧", cls: "border-l-red-400", bg: "bg-red-50 dark:bg-red-900/10" },
];

const Card = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-700">
    {children}
  </div>
);

const Expenses = () => (
  <div className="p-6 space-y-4">

    {/* Stat cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {STAT_CARDS.map(({ label, val, icon, cls, bg }) => (
        <div
          key={label}
          className={`relative ${bg} border border-gray-200 dark:border-gray-700 border-l-4 ${cls} rounded-xl p-4 overflow-hidden`}
        >
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">{label}</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{val}</div>
          <div className="absolute right-4 top-4 text-2xl opacity-40">{icon}</div>
        </div>
      ))}
    </div>

    {/* Charts + Pending row */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

      {/* Bar chart */}
      <Card>
        <CardHeader>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">Expense Breakdown</span>
        </CardHeader>
        <div className="p-5">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={expByType} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="type" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => "₹" + v / 1000 + "k"} />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 12 }}
                formatter={(v) => "₹" + fmt(v)}
              />
              <Bar dataKey="amount" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Pending verifications */}
      <Card>
        <CardHeader>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">Pending Verifications</span>
        </CardHeader>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {mockData.expenses.filter((e) => !e.verified).map((e) => (
            <div key={e.id} className="flex items-center gap-3 px-5 py-3">
              <span className="text-xl">{TYPE_ICON[e.type]}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">{e.desc}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{e.driver} · {e.trip}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-semibold text-violet-600 dark:text-violet-400">₹{fmt(e.amount)}</div>
                <div className="flex gap-1 mt-1 justify-end">
                  <button className="px-2 py-0.5 text-xs font-medium text-white bg-green-500 hover:bg-green-600 rounded transition-colors">✓</button>
                  <button className="px-2 py-0.5 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded transition-colors">✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>

    {/* All Expenses table */}
    <Card>
      <CardHeader>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">All Expenses</span>
        <button className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
          Export CSV
        </button>
      </CardHeader>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              {["Expense ID", "Trip", "Driver", "Type", "Description", "Amount", "Date", "Status"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {mockData.expenses.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-4 py-3 font-semibold text-violet-600 dark:text-violet-400 whitespace-nowrap">{e.id}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">{e.trip}</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{e.driver}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${TYPE_BADGE[e.type]}`}>
                    {TYPE_ICON[e.type]} {e.type.charAt(0).toUpperCase() + e.type.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{e.desc}</td>
                <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap">₹{fmt(e.amount)}</td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{e.date}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${e.verified
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${e.verified ? "bg-green-500" : "bg-yellow-500"}`} />
                    {e.verified ? "Verified" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>

  </div>
);

export default Expenses;