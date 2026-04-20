// src/pages/Analytics.jsx
import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import { mockData } from "../data/mockData";
import { fmt } from "../utils/helpers";
import { Rating } from "../Components/ui/StatusBadge";

const ROUTE_PERF = [
  { route: "Chennai↔Coimbatore", trips: 38, rev: 840000 },
  { route: "Chennai↔Bangalore", trips: 52, rev: 624000 },
  { route: "Chennai↔Mumbai", trips: 12, rev: 720000 },
  { route: "Hosur↔Chennai", trips: 64, rev: 384000 },
];

const KPI_CARDS = [
  { label: "Fleet Utilization", val: "76%", sub: "↑ 4% vs last month" },
  { label: "Trip Completion Rate", val: "96.8%", sub: "Target: 95%" },
  { label: "On-Time Delivery", val: "91.2%", sub: "↑ 2.1% improvement" },
  { label: "Avg. Trip Revenue", val: "₹24,800", sub: "Per completed trip" },
  { label: "POD Upload Rate", val: "78%", sub: "Target: 90%" },
  { label: "Driver Utilization", val: "67%", sub: "18 of 27 drivers active" },
];

const Card = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

const Analytics = () => (
  <div className="p-6 space-y-4">

    {/* KPI grid */}
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
      {KPI_CARDS.map(({ label, val, sub }) => (
        <div
          key={label}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 hover:border-violet-300 dark:hover:border-violet-700 transition-colors"
        >
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">{label}</div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">{val}</div>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{sub}</div>
        </div>
      ))}
    </div>

    {/* Charts row */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

      {/* Revenue trend */}
      <Card>
        <CardHeader>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">Monthly Revenue Trend</span>
        </CardHeader>
        <div className="p-4">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mockData.revenue}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => "₹" + v / 1000 + "k"} />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 12 }}
                formatter={(v) => "₹" + fmt(v)}
              />
              <Area type="monotone" dataKey="revenue" stroke="#f97316" fill="url(#revGrad)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Route performance */}
      <Card>
        <CardHeader>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">Route Performance</span>
        </CardHeader>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {ROUTE_PERF.map((r) => (
            <div key={r.route} className="flex items-center justify-between px-4 py-3">
              <div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">{r.route}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{r.trips} trips</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600 dark:text-green-400">₹{fmt(r.rev)}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">₹{fmt(Math.round(r.rev / r.trips))}/trip</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>

    {/* Top driver cards */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {mockData.drivers.slice(0, 3).map((d) => (
        <Card key={d.id}>
          <CardHeader className="px-4 py-3">
            <div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">{d.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{d.id}</div>
            </div>
            <Rating val={d.rating} />
          </CardHeader>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {[
              ["Total Trips", d.trips],
              ["On-Time Rate", "94%"],
              ["Fuel Efficiency", "8.2 km/L"],
              ["Avg. Rating", d.rating],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between px-4 py-2.5">
                <span className="text-xs text-gray-500 dark:text-gray-400">{k}</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{v}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>

  </div>
);

export default Analytics;