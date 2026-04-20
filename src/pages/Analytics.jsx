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
  { route: "Chennai↔Coimbatore", trips: 38,  rev: 840000  },
  { route: "Chennai↔Bangalore",  trips: 52,  rev: 624000  },
  { route: "Chennai↔Mumbai",     trips: 12,  rev: 720000  },
  { route: "Hosur↔Chennai",      trips: 64,  rev: 384000  },
];

const Analytics = () => (
  <div className="page-content">
    <div className="kpi-grid">
      {[
        { label: "Fleet Utilization",    val: "76%",    sub: "↑ 4% vs last month"   },
        { label: "Trip Completion Rate", val: "96.8%",  sub: "Target: 95%"           },
        { label: "On-Time Delivery",     val: "91.2%",  sub: "↑ 2.1% improvement"   },
        { label: "Avg. Trip Revenue",    val: "₹24,800", sub: "Per completed trip"   },
        { label: "POD Upload Rate",      val: "78%",    sub: "Target: 90%"           },
        { label: "Driver Utilization",   val: "67%",    sub: "18 of 27 drivers active" },
      ].map((k) => (
        <div key={k.label} className="kpi-card">
          <div className="kpi-label">{k.label}</div>
          <div className="kpi-val">{k.val}</div>
          <div className="kpi-sub">{k.sub}</div>
        </div>
      ))}
    </div>

    <div className="grid-2">
      <div className="card">
        <div className="card-header"><div className="card-title">Monthly Revenue Trend</div></div>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mockData.revenue}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => "₹" + v / 1000 + "k"} />
              <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} formatter={(v) => "₹" + fmt(v)} />
              <Area type="monotone" dataKey="revenue" stroke="#f97316" fill="url(#revGrad)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><div className="card-title">Route Performance</div></div>
        <div className="card-body" style={{ paddingTop: 12 }}>
          {ROUTE_PERF.map((r) => (
            <div key={r.route} className="metric-row">
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600 }}>{r.route}</div>
                <div className="text-xs text-muted">{r.trips} trips</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green">₹{fmt(r.rev)}</div>
                <div className="text-xs text-muted">₹{fmt(Math.round(r.rev / r.trips))}/trip</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="grid-3">
      {mockData.drivers.slice(0, 3).map((d) => (
        <div key={d.id} className="card">
          <div className="card-header" style={{ padding: "12px 16px" }}>
            <div>
              <div className="card-title">{d.name}</div>
              <div className="text-xs text-muted">{d.id}</div>
            </div>
            <Rating val={d.rating} />
          </div>
          <div className="card-body" style={{ padding: "12px 16px" }}>
            {[
              ["Total Trips",    d.trips],
              ["On-Time Rate",   "94%"],
              ["Fuel Efficiency","8.2 km/L"],
              ["Avg. Rating",    d.rating],
            ].map(([k, v]) => (
              <div key={k} className="metric-row">
                <span className="text-xs text-muted">{k}</span>
                <span className="text-sm font-semibold">{v}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Analytics;
