// src/pages/Marketplace.jsx
import React, { useState } from "react";
import { mockData } from "../data/mockData";
import { fmt } from "../utils/helpers";
import { StatusBadge } from "../Components/ui/StatusBadge";

const inputCls =
  "w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500";

const labelCls =
  "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide";

const Marketplace = () => {
  const [tab, setTab] = useState("all");

  const visible =
    tab === "all" ? mockData.loads : mockData.loads.filter((l) => l.status === tab);

  const tabs = [
    ["all", "All Loads"],
    ["open", "Open"],
    ["assigned", "Assigned"],
    ["completed", "Completed"],
  ];

  return (
    <div className="p-6 space-y-4">

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {tabs.map(([v, l]) => (
            <button
              key={v}
              onClick={() => setTab(v)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${tab === v
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
            >
              {l}
            </button>
          ))}
        </div>
        <button className="px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors">
          + Post Load
        </button>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">

        {/* Load cards */}
        <div className="space-y-3">
          {visible.map((l) => (
            <div
              key={l.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-sm transition-all"
            >
              {/* Load header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-violet-600 dark:text-violet-400">{l.id}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Posted by {l.by}</span>
                </div>
                <StatusBadge status={l.status} />
              </div>

              {/* Load details grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                {[
                  ["📍 Pickup", l.pickup],
                  ["🏁 Drop", l.drop],
                  ["📦 Cargo", `${l.cargo} · ${l.weight}`],
                  ["📏 Distance", l.dist],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{k}</div>
                    <div className="text-xs font-semibold text-gray-900 dark:text-white mt-0.5">{v}</div>
                  </div>
                ))}
              </div>

              {/* Footer row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Freight: </span>
                    <span className="font-semibold text-green-600 dark:text-green-400">₹{fmt(l.price)}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Commission (3%): </span>
                    <span className="font-semibold text-violet-600 dark:text-violet-400">₹{fmt(Math.round(l.price * 0.03))}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Deadline: </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{l.deadline}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Bids: </span>
                    <span className="font-semibold text-gray-900 dark:text-white">{l.bids}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {l.status === "open" && (
                    <button className="px-3 py-1.5 text-xs font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors">
                      Assign Driver
                    </button>
                  )}
                  <button className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">

          {/* Stats card */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Marketplace Stats</span>
            </div>
            <div className="p-4 space-y-0 divide-y divide-gray-100 dark:divide-gray-800">
              {[
                ["Total Loads Posted", "847"],
                ["Loads Completed", "762"],
                ["Avg. Freight Value", "₹42,500"],
                ["Total Commission Earned", "₹9.7L"],
                ["Top Route", "Chennai → Mumbai"],
                ["Avg. Bid Count", "3.8 per load"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-2.5">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{k}</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Post a load form */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Post a New Load</span>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex flex-col gap-1">
                <label className={labelCls}>Pickup Location</label>
                <input className={inputCls} placeholder="City / Address" />
              </div>
              <div className="flex flex-col gap-1">
                <label className={labelCls}>Drop Location</label>
                <input className={inputCls} placeholder="City / Address" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className={labelCls}>Cargo Type</label>
                  <input className={inputCls} placeholder="e.g. Steel" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelCls}>Weight (T)</label>
                  <input className={inputCls} type="number" placeholder="0" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className={labelCls}>Offered Price (₹)</label>
                <input className={inputCls} type="number" placeholder="0" />
              </div>
              <button className="w-full py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors">
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