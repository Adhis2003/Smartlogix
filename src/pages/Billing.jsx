// src/pages/Billing.jsx
import React from "react";
import {
  TrendingUp, AlertCircle, CheckCircle2, ShoppingBag,
  FileText, Plus, Cpu,
} from "lucide-react";
import { mockData } from "../data/mockData";
import { fmt } from "../utils/helpers";

// ── Theme tokens ────────────────────────────────────────────────
const BG       = "bg-[#131c2e]";
const BG_INNER = "bg-[#0f1623]";
const BORDER   = "border-[#1e2d45]";
const TEXT_PRI = "text-[#e2e8f0]";
const TEXT_MUT = "text-[#4a6080]";
const DIVIDE   = "divide-[#1e2d45]";

// ── Plan config ─────────────────────────────────────────────────
const PLAN_BADGE = {
  Starter:    "bg-[#1a2535] text-[#4a6080]",
  Growth:     "bg-[#0e2040] text-blue-400",
  Pro:        "bg-[#1a1040] text-violet-400",
  Enterprise: "bg-[#2a1500] text-orange-400",
};

const PLAN_BAR = {
  Starter:    "bg-[#4a6080]",
  Growth:     "bg-blue-500",
  Pro:        "bg-violet-500",
  Enterprise: "bg-orange-500",
};

// ── Stat cards ──────────────────────────────────────────────────
const STAT_CARDS = [
  { label: "MRR (Subscriptions)",  val: "₹1,34,280", accent: "border-l-emerald-500", icon: TrendingUp,   iconCls: "text-emerald-400" },
  { label: "Outstanding Invoices", val: "₹71,390",   accent: "border-l-red-500",     icon: AlertCircle,  iconCls: "text-red-400"     },
  { label: "Collected This Month", val: "₹2,84,500", accent: "border-l-blue-500",    icon: CheckCircle2, iconCls: "text-blue-400"    },
  { label: "Marketplace Revenue",  val: "₹12,450",   accent: "border-l-orange-500",  icon: ShoppingBag,  iconCls: "text-orange-400"  },
];

const INVOICES = [
  { id: "INV-1201", customer: "Reliance Retail",  trip: "TRIP-2400", amount: 52000, gst: 9360,  total: 61360, due: "27 Jan 2025", status: "unpaid" },
  { id: "INV-1200", customer: "ABC Textiles Ltd", trip: "TRIP-2399", amount: 22000, gst: 3960,  total: 25960, due: "25 Jan 2025", status: "paid"   },
  { id: "INV-1199", customer: "TVS Motors",       trip: "TRIP-2397", amount: 12000, gst: 2160,  total: 14160, due: "24 Jan 2025", status: "paid"   },
  { id: "INV-1198", customer: "HUL",              trip: "TRIP-2398", amount: 8500,  gst: 1530,  total: 10030, due: "27 Jan 2025", status: "unpaid" },
];

const TABLE_HEADERS = ["Invoice", "Customer", "Trip", "Base", "GST", "Total", "Due Date", "Status"];

const Billing = () => (
  <div className="p-6 space-y-4">

    {/* Stat cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {STAT_CARDS.map(({ label, val, accent, icon: Icon, iconCls }) => (
        <div
          key={label}
          className={`${BG} border ${BORDER} border-l-4 ${accent} rounded-xl px-4 py-3`}
        >
          <div className={`flex items-center gap-1.5 text-xs ${TEXT_MUT} font-medium mb-1`}>
            <Icon size={13} className={`shrink-0 ${iconCls}`} />
            {label}
          </div>
          <div className={`text-xl font-bold ${TEXT_PRI}`}>{val}</div>
        </div>
      ))}
    </div>

    {/* Main grid */}
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">

      {/* Invoices table */}
      <div className={`${BG} border ${BORDER} rounded-xl overflow-hidden`}>
        <div className={`flex items-center justify-between px-5 py-3 border-b ${BORDER}`}>
          <div className="flex items-center gap-2">
            <FileText size={15} className="text-violet-400" />
            <span className={`text-sm font-semibold ${TEXT_PRI}`}>Recent Invoices</span>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors">
            <Plus size={12} />
            Generate Invoice
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b ${BORDER} ${BG_INNER}`}>
                {TABLE_HEADERS.map((h) => (
                  <th key={h} className={`px-4 py-3 text-left text-xs font-semibold ${TEXT_MUT} uppercase tracking-wider whitespace-nowrap`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y ${DIVIDE}`}>
              {INVOICES.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#0f1a2a] transition-colors">
                  <td className="px-4 py-3 font-semibold text-violet-400 whitespace-nowrap">{inv.id}</td>
                  <td className={`px-4 py-3 text-sm ${TEXT_PRI} whitespace-nowrap`}>{inv.customer}</td>
                  <td className={`px-4 py-3 text-sm ${TEXT_MUT} whitespace-nowrap`}>{inv.trip}</td>
                  <td className={`px-4 py-3 text-sm text-[#8aa4c0] whitespace-nowrap`}>₹{fmt(inv.amount)}</td>
                  <td className={`px-4 py-3 text-sm ${TEXT_MUT} whitespace-nowrap`}>₹{fmt(inv.gst)}</td>
                  <td className={`px-4 py-3 font-semibold ${TEXT_PRI} whitespace-nowrap`}>₹{fmt(inv.total)}</td>
                  <td className={`px-4 py-3 text-sm ${TEXT_MUT} whitespace-nowrap`}>{inv.due}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                      inv.status === "paid"
                        ? "bg-emerald-900/30 text-emerald-400"
                        : "bg-yellow-900/20 text-yellow-400"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${inv.status === "paid" ? "bg-emerald-500" : "bg-yellow-500"}`} />
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
      <div className={`${BG} border ${BORDER} rounded-xl overflow-hidden`}>
        <div className={`flex items-center gap-2 px-4 py-3 border-b ${BORDER}`}>
          <Cpu size={15} className="text-violet-400" />
          <span className={`text-sm font-semibold ${TEXT_PRI}`}>Subscription Plans</span>
        </div>
        <div className="p-4 space-y-3">
          {mockData.plans.map((p) => (
            <div
              key={p.name}
              className={`${BG_INNER} border ${BORDER} rounded-xl p-3`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-bold text-sm ${TEXT_PRI} tracking-wide`}>{p.name}</span>
                <span className="font-semibold text-violet-400 text-sm">
                  ₹{fmt(p.price)}
                  <span className={`text-xs ${TEXT_MUT} font-normal`}>/mo</span>
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs ${TEXT_MUT}`}>{p.trucks}</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${PLAN_BADGE[p.name]}`}>
                  {p.customers} customers
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#1e2d45] rounded-full overflow-hidden">
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