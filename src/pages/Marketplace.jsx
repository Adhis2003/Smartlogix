import React, { useState } from "react";
import {
  Plus, MapPin, Flag, Package, Ruler, IndianRupee,
  Clock, Users, TrendingUp, BarChart3, Route,
  ChevronDown, UserCheck, Info, Gavel,
} from "lucide-react";
import { mockData } from "../data/mockData";
import { fmt } from "../utils/helpers";
import { StatusBadge } from "../Components/ui/StatusBadge";

/* ─── Shared form styles ─────────────────────────────────── */
const INPUT_CLS =
  "w-full px-3 py-2 text-xs bg-gray-800 border border-gray-700 rounded-lg text-white " +
  "placeholder-gray-500 focus:outline-none focus:border-orange-500/60 focus:ring-1 " +
  "focus:ring-orange-500/30 transition-colors duration-150";

const LABEL_CLS =
  "text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 block";

const Field = ({ label, children }) => (
  <div className="flex flex-col">
    <label className={LABEL_CLS}>{label}</label>
    {children}
  </div>
);

/* ─── Tabs config ────────────────────────────────────────── */
const TABS = [
  { value: "all",       label: "All Loads"  },
  { value: "open",      label: "Open"       },
  { value: "assigned",  label: "Assigned"   },
  { value: "completed", label: "Completed"  },
];

/* ─── Marketplace stats ──────────────────────────────────── */
const STATS = [
  { label: "Loads Posted",       value: "847",              Icon: Package     },
  { label: "Loads Completed",    value: "762",              Icon: Flag        },
  { label: "Avg. Freight",       value: "₹42,500",          Icon: IndianRupee },
  { label: "Commission Earned",  value: "₹9.7L",            Icon: TrendingUp  },
  { label: "Top Route",          value: "Chennai → Mumbai", Icon: Route       },
  { label: "Avg. Bids / Load",   value: "3.8",              Icon: Gavel       },
];

/* ─── Load detail field ──────────────────────────────────── */
const LoadField = ({ label, value, Icon }) => (
  <div>
    <div className="flex items-center gap-1 text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1">
      {Icon && <Icon size={9} />}
      {label}
    </div>
    <div className="text-xs font-semibold text-white">{value}</div>
  </div>
);

/* ─── Load Card ──────────────────────────────────────────── */
const LoadCard = ({ l }) => (
  <div className="bg-gray-800/70 border border-gray-700/80 rounded-xl p-4
    hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5
    transition-all duration-200">

    {/* Header */}
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-orange-400">{l.id}</span>
        <span className="text-[11px] text-gray-500">by {l.by}</span>
      </div>
      <StatusBadge status={l.status} />
    </div>

    {/* Details grid */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
      <LoadField label="Pickup"   value={l.pickup}                  Icon={MapPin}  />
      <LoadField label="Drop"     value={l.drop}                    Icon={Flag}    />
      <LoadField label="Cargo"    value={`${l.cargo} · ${l.weight}`} Icon={Package} />
      <LoadField label="Distance" value={l.dist}                    Icon={Ruler}   />
    </div>

    {/* Footer */}
    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-700/60">
      <div className="flex flex-wrap gap-4">
        <div>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest">Freight </span>
          <span className="text-xs font-bold text-green-400">₹{fmt(l.price)}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest">Commission </span>
          <span className="text-xs font-bold text-orange-400">₹{fmt(Math.round(l.price * 0.03))}</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-gray-500">
          <Clock size={10} />
          {l.deadline}
        </div>
        <div className="flex items-center gap-1 text-[11px] text-gray-500">
          <Gavel size={10} />
          {l.bids} bids
        </div>
      </div>

      <div className="flex gap-2">
        {l.status === "open" && (
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-white
            bg-orange-500 hover:bg-orange-400 rounded-lg transition-colors shadow-md shadow-orange-500/20">
            <UserCheck size={12} />
            Assign Driver
          </button>
        )}
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold
          text-gray-400 bg-gray-700/80 hover:bg-gray-700 border border-gray-600/60 rounded-lg transition-colors">
          <Info size={12} />
          Details
        </button>
      </div>
    </div>
  </div>
);

/* ─── Marketplace Page ───────────────────────────────────── */
const Marketplace = () => {
  const [tab, setTab] = useState("all");

  const visible = tab === "all"
    ? mockData.loads
    : mockData.loads.filter((l) => l.status === tab);

  const tabCount = (v) =>
    v === "all" ? mockData.loads.length : mockData.loads.filter((l) => l.status === v).length;

  return (
    <div className="p-5 space-y-4">

      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-0.5 bg-gray-800 border border-gray-700 p-1 rounded-xl">
          {TABS.map(({ value, label }) => {
            const active = tab === value;
            return (
              <button
                key={value}
                onClick={() => setTab(value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150
                  ${active
                    ? "bg-gray-700 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-300 hover:bg-gray-700/50"}`}
              >
                {label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold
                  ${active ? "bg-orange-500/20 text-orange-400" : "bg-gray-700 text-gray-500"}`}>
                  {tabCount(value)}
                </span>
              </button>
            );
          })}
        </div>

        <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white
          bg-orange-500 hover:bg-orange-400 rounded-lg transition-colors shadow-lg shadow-orange-500/20">
          <Plus size={14} />
          Post Load
        </button>
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">

        {/* Load cards */}
        <div className="space-y-3">
          {visible.map((l) => <LoadCard key={l.id} l={l} />)}
          {visible.length === 0 && (
            <div className="py-16 text-center text-xs text-gray-600">
              No loads in this category.
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">

          {/* Stats card */}
          <div className="bg-gray-800/70 border border-gray-700/80 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700/80">
              <BarChart3 size={14} className="text-orange-400" />
              <span className="text-sm font-semibold text-white">Marketplace Stats</span>
            </div>
            <div className="divide-y divide-gray-700/50">
              {STATS.map(({ label, value, Icon }) => (
                <div key={label} className="flex items-center justify-between px-4 py-2.5">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Icon size={12} className="text-gray-600 shrink-0" />
                    {label}
                  </div>
                  <span className="text-xs font-bold text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Post a load form */}
          <div className="bg-gray-800/70 border border-gray-700/80 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700/80">
              <Plus size={14} className="text-orange-400" />
              <span className="text-sm font-semibold text-white">Post a New Load</span>
            </div>
            <div className="p-4 space-y-3">
              <Field label="Pickup Location">
                <div className="relative">
                  <MapPin size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input className={INPUT_CLS + " pl-8"} placeholder="City / Address" />
                </div>
              </Field>

              <Field label="Drop Location">
                <div className="relative">
                  <Flag size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400" />
                  <input className={INPUT_CLS + " pl-8"} placeholder="City / Address" />
                </div>
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Cargo Type">
                  <input className={INPUT_CLS} placeholder="e.g. Steel" />
                </Field>
                <Field label="Weight (T)">
                  <input className={INPUT_CLS} type="number" placeholder="0" />
                </Field>
              </div>

              <Field label="Offered Price (₹)">
                <div className="relative">
                  <IndianRupee size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input className={INPUT_CLS + " pl-8"} type="number" placeholder="0" />
                </div>
              </Field>

              <button className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white
                bg-orange-500 hover:bg-orange-400 rounded-lg transition-colors shadow-lg shadow-orange-500/20">
                <Plus size={13} />
                Post Load
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Marketplace;