// src/pages/Settings.jsx
import React, { useState } from "react";
import {
  Building2, Hash, Phone, Mail, MapPin, Save,
  Bell, Plug, CheckCircle2, XCircle,
  Map, MessageCircle, Flame, CreditCard, Send,
} from "lucide-react";

// ── Theme tokens ────────────────────────────────────────────────
const BG       = "bg-[#131c2e]";
const BG_INNER = "bg-[#0f1623]";
const BORDER   = "border-[#1e2d45]";
const TEXT_PRI = "text-[#e2e8f0]";
const TEXT_MUT = "text-[#4a6080]";
const DIVIDE   = "divide-[#1e2d45]";

const inputCls =
  "w-full px-3 py-2 text-sm bg-[#0f1623] border border-[#1e2d45] rounded-lg text-[#e2e8f0] placeholder-[#4a6080] focus:outline-none focus:ring-2 focus:ring-violet-500";

const labelCls =
  "flex items-center gap-1.5 text-xs font-medium text-[#4a6080] uppercase tracking-wide mb-1";

const NOTIFICATIONS = [
  ["Trip started / ended",            true ],
  ["POD uploaded by driver",          true ],
  ["Expense approval needed",         true ],
  ["New load posted in marketplace",  false],
  ["Invoice payment received",        true ],
  ["Driver goes offline",             false],
];

const INTEGRATIONS = [
  ["Google Maps API",         "Connected",     true,  Map           ],
  ["WhatsApp Business API",   "Connected",     true,  MessageCircle ],
  ["Firebase (Push)",         "Connected",     true,  Flame         ],
  ["Razorpay (Payments)",     "Not Connected", false, CreditCard    ],
  ["SendGrid (Email)",        "Connected",     true,  Send          ],
];

const FIELD_ICONS = {
  "Company Name": Building2,
  "GST Number":   Hash,
  "Phone":        Phone,
  "Email":        Mail,
  "City":         MapPin,
};

const Toggle = ({ defaultOn }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
        on ? "bg-violet-600" : "bg-[#1e2d45]"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 ${
          on ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`${BG} border ${BORDER} rounded-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ title, icon: Icon, iconCls = "text-violet-400" }) => (
  <div className={`flex items-center gap-2 px-5 py-3 border-b ${BORDER}`}>
    {Icon && <Icon size={15} className={iconCls} />}
    <span className={`text-sm font-semibold ${TEXT_PRI}`}>{title}</span>
  </div>
);

const Settings = () => (
  <div className="p-6 space-y-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

      {/* Company profile */}
      <Card>
        <CardHeader title="Company Profile" icon={Building2} />
        <div className="p-5 space-y-4">

          {/* Logo + name block */}
          <div className={`flex items-center gap-4 ${BG_INNER} border ${BORDER} rounded-xl p-4`}>
            <div className="w-14 h-14 rounded-xl bg-violet-600 flex items-center justify-center text-2xl flex-shrink-0">
              🚛
            </div>
            <div>
              <div className={`font-extrabold text-lg ${TEXT_PRI} tracking-wide`}>SmartLogix</div>
              <div className={`text-sm ${TEXT_MUT}`}>Transport OS · Chennai, India</div>
              <div className="text-xs text-violet-400 mt-0.5">Growth Plan · 47 Trucks</div>
            </div>
          </div>

          {/* Fields */}
          {[
            ["Company Name", "SmartLogix Transport Pvt Ltd"],
            ["GST Number",   "29AABCU9603R1ZX"            ],
            ["Phone",        "+91 98765 43210"             ],
            ["Email",        "admin@smartlogix.in"         ],
            ["City",         "Chennai, Tamil Nadu"         ],
          ].map(([k, v]) => {
            const FieldIcon = FIELD_ICONS[k];
            return (
              <div key={k} className="flex flex-col gap-1">
                <label className={labelCls}>
                  {FieldIcon && <FieldIcon size={11} className="shrink-0" />}
                  {k}
                </label>
                <input className={inputCls} defaultValue={v} />
              </div>
            );
          })}

          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors">
            <Save size={14} />
            Save Changes
          </button>
        </div>
      </Card>

      {/* Right column */}
      <div className="space-y-4">

        {/* Notifications */}
        <Card>
          <CardHeader title="Notifications" icon={Bell} />
          <div className={`divide-y ${DIVIDE}`}>
            {NOTIFICATIONS.map(([label, def]) => (
              <div key={label} className="flex items-center justify-between px-5 py-3">
                <span className={`text-sm ${TEXT_PRI}`}>{label}</span>
                <Toggle defaultOn={def} />
              </div>
            ))}
          </div>
        </Card>

        {/* API Integrations */}
        <Card>
          <CardHeader title="API Integrations" icon={Plug} />
          <div className={`divide-y ${DIVIDE}`}>
            {INTEGRATIONS.map(([name, status, connected, ServiceIcon]) => (
              <div key={name} className="flex items-center justify-between px-5 py-3">
                <span className={`flex items-center gap-2 text-sm font-semibold ${TEXT_PRI}`}>
                  <ServiceIcon size={14} className={connected ? "text-[#4a6080]" : "text-[#3a5070]"} />
                  {name}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                  connected
                    ? "bg-emerald-900/30 text-emerald-400"
                    : "bg-red-900/20 text-red-400"
                }`}>
                  {connected
                    ? <CheckCircle2 size={11} className="text-emerald-400" />
                    : <XCircle     size={11} className="text-red-400"     />
                  }
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