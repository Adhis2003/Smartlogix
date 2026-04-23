import React, { useMemo } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Truck, Users, IndianRupee, Zap, Package, FileText,
  Handshake, TrendingUp, Wrench, AlertTriangle, Clock,
  ArrowUpRight, ArrowDownRight, Activity, MapPin,
} from "lucide-react";
import { mockData } from "../data/mockData";
import { fmt } from "../utils/helpers";

/* ─── Helpers ────────────────────────────────────────────── */
const now = new Date();
const dateStr = now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

const CHART_TOOLTIP_STYLE = {
  contentStyle: {
    background: "#1f2937",
    border: "1px solid #374151",
    borderRadius: 8,
    fontSize: 12,
    color: "#f9fafb",
  },
};

/* ─── Stat Card ──────────────────────────────────────────── */
const STAT_ACCENT = {
  orange: { ring: "ring-orange-500/20", icon: "bg-orange-500/10 text-orange-400", text: "text-orange-400" },
  green:  { ring: "ring-green-500/20",  icon: "bg-green-500/10  text-green-400",  text: "text-green-400"  },
  blue:   { ring: "ring-blue-500/20",   icon: "bg-blue-500/10   text-blue-400",   text: "text-blue-400"   },
  purple: { ring: "ring-purple-500/20", icon: "bg-purple-500/10 text-purple-400", text: "text-purple-400" },
  yellow: { ring: "ring-yellow-500/20", icon: "bg-yellow-500/10 text-yellow-400", text: "text-yellow-400" },
};

const StatCard = ({ label, val, Icon, change, up, color = "orange" }) => {
  const ac = STAT_ACCENT[color] ?? STAT_ACCENT.orange;
  return (
    <div className={`relative bg-gray-800/70 border border-gray-700/80 ring-1 ${ac.ring}
      rounded-xl p-4 flex flex-col gap-2 hover:bg-gray-800 transition-colors duration-200 group overflow-hidden`}>

      {/* subtle gradient glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
        bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-gray-400 tracking-wide">{label}</span>
        <div className={`p-1.5 rounded-lg ${ac.icon}`}>
          <Icon size={14} strokeWidth={2} />
        </div>
      </div>

      <div className="text-2xl font-bold text-white leading-tight">{val}</div>

      <div className={`flex items-center gap-1 text-[11px] font-medium ${up ? "text-green-400" : "text-red-400"}`}>
        {up
          ? <ArrowUpRight size={12} strokeWidth={2.5} />
          : <ArrowDownRight size={12} strokeWidth={2.5} />}
        {change}
      </div>
    </div>
  );
};

/* ─── Section Title ──────────────────────────────────────── */
const SectionTitle = ({ children, aside }) => (
  <div className="flex items-center justify-between mb-3">
    <h2 className="text-sm font-semibold text-white tracking-tight">{children}</h2>
    {aside && <span className="text-xs text-gray-500">{aside}</span>}
  </div>
);

/* ─── Card wrapper ───────────────────────────────────────── */
const Card = ({ children, className = "" }) => (
  <div className={`bg-gray-800/70 border border-gray-700/80 rounded-xl p-4 ${className}`}>
    {children}
  </div>
);

/* ─── Custom Tooltip for recharts ────────────────────────── */
const RevTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="text-gray-400 mb-1 font-medium">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.stroke }} className="font-semibold">
          {p.name.charAt(0).toUpperCase() + p.name.slice(1)}: ₹{fmt(p.value)}
        </p>
      ))}
    </div>
  );
};

