import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Fuel, Construction, Wrench, IndianRupee,
  Download, Check, X, CheckCircle2, Clock,
} from "lucide-react";
import { mockData } from "../data/mockData";
import { fmt } from "../utils/helpers";

/* ─── Type config ────────────────────────────────────────── */
const TYPE_CONFIG = {
  fuel:        { Icon: Fuel,         color: "text-orange-400", badge: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  toll:        { Icon: Construction, color: "text-blue-400",   badge: "bg-blue-500/10   text-blue-400   border-blue-500/20"   },
  maintenance: { Icon: Wrench,       color: "text-red-400",    badge: "bg-red-500/10    text-red-400    border-red-500/20"    },
};

/* ─── Stat cards config ──────────────────────────────────── */
const STAT_CARDS = [
  { label: "Total Expenses",  val: "₹12,900", Icon: IndianRupee, accent: "border-l-orange-400", iconCls: "text-orange-400 bg-orange-500/10" },
  { label: "Fuel Costs",      val: "₹9,800",  Icon: Fuel,        accent: "border-l-yellow-400", iconCls: "text-yellow-400 bg-yellow-500/10" },
  { label: "Toll Charges",    val: "₹1,300",  Icon: Construction,accent: "border-l-blue-400",   iconCls: "text-blue-400   bg-blue-500/10"   },
  { label: "Maintenance",     val: "₹1,800",  Icon: Wrench,      accent: "border-l-red-400",    iconCls: "text-red-400    bg-red-500/10"    },
];

const EXP_BY_TYPE = [
  { type: "Fuel",        amount: 9800  },
  { type: "Toll",        amount: 1300  },
  { type: "Maintenance", amount: 1800  },
];

const TABLE_HEADERS = [
  "Expense ID", "Trip", "Driver", "Type",
  "Description", "Amount", "Date", "Status",
];

/* ─── Shared card wrapper ────────────────────────────────── */
const Card = ({ children, className = "" }) => (
  <div className={`bg-gray-800/70 border border-gray-700/80 rounded-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="flex items-center justify-between px-5 py-3 border-b border-gray-700/80">
    {children}
  </div>
);

/* ─── Custom tooltip ─────────────────────────────────────── */
const ExpTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="text-gray-400 mb-1">{label}</p>
      <p className="font-bold text-orange-400">₹{fmt(payload[0].value)}</p>
    </div>
  );
};

/* ─── Verified badge ─────────────────────────────────────── */
const VerifiedBadge = ({ verified }) => (
  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-semibold border
    ${verified
      ? "bg-green-500/10 text-green-400 border-green-500/20"
      : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${verified ? "bg-green-400" : "bg-yellow-400 animate-pulse"}`} />
    {verified ? "Verified" : "Pending"}
  </span>
);

/* ─── Expenses Page ──────────────────────────────────────── */
const Expenses = () => (
  <div className="p-5 space-y-4">

    {/* ── Stat Cards ── */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {STAT_CARDS.map(({ label, val, Icon, accent, iconCls }) => (
        <div key={label}
          className={`relative bg-gray-800/70 border border-gray-700/80 border-l-4 ${accent}
            rounded-xl p-4 overflow-hidden group hover:bg-gray-800 transition-colors duration-200`}>
          <div className="flex items-start justify-between mb-2">
            <div className={`p-1.5 rounded-lg ${iconCls}`}>
              <Icon size={14} strokeWidth={2} />
            </div>
          </div>
          <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1">{label}</div>
          <div className="text-xl font-bold text-white">{val}</div>
        </div>
      ))}
    </div>

    {/* ── Charts + Pending ── */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

      {/* Bar chart */}
      <Card>
        <CardHeader>
          <span className="text-sm font-semibold text-white">Expense Breakdown</span>
        </CardHeader>
        <div className="p-5">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={EXP_BY_TYPE} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="type" tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false}
                tickFormatter={(v) => "₹" + v / 1000 + "k"} />
              <Tooltip content={<ExpTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="amount" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Pending verifications */}
      <Card>
        <CardHeader>
          <span className="text-sm font-semibold text-white">Pending Verifications</span>
          <span className="text-[11px] text-yellow-400 font-semibold">
            {mockData.expenses.filter((e) => !e.verified).length} awaiting
          </span>
        </CardHeader>
        <div className="divide-y divide-gray-700/50">
          {mockData.expenses.filter((e) => !e.verified).map((e) => {
            const cfg = TYPE_CONFIG[e.type];
            const Icon = cfg?.Icon;
            return (
              <div key={e.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-700/30 transition-colors">
                <div className={`p-2 rounded-lg shrink-0 ${cfg?.badge} border`}>
                  {Icon && <Icon size={14} strokeWidth={2} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-white truncate">{e.desc}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">{e.driver} · {e.trip}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-orange-400 mb-1.5">₹{fmt(e.amount)}</div>
                  <div className="flex gap-1 justify-end">
                    <button className="flex items-center justify-center w-6 h-6 text-white bg-green-600
                      hover:bg-green-500 rounded-md transition-colors" title="Approve">
                      <Check size={11} strokeWidth={3} />
                    </button>
                    <button className="flex items-center justify-center w-6 h-6 text-white bg-red-600
                      hover:bg-red-500 rounded-md transition-colors" title="Reject">
                      <X size={11} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>

    {/* ── All Expenses Table ── */}
    <Card>
      <CardHeader>
        <span className="text-sm font-semibold text-white">All Expenses</span>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold
          text-gray-400 bg-gray-700/80 hover:bg-gray-700 border border-gray-600/60 rounded-lg transition-colors">
          <Download size={12} />
          Export CSV
        </button>
      </CardHeader>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700/80 bg-gray-800/80">
              {TABLE_HEADERS.map((h) => (
                <th key={h}
                  className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {mockData.expenses.map((e) => {
              const cfg = TYPE_CONFIG[e.type];
              const Icon = cfg?.Icon;
              return (
                <tr key={e.id} className="hover:bg-gray-700/30 transition-colors duration-100">

                  {/* ID */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-xs font-bold text-orange-400">{e.id}</span>
                  </td>

                  {/* Trip */}
                  <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{e.trip}</td>

                  {/* Driver */}
                  <td className="px-4 py-3 text-xs text-gray-300">{e.driver}</td>

                  {/* Type */}
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-semibold border ${cfg?.badge}`}>
                      {Icon && <Icon size={10} strokeWidth={2.5} />}
                      {e.type.charAt(0).toUpperCase() + e.type.slice(1)}
                    </span>
                  </td>

                  {/* Description */}
                  <td className="px-4 py-3 text-xs text-gray-400">{e.desc}</td>

                  {/* Amount */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-xs font-bold text-white">₹{fmt(e.amount)}</span>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{e.date}</td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <VerifiedBadge verified={e.verified} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table footer */}
      <div className="px-5 py-2.5 border-t border-gray-700/60">
        <span className="text-[11px] text-gray-600">
          {mockData.expenses.length} total expenses ·{" "}
          {mockData.expenses.filter((e) => e.verified).length} verified ·{" "}
          {mockData.expenses.filter((e) => !e.verified).length} pending
        </span>
      </div>
    </Card>

  </div>
);

export default Expenses;