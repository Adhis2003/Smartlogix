// src/pages/Tracking.jsx
import React, { useState } from "react";
import { mockData } from "../data/mockData";
import { StatusBadge } from "../Components/ui/StatusBadge";

const GPS_POSITIONS = [
  { top: "35%", left: "42%", name: "Ravi Kumar", color: "green" },
  { top: "20%", left: "62%", name: "Senthil P", color: "orange" },
  { top: "55%", left: "40%", name: "Vijay S", color: "green" },
];

const Tracking = () => {
  const activeTrips = mockData.trips.filter((t) => t.status === "in_progress");
  const [selected, setSelected] = useState(activeTrips[0]);

  return (
    <div className="p-6 space-y-4">

      {/* Top grid: Map + Trip list */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">

        {/* Map Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          {/* Card header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Live GPS Map</span>
              {/* Pulsing live dot */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Real-time tracking</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              {activeTrips.length} Active
            </span>
          </div>

          {/* Map area */}
          <div className="relative bg-gray-50 dark:bg-gray-800" style={{ height: 380 }}>
            {/* Grid lines */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(var(--tw-border-opacity, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.2) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* India silhouette hint */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="opacity-20 border border-dashed border-gray-400 dark:border-gray-500"
                style={{
                  width: 280,
                  height: 320,
                  borderRadius: "40% 30% 50% 20% / 30% 40% 30% 50%",
                }}
              />
            </div>

            {/* GPS dots */}
            {GPS_POSITIONS.map((p, i) => (
              <div key={i} className="absolute" style={{ top: p.top, left: p.left }}>
                <div className="relative flex items-center justify-center">
                  {/* Pulse ring */}
                  <span
                    className={`absolute inline-flex h-5 w-5 rounded-full animate-ping opacity-60 ${p.color === "green" ? "bg-green-400" : "bg-orange-400"
                      }`}
                  />
                  {/* Dot */}
                  <span
                    className={`relative inline-flex h-4 w-4 rounded-full border-2 border-white dark:border-gray-900 shadow ${p.color === "green" ? "bg-green-500" : "bg-orange-500"
                      }`}
                  />
                  {/* Label */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-[10.5px] whitespace-nowrap px-2 py-0.5 rounded-md shadow-sm">
                    🚛 {p.name}
                  </div>
                </div>
              </div>
            ))}

            {/* Map footer label */}
            <div className="absolute bottom-3 left-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                🗺 India · Tamil Nadu, Karnataka, Maharashtra
              </span>
            </div>
          </div>
        </div>

        {/* Active Trips list */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden flex flex-col">
          <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Active Trips</span>
          </div>
          <div className="overflow-y-auto flex-1 divide-y divide-gray-100 dark:divide-gray-800" style={{ maxHeight: 432 }}>
            {activeTrips.map((t) => (
              <div
                key={t.id}
                onClick={() => setSelected(t)}
                className={`px-4 py-3 cursor-pointer transition-colors ${selected?.id === t.id
                    ? "bg-violet-50 dark:bg-violet-900/20"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">{t.id}</span>
                  <StatusBadge status={t.status} />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300 mb-1.5">
                  <span className="font-medium">{t.from}</span>
                  <span className="text-gray-400">→</span>
                  <span className="font-medium">{t.to}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span>👤 {t.driver}</span>
                  <span>📏 {t.dist}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">ETA: {t.eta}</span>
                  <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 px-2 py-1 rounded-md transition-colors">
                    🔗 Share Link
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail bar */}
      {selected && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              Trip Details — {selected.id}
            </span>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                🔗 Copy Tracking Link
              </button>
              <button className="px-3 py-1.5 text-xs font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors">
                📱 WhatsApp to Customer
              </button>
            </div>
          </div>
          <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              ["Route", `${selected.from} → ${selected.to}`],
              ["Distance", selected.dist],
              ["Driver", selected.driver],
              ["Truck", selected.truck],
              ["Cargo", `${selected.cargo} (${selected.weight})`],
              ["Customer", selected.customer],
              ["Departure", selected.start],
              ["ETA", selected.eta],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{k}</div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracking;