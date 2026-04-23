// src/pages/Analytics.jsx
import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Truck, CheckCircle2, Clock, IndianRupee,
  FileCheck, Users, TrendingUp, Route,
  Star, Gauge, Timer, Fuel,
} from "lucide-react";
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
  { label: "Fleet Utilization",    val: "76%",     sub: "↑ 4% vs last month",        icon: Truck        },
  { label: "Trip Completion Rate", val: "96.8%",   sub: "Target: 95%",               icon: CheckCircle2 },
  { label: "On-Time Delivery",     val: "91.2%",   sub: "↑ 2.1% improvement",        icon: Clock        },
  { label: "Avg. Trip Revenue",    val: "₹24,800", sub: "Per completed trip",        icon: IndianRupee  },
  { label: "POD Upload Rate",      val: "78%",     sub: "Target: 90%",               icon: FileCheck    },
  { label: "Driver Utilization",   val: "67%",     sub: "18 of 27 drivers active",   icon: Users        },
];

const DRIVER_STATS = [
  { key: "Total Trips",      icon: Route },
  { key: "On-Time Rate",     icon: Timer },
  { key: "Fuel Efficiency",  icon: Fuel  },
  { key: "Avg. Rating",      icon: Star  },
];

const DRIVER_VALS = {
  "On-Time Rate":    "94%",
  "Fuel Efficiency": "8.2 km/L",
};

const BG       = "bg-[#131c2e]";
const BORDER   = "border-[#1e2d45]";
const TEXT_PRI = "text-[#e2e8f0]";
const TEXT_MUT = "text-[#4a6080]";
const TEXT_SUB = "text-[#3a5070]";
const DIVIDE   = "divide-[#1e2d45]";

const Card = ({ children, className = "" }) => (
  <div className={`${BG} border ${BORDER} rounded-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`flex items-center justify-between px-4 py-3 border-b ${BORDER} ${className}`}>
    {children}
  </div>
);

const Analytics = () => (
  <div className="p-6 space-y-4">

    {/* KPI grid */}
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
      {KPI_CARDS.map(({ label, val, sub, icon: Icon }) => (
        <div
          key={label}
          className={`${BG} border ${BORDER} rounded-xl px-4 py-3 hover:border-violet-800 transition-colors`}
        >
          <div className={`flex items-center gap-1.5 text-xs ${TEXT_MUT} font-medium mb-1`}>
            <Icon size={13} className="shrink-0 text-violet-500" />
            {label}
          </div>
          <div className={`text-xl font-bold ${TEXT_PRI}`}>{val}</div>
          <div className={`text-xs ${TEXT_SUB} mt-0.5`}>{sub}</div>
        </div>
      ))}
    </div>

    {/* Charts row */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

      {/* Revenue trend */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp size={15} className="text-orange-400" />
            <span className={`text-sm font-semibold ${TEXT_PRI}`}>Monthly Revenue Trend</span>
          </div>
        </CardHeader>
        <div className="p-4">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mockData.revenue}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f97316" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
              <XAxis dataKey="month" tick={{ fill: "#4a6080", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis  tick={{ fill: "#4a6080", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => "₹" + v / 1000 + "k"} />
              <Tooltip
                contentStyle={{ background: "#131c2e", border: "1px solid #1e2d45", borderRadius: 8, fontSize: 12, color: "#e2e8f0" }}
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
          <div className="flex items-center gap-2">
            <Route size={15} className="text-blue-400" />
            <span className={`text-sm font-semibold ${TEXT_PRI}`}>Route Performance</span>
          </div>
        </CardHeader>
        <div className={`divide-y ${DIVIDE}`}>
          {ROUTE_PERF.map((r) => (
            <div key={r.route} className="flex items-center justify-between px-4 py-3">
              <div>
                <div className={`text-sm font-semibold ${TEXT_PRI}`}>{r.route}</div>
                <div className={`text-xs ${TEXT_MUT}`}>{r.trips} trips</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-emerald-400">₹{fmt(r.rev)}</div>
                <div className={`text-xs ${TEXT_MUT}`}>₹{fmt(Math.round(r.rev / r.trips))}/trip</div>
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
            <div className="flex items-center gap-2">
              <Gauge size={14} className="text-violet-400 shrink-0" />
              <div>
                <div className={`text-sm font-semibold ${TEXT_PRI}`}>{d.name}</div>
                <div className={`text-xs ${TEXT_MUT}`}>{d.id}</div>
              </div>
            </div>
            <Rating val={d.rating} />
          </CardHeader>
          <div className={`divide-y ${DIVIDE}`}>
            {DRIVER_STATS.map(({ key, icon: StatIcon }) => {
              const val = key === "Total Trips"  ? d.trips
                        : key === "Avg. Rating"  ? d.rating
                        : DRIVER_VALS[key];
              return (
                <div key={key} className="flex items-center justify-between px-4 py-2.5">
                  <span className={`flex items-center gap-1.5 text-xs ${TEXT_MUT}`}>
                    <StatIcon size={12} className="shrink-0" />
                    {key}
                  </span>
                  <span className={`text-sm font-semibold ${TEXT_PRI}`}>{val}</span>
                </div>
              );
            })}
          </div>
        </Card>
      ))}
    </div>

  </div>
);

export default Analytics;