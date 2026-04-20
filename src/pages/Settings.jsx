// src/pages/Settings.jsx
import React from "react";

const Settings = () => (
  <div className="page-content">
    <div className="grid-2">
      <div className="card">
        <div className="card-header"><div className="card-title">Company Profile</div></div>
        <div className="card-body">
          <div
            className="flex items-center gap-4 mb-4"
            style={{ padding: 16, background: "var(--bg-secondary)", borderRadius: 10 }}
          >
            <div style={{ width: 56, height: 56, borderRadius: 12, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
              🚛
            </div>
            <div>
              <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 18 }}>SmartLogix</div>
              <div className="text-sm text-muted">Transport OS · Chennai, India</div>
              <div className="text-xs text-accent mt-1">Growth Plan · 47 Trucks</div>
            </div>
          </div>
          {[
            ["Company Name",  "SmartLogix Transport Pvt Ltd"],
            ["GST Number",    "29AABCU9603R1ZX"],
            ["Phone",         "+91 98765 43210"],
            ["Email",         "admin@smartlogix.in"],
            ["City",          "Chennai, Tamil Nadu"],
          ].map(([k, v]) => (
            <div key={k} className="form-group">
              <label className="form-label">{k}</label>
              <input className="form-input" defaultValue={v} />
            </div>
          ))}
          <button className="btn btn-primary btn-sm">Save Changes</button>
        </div>
      </div>

      <div>
        <div className="card mb-3">
          <div className="card-header"><div className="card-title">Notifications</div></div>
          <div className="card-body" style={{ paddingTop: 12 }}>
            {[
              ["Trip started / ended",              true ],
              ["POD uploaded by driver",            true ],
              ["Expense approval needed",           true ],
              ["New load posted in marketplace",    false],
              ["Invoice payment received",          true ],
              ["Driver goes offline",               false],
            ].map(([label, def]) => (
              <div
                key={label}
                className="flex items-center justify-between"
                style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}
              >
                <span className="text-sm">{label}</span>
                <div
                  style={{
                    width: 36, height: 20, borderRadius: 10,
                    background: def ? "var(--accent)" : "var(--border)",
                    cursor: "pointer", position: "relative", transition: "background 0.2s",
                  }}
                >
                  <div style={{
                    width: 16, height: 16, borderRadius: "50%", background: "white",
                    position: "absolute", top: 2, left: def ? 18 : 2, transition: "left 0.2s",
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">API Integrations</div></div>
          <div className="card-body" style={{ paddingTop: 12 }}>
            {[
              ["Google Maps API",        "Connected",     "green"],
              ["WhatsApp Business API",  "Connected",     "green"],
              ["Firebase (Push)",        "Connected",     "green"],
              ["Razorpay (Payments)",    "Not Connected", "red"  ],
              ["SendGrid (Email)",       "Connected",     "green"],
            ].map(([name, status, color]) => (
              <div
                key={name}
                className="flex items-center justify-between"
                style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}
              >
                <span className="text-sm font-semibold">{name}</span>
                <span className={`badge ${color}`}>
                  <span className="badge-dot"></span>{status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Settings;
