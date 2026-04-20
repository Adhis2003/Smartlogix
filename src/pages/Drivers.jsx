// src/pages/Drivers.jsx
import React, { useState } from "react";
import { mockData } from "../data/mockData";
import { StatusBadge, Rating } from "../Components/ui/StatusBadge";

const Avatar = ({ name, size = 34 }) => (
  <div
    className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0"
    style={{
      width: size,
      height: size,
      fontSize: size * 0.38,
      background: "linear-gradient(135deg, #7c3aed, #fb923c)",
    }}
  >
    {name.charAt(0)}
  </div>
);

const DriverModal = ({ d, onClose }) => (
  <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    onClick={(e) => e.target === e.currentTarget && onClose()}
  >
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-lg mx-4">
      {/* Header */}
      <div className="flex items-start justify-between p-5 border-b border-gray-200 dark:border-gray-700">
        <div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">{d.name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{d.id}</div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl leading-none"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="p-5 space-y-3">
        {/* Profile block */}
        <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-2">
          <Avatar name={d.name} size={56} />
          <div>
            <div className="text-base font-bold text-gray-900 dark:text-white">{d.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{d.phone}</div>
            <div className="flex gap-2 mt-1.5">
              <StatusBadge status={d.status} />
              <Rating val={d.rating} />
            </div>
          </div>
        </div>

        {[
          ["License Number", d.license],
          ["Assigned Truck", d.truck || "Unassigned"],
          ["Total Trips", d.trips],
          ["Joined", d.joined],
          ["Current Trip", d.trip || "None"],
          ["Current Location", d.city],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-800">
            <span className="text-sm text-gray-500 dark:text-gray-400">{k}</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{v}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          Close
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors">
          📱 Send WhatsApp
        </button>
      </div>
    </div>
  </div>
);

const AddDriverModal = ({ onClose }) => (
  <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    onClick={(e) => e.target === e.currentTarget && onClose()}
  >
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-lg mx-4">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
        <div className="text-lg font-semibold text-gray-900 dark:text-white">Add New Driver</div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl leading-none"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Full Name</label>
            <input
              className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Driver name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Phone Number</label>
            <input
              className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">License Number</label>
            <input
              className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="e.g. TN01 2020 0012345"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Assign Truck</label>
            <select className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500">
              <option>— Select Truck —</option>
              <option>TN06 KL 2345</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">License Expiry</label>
          <input
            className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            type="date"
          />
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
          Add Driver
        </button>
      </div>
    </div>
  </div>
);

const STATUS_BADGES = [
  ["on_trip", "On Trip", "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400", "bg-orange-500", 3],
  ["available", "Available", "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", "bg-green-500", 2],
  ["offline", "Offline", "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400", "bg-gray-400", 1],
];

const Drivers = () => {
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="p-6 space-y-4">

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {STATUS_BADGES.map(([s, l, cls, dotCls, n]) => (
            <span
              key={s}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${cls}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${dotCls}`} />
              {l}
              <strong className="ml-0.5">{n}</strong>
            </span>
          ))}
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
        >
          + Add Driver
        </button>
      </div>

      {/* Table card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                {["Driver", "License", "Assigned Truck", "Status", "Trips", "Rating", "Location", "Actions"].map((h) => (
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
              {mockData.drivers.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  {/* Driver */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={d.name} size={34} />
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{d.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{d.phone}</div>
                      </div>
                    </div>
                  </td>

                  {/* License */}
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">{d.license}</td>

                  {/* Truck */}
                  <td className="px-4 py-3">
                    {d.truck ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                        {d.truck}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3"><StatusBadge status={d.status} /></td>

                  {/* Trips */}
                  <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">{d.trips}</td>

                  {/* Rating */}
                  <td className="px-4 py-3"><Rating val={d.rating} /></td>

                  {/* Location */}
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">{d.city}</td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => setSelected(d)}
                        className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg transition-colors"
                      >
                        View
                      </button>
                      <button className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg transition-colors">
                        📱
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && <DriverModal d={selected} onClose={() => setSelected(null)} />}
      {showAdd && <AddDriverModal onClose={() => setShowAdd(false)} />}
    </div>
  );
};

export default Drivers;