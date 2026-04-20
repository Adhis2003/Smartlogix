// src/pages/Settings.jsx
import React, { useState } from "react";

const inputCls =
  "w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500";

const labelCls =
  "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide";

const NOTIFICATIONS = [
  ["Trip started / ended", true],
  ["POD uploaded by driver", true],
  ["Expense approval needed", true],
  ["New load posted in marketplace", false],
  ["Invoice payment received", true],
  ["Driver goes offline", false],
];

const INTEGRATIONS = [
  ["Google Maps API", "Connected", true],
  ["WhatsApp Business API", "Connected", true],
  ["Firebase (Push)", "Connected", true],
  ["Razorpay (Payments)", "Not Connected", false],
  ["SendGrid (Email)", "Connected", true],
];

const Toggle = ({ defaultOn }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${on ? "bg-violet-600" : "bg-gray-300 dark:bg-gray-600"
        }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 ${on ? "translate-x-4" : "translate-x-0"
          }`}
      />
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ title }) => (
  <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-700">
    <span className="text-sm font-semibold text-gray-900 dark:text-white">{title}</span>
  </div>
);

const Settings = () => (
  <div className="p-6 space-y-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

      {/* Company profile */}
      <Card>
        <CardHeader title="Company Profile" />
        <div className="p-5 space-y-4">
          {/* Logo + name block */}
          <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <div className="w-14 h-14 rounded-xl bg-violet-600 flex items-center justify-center text-2xl flex-shrink-0">
              🚛
            </div>
            <div>
              <div className="font-extrabold text-lg text-gray-900 dark:text-white tracking-wide">SmartLogix</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Transport OS · Chennai, India</div>
              <div className="text-xs text-violet-600 dark:text-violet-400 mt-0.5">Growth Plan · 47 Trucks</div>
            </div>
          </div>

          {/* Fields */}
          {[
            ["Company Name", "SmartLogix Transport Pvt Ltd"],
            ["GST Number", "29AABCU9603R1ZX"],
            ["Phone", "+91 98765 43210"],
            ["Email", "admin@smartlogix.in"],
            ["City", "Chennai, Tamil Nadu"],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1">
              <label className={labelCls}>{k}</label>
              <input className={inputCls} defaultValue={v} />
            </div>
          ))}

          <button className="px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors">
            Save Changes
          </button>
        </div>
      </Card>

      {/* Right column */}
      <div className="space-y-4">

        {/* Notifications */}
        <Card>
          <CardHeader title="Notifications" />
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {NOTIFICATIONS.map(([label, def]) => (
              <div key={label} className="flex items-center justify-between px-5 py-3">
                <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                <Toggle defaultOn={def} />
              </div>
            ))}
          </div>
        </Card>

        {/* API Integrations */}
        <Card>
          <CardHeader title="API Integrations" />
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {INTEGRATIONS.map(([name, status, connected]) => (
              <div key={name} className="flex items-center justify-between px-5 py-3">
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{name}</span>
                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${connected
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`} />
                  {status}
                </span>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  </div>
);

export default Settings;