/* ─── Dashboard ──────────────────────────────────────────── */
const Dashboard = () => {
  const s = mockData.stats;

  const statCards = useMemo(() => [
    { label: "Active Trips",      val: s.activeTrips,               Icon: Truck,      change: "+2 from yesterday",  up: true,  color: "orange" },
    { label: "Drivers Online",    val: s.driversOnline,             Icon: Users,      change: "+5 from last week",  up: true,  color: "green"  },
    { label: "Monthly Revenue",   val: "₹" + fmt(s.monthlyRevenue), Icon: IndianRupee,change: "+14% vs last month", up: true,  color: "blue"   },
    { label: "Fleet Utilization", val: s.fleetUtilization + "%",    Icon: Zap,        change: "−3% vs last week",   up: false, color: "purple" },
    { label: "Total Trucks",      val: s.totalTrucks,               Icon: Truck,      change: "2 in maintenance",   up: false, color: "yellow" },
    { label: "Pending POD",       val: s.pendingPOD,                Icon: FileText,   change: "Needs attention",    up: false, color: "orange" },
    { label: "Total Customers",   val: s.totalCustomers,            Icon: Handshake,  change: "+8 this month",      up: true,  color: "green"  },
    { label: "Total Revenue",     val: "₹" + fmt(s.totalRevenue),   Icon: TrendingUp, change: "All time high",      up: true,  color: "blue"   },
  ], [s]);

  const LEGEND = [
    { color: "#f97316", label: "Revenue" },
    { color: "#10b981", label: "Profit" },
    { color: "#ef4444", label: "Expenses" },
  ];

  const PENDING_ACTIONS = [
    { Icon: FileText,      title: "POD Verification Pending",      sub: "8 trips awaiting delivery confirmation", urgent: true  },
    { Icon: AlertTriangle, title: "Expense Approvals",             sub: "2 expenses pending review",              urgent: true  },
    { Icon: Wrench,        title: "TN04 GH 3456 in Maintenance",   sub: "Service due since yesterday",            urgent: false },
    { Icon: Clock,         title: "Invoice Generation",            sub: "3 completed trips, invoices not sent",   urgent: false },
  ];

  return (
    <div className="p-5 bg-gray-900 min-h-screen text-white space-y-5">

      {/* ── Live Bar ── */}
      <div className="flex flex-wrap items-center gap-3 px-4 py-2.5
        bg-green-500/5 border border-green-500/20 rounded-xl">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shrink-0" />
          <Activity size={13} className="text-green-400" />
          <span className="text-sm font-semibold text-green-400">Live Dashboard</span>
        </span>
        <span className="text-xs text-gray-400">
          — {s.activeTrips} trips in progress · {s.driversOnline} drivers online · Last updated just now
        </span>
        <span className="ml-auto text-xs text-gray-500 tabular-nums">
          {dateStr} · {timeStr} IST
        </span>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-3">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* ── Charts Row 1 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Revenue Line Chart */}
        <Card className="lg:col-span-2">
          <SectionTitle aside="Last 6 months (INR)">Revenue & Profit Trend</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={mockData.revenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false}
                tickFormatter={(v) => "₹" + (v / 1000) + "k"} />
              <Tooltip content={<RevTooltip />} />
              <Line type="monotone" dataKey="revenue"  stroke="#f97316" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="profit"   stroke="#10b981" strokeWidth={2.5} dot={false} strokeDasharray="4 4" />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={1.5} dot={false} strokeDasharray="2 2" />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-5 mt-2 justify-center">
            {LEGEND.map(({ color, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-[11px] text-gray-400">
                <span style={{ width: 14, height: 3, background: color, borderRadius: 2, display: "inline-block" }} />
                {label}
              </span>
            ))}
          </div>
        </Card>

        {/* Fleet Pie */}
        <Card>
          <SectionTitle>Fleet Status</SectionTitle>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={mockData.fleetPie} cx="50%" cy="50%"
                innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value">
                {mockData.fleetPie.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip {...CHART_TOOLTIP_STYLE} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-1">
            {mockData.fleetPie.map((e) => (
              <div key={e.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span style={{ width: 8, height: 8, background: e.color, borderRadius: "50%", display: "inline-block" }} />
                  <span className="text-xs text-gray-400">{e.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: (e.value / 47 * 100) + "%", background: e.color }} />
                  </div>
                  <span className="text-xs font-semibold text-white w-5 text-right">{e.value}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── Charts Row 2 + Live Trips ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Bar Chart */}
        <Card>
          <SectionTitle>Trip Volume — This Week</SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockData.tripVolume} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP_STYLE} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Bar dataKey="trips" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Live Trips */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-white">Live Trips</h2>
            <span className="flex items-center gap-1.5 text-[11px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              {s.activeTrips} Active
            </span>
          </div>
          <div className="max-h-52 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-700">
            {mockData.trips
              .filter((t) => t.status === "in_progress")
              .map((t) => (
                <div key={t.id} className="p-3 bg-gray-700/50 border border-gray-700/80 rounded-lg
                  hover:bg-gray-700 transition-colors duration-150 group">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <MapPin size={12} className="text-orange-400 shrink-0" />
                      {t.from}
                      <span className="text-gray-500 text-xs">→</span>
                      {t.to}
                    </div>
                    <span className="text-xs font-bold text-green-400">₹{fmt(t.freight)}</span>
                  </div>
                  <div className="flex gap-3 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1"><Truck size={10} /> {t.truck}</span>
                    <span className="flex items-center gap-1"><Users size={10} /> {t.driver}</span>
                    <span className="ml-auto text-gray-500">ETA {t.eta}</span>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>

      {/* ── Bottom Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Subscription Plans */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-white">Subscription Plans</h2>
            <span className="text-xs font-semibold text-orange-400">134 paying</span>
          </div>
          <div className="space-y-3">
            {mockData.plans.map((p) => (
              <div key={p.name} className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">{p.name}</div>
                  <div className="text-[11px] text-gray-500">{p.trucks} · ₹{fmt(p.price)}/mo</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full transition-all duration-500"
                      style={{ width: (p.customers / 134 * 100) + "%" }} />
                  </div>
                  <span className="text-xs font-bold text-white w-6 text-right">{p.customers}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Actions */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-white">Pending Actions</h2>
            <span className="text-[11px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full font-semibold">
              8 Urgent
            </span>
          </div>
          <div className="space-y-0">
            {PENDING_ACTIONS.map(({ Icon, title, sub, urgent }, i) => (
              <div key={title}
                className={`flex gap-3 py-2.5 ${i < PENDING_ACTIONS.length - 1 ? "border-b border-gray-700/60" : ""}`}>
                <div className={`p-1.5 rounded-lg shrink-0 mt-0.5
                  ${urgent ? "bg-red-500/10 text-red-400" : "bg-gray-700 text-gray-400"}`}>
                  <Icon size={13} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white truncate">{title}</span>
                    {urgent && (
                      <span className="shrink-0 text-[9px] font-bold bg-red-500/15 text-red-400 border border-red-500/20 px-1.5 py-0.5 rounded uppercase tracking-wide">
                        Urgent
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Dashboard;