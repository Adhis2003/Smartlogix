import React, { useState } from "react";
import {
  Plus, Wrench, MapPin, Truck, Users, Package,
  Hash, CalendarClock, ShieldAlert, ShieldCheck,
  AlertTriangle, Info,
} from "lucide-react";
import { mockData } from "../data/mockData";
import { StatusBadge } from "../Components/ui/StatusBadge";

/* ─── Status filter config ───────────────────────────────── */
const STATUS_FILTERS = [
  { key: "all",         label: "All",         dot: "bg-gray-400"   },
  { key: "on_trip",     label: "On Trip",     dot: "bg-orange-400" },
  { key: "available",   label: "Available",   dot: "bg-green-400"  },
  { key: "maintenance", label: "Maintenance", dot: "bg-red-400"    },
  { key: "idle",        label: "Idle",        dot: "bg-yellow-400" },
];

/* ─── Stat mini field ────────────────────────────────────── */
const StatField = ({ label, value, Icon }) => (
  <div>
    <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1">{label}</div>
    <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
      {Icon && <Icon size={11} className="text-gray-600 shrink-0" />}
      {value}
    </div>
  </div>
);

/* ─── Truck Card ─────────────────────────────────────────── */
const TruckCard = ({ t }) => {
  const insExpired = t.ins < "2025-04-01";

  return (
    <div className="group bg-gray-800/70 border border-gray-700/80 rounded-xl overflow-hidden
      hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5
      transition-all duration-200 cursor-pointer flex flex-col">

      {/* Header */}
      <div className="flex items-start justify-between px-4 py-3.5 border-b border-gray-700/80
        bg-gray-800/40 group-hover:bg-gray-800/60 transition-colors">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-gray-700/60 group-hover:bg-orange-500/10 transition-colors">
            <Truck size={15} className="text-gray-400 group-hover:text-orange-400 transition-colors" />
          </div>
          <div>
            <div className="text-sm font-extrabold tracking-widest text-white">{t.num}</div>
            <div className="text-[11px] text-gray-500 mt-0.5">{t.model} · {t.year}</div>
          </div>
        </div>
        <StatusBadge status={t.status} />
      </div>

      {/* Body */}
      <div className="px-4 py-3.5 space-y-3 flex-1">

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <StatField label="Type"     value={t.type}               Icon={Package} />
          <StatField label="Capacity" value={t.cap}                Icon={Hash} />
          <StatField label="Driver"   value={t.driver || "Unassigned"} Icon={Users} />
          <StatField label="Trips"    value={`${t.trips} done`}    Icon={Truck} />
        </div>

        <div className="border-t border-gray-700/60" />

        {/* Service & Insurance */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
            <CalendarClock size={11} />
            Service: {t.maint}
          </div>

          <div className={`flex items-center gap-1 text-[11px] font-semibold
            ${insExpired ? "text-red-400" : "text-gray-500"}`}>
            {insExpired
              ? <ShieldAlert size={11} />
              : <ShieldCheck size={11} />}
            Ins: {t.ins}
          </div>
        </div>

        {/* Insurance expired warning */}
        {insExpired && (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5
            bg-red-500/10 border border-red-500/20 rounded-lg">
            <AlertTriangle size={11} className="text-red-400 shrink-0" />
            <span className="text-[11px] text-red-400 font-medium">Insurance expired</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 px-4 pb-4">
        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] font-semibold
          text-gray-300 bg-gray-700/80 hover:bg-gray-700 border border-gray-600/60
          hover:border-gray-600 rounded-lg transition-colors">
          <Info size={12} />
          Details
        </button>
        <button className="flex items-center justify-center gap-1 px-3 py-2 text-[11px] font-semibold
          text-gray-400 hover:text-orange-400 hover:bg-orange-500/10 border border-gray-700/60
          hover:border-orange-500/20 rounded-lg transition-colors"
          title="Schedule Maintenance">
          <Wrench size={13} />
        </button>
        <button className="flex items-center justify-center gap-1 px-3 py-2 text-[11px] font-semibold
          text-gray-400 hover:text-green-400 hover:bg-green-500/10 border border-gray-700/60
          hover:border-green-500/20 rounded-lg transition-colors"
          title="Track Location">
          <MapPin size={13} />
        </button>
      </div>
    </div>
  );
};

/* ─── Fleet Page ─────────────────────────────────────────── */
const Fleet = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all"
    ? mockData.trucks
    : mockData.trucks.filter((t) => t.status === activeFilter);

  return (
    <div className="p-5 space-y-4">

      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">

        {/* Status filters */}
        <div className="flex gap-1.5 flex-wrap">
          {STATUS_FILTERS.map(({ key, label, dot }) => {
            const count = key === "all"
              ? mockData.trucks.length
              : mockData.trucks.filter((t) => t.status === key).length;
            const active = activeFilter === key;

            return (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                  transition-all duration-150 border
                  ${active
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-gray-800/60 border-gray-700/60 text-gray-500 hover:text-gray-300 hover:bg-gray-700/60"}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                {label}
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md
                  ${active ? "bg-orange-500/20 text-orange-400" : "bg-gray-700 text-gray-600"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white
          bg-orange-500 hover:bg-orange-400 rounded-lg transition-colors shadow-lg shadow-orange-500/20">
          <Plus size={14} />
          Add Truck
        </button>
      </div>

      {/* ── Truck grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => <TruckCard key={t.id} t={t} />)}

        {filtered.length === 0 && (
          <div className="col-span-3 py-16 text-center text-xs text-gray-600">
            No trucks match this filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default Fleet;