// src/pages/Dashboard.jsx
import React from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { mockData } from "../data/mockData";
import { fmt } from "../utils/helpers";
import { StatusBadge } from "../Components/ui/StatusBadge";

const Dashboard = () => {
  const s = mockData.stats;

  return (
    <div className="page-content">
      {/* Live bar */}
      <div
        className="flex items-center gap-3 mb-4"
        style={{ padding: "10px 16px", background: "var(--green-dim)", border: "1px solid #10b98130", borderRadius: 10 }}
      >
        <span className="live-dot"></span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--green)" }}>Live Dashboard</span>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
          — {s.activeTrips} trips in progress · {s.driversOnline} drivers online · Last updated just now
        </span>
        <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--text-muted)" }}>
          Jan 20, 2025 · 09:42 AM IST
        </span>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        {[
          { label: "Active Trips",       val: s.activeTrips,               icon: "🚛", change: "+2 from yesterday",    up: true,  cls: "orange" },
          { label: "Drivers Online",     val: s.driversOnline,             icon: "👤", change: "+5 from last week",    up: true,  cls: "green"  },
          { label: "Monthly Revenue",    val: "₹" + fmt(s.monthlyRevenue), icon: "₹",  change: "+14% vs last month",   up: true,  cls: "blue"   },
          { label: "Fleet Utilization",  val: s.fleetUtilization + "%",    icon: "⚡", change: "-3% vs last week",     up: false, cls: "purple" },
          { label: "Total Trucks",       val: s.totalTrucks,               icon: "🏗", change: "2 in maintenance",      up: false, cls: "yellow" },
          { label: "Pending POD",        val: s.pendingPOD,                icon: "📄", change: "Needs attention",       up: false, cls: "orange" },
          { label: "Total Customers",    val: s.totalCustomers,            icon: "🤝", change: "+8 this month",         up: true,  cls: "green"  },
          { label: "Total Revenue",      val: "₹" + fmt(s.totalRevenue),   icon: "💰", change: "All time",              up: true,  cls: "blue"   },
        ].map(({ label, val, icon, change, up, cls }) => (
          <div key={label} className={`stat-card ${cls}`}>
            <div className="stat-label">{label}</div>
            <div className="stat-value">{val}</div>
            <div className={`stat-change ${up ? "up" : "down"}`}>
              {up ? "↑" : "↓"} {change}
            </div>
            <div className="stat-icon">{icon}</div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid-3-2">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Revenue & Profit Trend</div>
              <div className="card-subtitle">Last 6 months (INR)</div>
            </div>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={mockData.revenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => "₹" + v / 1000 + "k"} />
                <Tooltip
                  contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                  formatter={(v, n) => ["₹" + fmt(v), n.charAt(0).toUpperCase() + n.slice(1)]}
                />
                <Line type="monotone" dataKey="revenue"  stroke="#f97316" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="profit"   stroke="#10b981" strokeWidth={2.5} dot={false} strokeDasharray="4 4" />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={1.5} dot={false} strokeDasharray="2 2" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2" style={{ justifyContent: "center" }}>
              {[["#f97316","Revenue"],["#10b981","Profit"],["#ef4444","Expenses"]].map(([c, l]) => (
                <span key={l} className="flex items-center gap-2 text-xs text-muted">
                  <span style={{ width: 12, height: 3, background: c, borderRadius: 2, display: "inline-block" }}></span>
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">Fleet Status</div></div>
          <div className="card-body" style={{ paddingTop: 10 }}>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={mockData.fleetPie} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {mockData.fleetPie.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            {mockData.fleetPie.map((e) => (
              <div key={e.name} className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                <div className="flex items-center gap-2">
                  <span style={{ width: 10, height: 10, background: e.color, borderRadius: "50%", display: "inline-block" }}></span>
                  <span className="text-sm text-secondary">{e.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="progress-bar" style={{ width: 80 }}>
                    <div className="progress-fill" style={{ width: (e.value / 47 * 100) + "%", background: e.color }}></div>
                  </div>
                  <span className="text-sm font-semibold">{e.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 + Live Trips */}
      <div className="grid-2-1">
        <div className="card">
          <div className="card-header"><div className="card-title">Trip Volume — This Week</div></div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={mockData.tripVolume} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} cursor={{ fill: "var(--border)" }} />
                <Bar dataKey="trips" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card" style={{ overflow: "hidden" }}>
          <div className="card-header">
            <div className="card-title">Live Trips</div>
            <span className="badge blue">{s.activeTrips} Active</span>
          </div>
          <div style={{ overflowY: "auto", maxHeight: 260 }}>
            {mockData.trips.filter((t) => t.status === "in_progress").map((t) => (
              <div key={t.id} className="trip-item">
                <div className="trip-route">
                  <span className="trip-city" style={{ fontSize: 12, fontWeight: 700 }}>{t.from}</span>
                  <span className="trip-arrow">→</span>
                  <span className="trip-city" style={{ fontSize: 12, fontWeight: 700 }}>{t.to}</span>
                </div>
                <div className="trip-meta">
                  <span>🚛 {t.truck}</span>
                  <span>👤 {t.driver}</span>
                  <span>📏 {t.dist}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted">ETA: {t.eta}</span>
                  <span className="text-xs text-accent font-semibold">₹{fmt(t.freight)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Subscription Plans</div>
            <span className="text-sm text-accent font-semibold">134 paying</span>
          </div>
          <div className="card-body" style={{ paddingTop: 12 }}>
            {mockData.plans.map((p) => (
              <div key={p.name} className="metric-row">
                <div>
                  <div className="font-semibold" style={{ fontSize: 13 }}>{p.name}</div>
                  <div className="text-xs text-muted">{p.trucks} · ₹{fmt(p.price)}/mo</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="progress-bar" style={{ width: 80 }}>
                    <div className="progress-fill" style={{ width: (p.customers / 134 * 100) + "%", background: "var(--accent)" }}></div>
                  </div>
                  <span className="font-semibold text-sm">{p.customers}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Pending Actions</div>
            <span className="badge red">8 Urgent</span>
          </div>
          <div className="card-body" style={{ paddingTop: 12 }}>
            {[
              { icon: "📄", title: "POD Verification Pending",  sub: "8 trips awaiting delivery confirmation", urgent: true  },
              { icon: "⚠️", title: "Expense Approvals",         sub: "2 expenses pending review",               urgent: true  },
              { icon: "🔧", title: "TN04 GH 3456 in Maintenance", sub: "Service due since yesterday",           urgent: false },
              { icon: "📋", title: "Invoice Generation",        sub: "3 completed trips, invoices not sent",    urgent: false },
            ].map((a, i) => (
              <div key={i} className="flex gap-3" style={{ padding: "10px 0", borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
                <span style={{ fontSize: 18 }}>{a.icon}</span>
                <div style={{ flex: 1 }}>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{a.title}</span>
                    {a.urgent && <span className="badge red" style={{ fontSize: 10 }}>Urgent</span>}
                  </div>
                  <div className="text-xs text-muted mt-1">{a.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
