// src/pages/Trips.jsx
import React, { useState } from "react";
import { mockData } from "../data/mockData";
import { fmt } from "../utils/helpers";
import { StatusBadge } from "../Components/ui/StatusBadge";

const TripDetailModal = ({ trip, onClose }) => (
  <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    onClick={(e) => e.target === e.currentTarget && onClose()}
  >
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-lg mx-4">
      {/* Header */}
      <div className="flex items-start justify-between p-5 border-b border-gray-200 dark:border-gray-700">
        <div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">{trip.id}</div>
          <StatusBadge status={trip.status} />
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl leading-none"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="p-5 space-y-3 max-h-[60vh] overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">From</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">{trip.from}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">To</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">{trip.to}</div>
          </div>
        </div>

        {[
          ["Driver", trip.driver], ["Truck", trip.truck], ["Customer", trip.customer],
          ["Cargo", trip.cargo], ["Weight", trip.weight], ["Distance", trip.dist],
          ["Started", trip.start], ["ETA", trip.eta],
          ["Freight", "₹" + fmt(trip.freight)],
          ["Expenses", "₹" + fmt(trip.expenses)],
          ["Net", "₹" + fmt(trip.freight - trip.expenses)],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-800">
            <span className="text-sm text-gray-500 dark:text-gray-400">{k}</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{v}</span>
          </div>
        ))}

        <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-800">
          <span className="text-sm text-gray-500 dark:text-gray-400">POD Uploaded</span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${trip.pod
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}>
            {trip.pod ? "Yes" : "Pending"}
          </span>
        </div>

        <div className="mt-3 bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-xs text-gray-500 dark:text-gray-400">
          🔗 Tracking Link: smartlogix.in/track/{trip.id}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          Close
        </button>
        {!trip.pod && trip.status === "in_progress" && (
          <button className="px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors">
            Send WhatsApp Alert
          </button>
        )}
      </div>
    </div>
  </div>
);

const CreateTripModal = ({ onClose }) => (
  <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    onClick={(e) => e.target === e.currentTarget && onClose()}
  >
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-2xl mx-4">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
        <div className="text-lg font-semibold text-gray-900 dark:text-white">Create New Trip</div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl leading-none"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4 max-h-[65vh] overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Customer</label>
            <select className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500">
              <option>ABC Textiles Ltd</option>
              <option>Reliance Retail</option>
              <option>Sun Pharma</option>
              <option>TVS Motors</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Truck</label>
            <select className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500">
              <option>TN01 AB 1234 — Ravi Kumar</option>
              <option>TN02 CD 5678 — Murugan S</option>
              <option>TN06 KL 2345 — Unassigned</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Pickup Location</label>
            <input className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Enter pickup address" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Delivery Location</label>
            <input className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Enter delivery address" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Cargo Type</label>
            <input className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="e.g. Cotton Bales" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Weight (Tons)</label>
            <input className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="e.g. 18" type="number" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Freight Amount (₹)</label>
            <input className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="e.g. 28000" type="number" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Scheduled Departure</label>
            <input className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500" type="datetime-local" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Notes</label>
          <input className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="Any special instructions..." />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
        >
          Create Trip + Notify Driver
        </button>
      </div>
    </div>
  </div>
);

const Trips = () => {
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered =
    filter === "all"
      ? mockData.trips
      : mockData.trips.filter((t) => t.status === filter);

  const tabs = [
    ["all", "All Trips"],
    ["in_progress", "Active"],
    ["completed", "Completed"],
    ["cancelled", "Cancelled"],
  ];

  return (
    <div className="p-6 space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {tabs.map(([v, l]) => (
            <button
              key={v}
              onClick={() => setFilter(v)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === v
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
            >
              {l}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowModal("create")}
          className="px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
        >
          + New Trip
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                {["Trip ID", "Route", "Driver / Truck", "Customer", "Cargo", "Status", "Freight", "POD", "Action"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
                  onClick={() => { setSelected(t); setShowModal("detail"); }}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="font-semibold text-violet-600 dark:text-violet-400">{t.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{t.from}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">→ {t.to} · {t.dist}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900 dark:text-white">{t.driver}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{t.truck}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">{t.customer}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900 dark:text-white">{t.cargo}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{t.weight}</div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="font-semibold text-gray-900 dark:text-white">₹{fmt(t.freight)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${t.pod
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${t.pod ? "bg-green-500" : "bg-yellow-500"}`} />
                      {t.pod ? "Done" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => { setSelected(t); setShowModal("detail"); }}
                      className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal === "detail" && selected && (
        <TripDetailModal trip={selected} onClose={() => setShowModal(null)} />
      )}
      {showModal === "create" && (
        <CreateTripModal onClose={() => setShowModal(null)} />
      )}
    </div>
  );
};

export default Trips;