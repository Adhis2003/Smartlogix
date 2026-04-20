// src/pages/Fleet.jsx
import React from "react";
import { mockData } from "../data/mockData";
import { StatusBadge } from "../Components/ui/StatusBadge";

const STATUS_BADGES = [
  ["on_trip", "On Trip", "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400", "bg-orange-500"],
  ["available", "Available", "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", "bg-green-500"],
  ["maintenance", "Maintenance", "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", "bg-red-500"],
  ["idle", "Idle", "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400", "bg-yellow-500"],
];

const Fleet = () => (
  <div className="p-6 space-y-4">

    {/* Toolbar */}
    <div className="flex items-center justify-between">
      <div className="flex gap-2 flex-wrap">
        {STATUS_BADGES.map(([s, l, cls, dotCls]) => (
          <span
            key={s}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${cls}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${dotCls}`} />
            {l}
            <strong className="ml-0.5">
              {mockData.trucks.filter((t) => t.status === s).length}
            </strong>
          </span>
        ))}
      </div>
      <button className="px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors">
        + Add Truck
      </button>
    </div>

    {/* Truck grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockData.trucks.map((t) => {
        const insExpired = t.ins < "2025-04-01";
        return (
          <div
            key={t.id}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700 transition-all cursor-pointer"
          >
            {/* Card header */}
            <div className="flex items-start justify-between px-4 py-3.5 border-b border-gray-100 dark:border-gray-800">
              <div>
                <div className="font-extrabold text-sm tracking-widest text-gray-900 dark:text-white">
                  {t.num}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {t.model} · {t.year}
                </div>
              </div>
              <StatusBadge status={t.status} />
            </div>

            {/* Card body */}
            <div className="px-4 py-3.5 space-y-3">
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  ["Type", t.type],
                  ["Capacity", t.cap],
                  ["Driver", t.driver || "Unassigned"],
                  ["Trips Done", t.trips],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{k}</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">{v}</div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 dark:border-gray-800" />

              {/* Service & insurance */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Last Service: {t.maint}
                </span>
                <span className={`text-xs font-medium ${insExpired ? "text-red-500" : "text-gray-500 dark:text-gray-400"}`}>
                  Ins: {t.ins}
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <button className="flex-1 py-1.5 text-xs font-medium text-center text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  Details
                </button>
                <button className="px-3 py-1.5 text-xs text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg transition-colors">
                  🔧
                </button>
                <button className="px-3 py-1.5 text-xs text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg transition-colors">
                  📍
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default Fleet;