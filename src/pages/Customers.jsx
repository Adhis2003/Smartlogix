import React from "react";
import {
  Plus, Users, TrendingUp, Building2, BarChart3,
  MapPin, Phone, Eye, MessageCircle,
} from "lucide-react";
import { mockData } from "../data/mockData";
import { fmt } from "../utils/helpers";

/* ─── Plan badge config ──────────────────────────────────── */
const PLAN_BADGE = {
  Starter:    "bg-gray-700/60   text-gray-400   border-gray-600/60",
  Growth:     "bg-blue-500/10   text-blue-400   border-blue-500/20",
  Pro:        "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Enterprise: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

/* ─── Stat cards config ──────────────────────────────────── */
const STAT_CARDS = [
  { label: "Total Customers",   val: "134",  Icon: Users,      accent: "border-l-blue-400",   iconCls: "text-blue-400   bg-blue-500/10"   },
  { label: "Active This Month", val: "118",  Icon: TrendingUp, accent: "border-l-green-400",  iconCls: "text-green-400  bg-green-500/10"  },
  { label: "Enterprise Plans",  val: "3",    Icon: Building2,  accent: "border-l-orange-400", iconCls: "text-orange-400 bg-orange-500/10" },
  { label: "Avg. Shipments/mo", val: "8.4",  Icon: BarChart3,  accent: "border-l-purple-400", iconCls: "text-purple-400 bg-purple-500/10" },
];

const TABLE_HEADERS = [
  "Customer", "Contact", "City", "Plan",
  "Shipments", "Total Value", "Status", "Actions",
];

/* ─── Customers Page ─────────────────────────────────────── */
const Customers = () => (
  <div className="p-5 space-y-4">

    {/* ── Toolbar row ── */}
    <div className="flex items-center gap-4 flex-wrap">

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 flex-1">
        {STAT_CARDS.map(({ label, val, Icon, accent, iconCls }) => (
          <div key={label}
            className={`bg-gray-800/70 border border-gray-700/80 border-l-4 ${accent}
              rounded-xl px-4 py-3 flex items-center gap-3 hover:bg-gray-800 transition-colors duration-200`}>
            <div className={`p-2 rounded-lg shrink-0 ${iconCls}`}>
              <Icon size={14} strokeWidth={2} />
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</div>
              <div className="text-xl font-bold text-white mt-0.5">{val}</div>
            </div>
          </div>
        ))}
      </div>

      <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white
        bg-orange-500 hover:bg-orange-400 rounded-lg transition-colors shadow-lg shadow-orange-500/20 shrink-0">
        <Plus size={14} />
        Add Customer
      </button>
    </div>

    {/* ── Table card ── */}
    <div className="bg-gray-800/70 border border-gray-700/80 rounded-xl overflow-hidden">
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
            {mockData.customers.map((c) => (
              <tr key={c.id}
                className="hover:bg-gray-700/30 transition-colors duration-100 group">

                {/* Customer */}
                <td className="px-4 py-3">
                  <div className="text-xs font-bold text-white">{c.name}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">{c.id}</div>
                </td>

                {/* Contact */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-xs text-gray-300">
                    <Users size={10} className="text-gray-600 shrink-0" />
                    {c.contact}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-0.5">
                    <Phone size={10} className="shrink-0" />
                    {c.phone}
                  </div>
                </td>

                {/* City */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-300 whitespace-nowrap">
                    <MapPin size={10} className="text-gray-600 shrink-0" />
                    {c.city}
                  </div>
                </td>

                {/* Plan */}
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold border ${PLAN_BADGE[c.plan]}`}>
                    {c.plan}
                  </span>
                </td>

                {/* Shipments */}
                <td className="px-4 py-3">
                  <span className="text-xs font-bold text-white">{c.shipments}</span>
                </td>

                {/* Total Value */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-xs font-bold text-green-400">₹{fmt(c.value)}</span>
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-semibold border
                    ${c.status === "active"
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : "bg-gray-700/60 text-gray-500 border-gray-600/40"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full
                      ${c.status === "active" ? "bg-green-400" : "bg-gray-500"}`} />
                    {c.status === "active" ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold
                      text-gray-400 hover:text-orange-400 hover:bg-orange-500/10 border border-transparent
                      hover:border-orange-500/20 rounded-lg transition-all duration-150">
                      <Eye size={12} />
                      View
                    </button>
                    <button
                      title="WhatsApp"
                      className="flex items-center justify-center px-2.5 py-1.5 text-gray-500
                        hover:text-green-400 hover:bg-green-500/10 border border-transparent
                        hover:border-green-500/20 rounded-lg transition-all duration-150">
                      <MessageCircle size={13} />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table footer */}
      <div className="px-5 py-2.5 border-t border-gray-700/60 flex items-center justify-between">
        <span className="text-[11px] text-gray-600">
          {mockData.customers.length} customers ·{" "}
          {mockData.customers.filter((c) => c.status === "active").length} active
        </span>
        <span className="text-[11px] text-gray-600 tabular-nums">Page 1 of 1</span>
      </div>
    </div>

  </div>
);

export default Customers;