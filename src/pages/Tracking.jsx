// src/pages/Tracking.jsx
import React, { useState } from "react";
import { mockData } from "../data/mockData";
import { StatusBadge } from "../Components/ui/StatusBadge";

const GPS_POSITIONS = [
  { top: "35%", left: "42%", name: "Ravi Kumar",  color: "green"  },
  { top: "20%", left: "62%", name: "Senthil P",   color: "orange" },
  { top: "55%", left: "40%", name: "Vijay S",     color: "green"  },
];

const Tracking = () => {
  const activeTrips = mockData.trips.filter((t) => t.status === "in_progress");
  const [selected, setSelected] = useState(activeTrips[0]);

  return (
    <div className="page-content">
      <div className="grid-2-1">
        {/* Map */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div className="card-header">
            <div className="flex items-center gap-3">
              <div className="card-title">Live GPS Map</div>
              <span className="live-dot"></span>
              <span className="text-xs text-secondary">Real-time tracking</span>
            </div>
            <span className="badge green">{activeTrips.length} Active</span>
          </div>
          <div className="map-container" style={{ height: 380, borderRadius: 0 }}>
            <div className="map-grid"></div>
            {/* India silhouette hint */}
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 280, height: 320, border: "1px dashed var(--border-light)", borderRadius: "40% 30% 50% 20% / 30% 40% 30% 50%", opacity: 0.3 }}></div>
            </div>
            {GPS_POSITIONS.map((p, i) => (
              <div key={i} style={{ position: "absolute", top: p.top, left: p.left }}>
                <div
                  className="map-dot"
                  style={{
                    background: p.color === "green" ? "var(--green)" : "var(--accent)",
                    animation: "pulse 2s infinite",
                  }}
                >
                  <div style={{ position: "absolute", background: "var(--bg-card)", border: "1px solid var(--border)", padding: "3px 8px", borderRadius: 6, fontSize: 10.5, whiteSpace: "nowrap", top: -30, left: "50%", transform: "translateX(-50%)" }}>
                    🚛 {p.name}
                  </div>
                </div>
              </div>
            ))}
            <div style={{ position: "absolute", bottom: 12, left: 12, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 12px" }}>
              <div className="text-xs text-muted">🗺 India · Tamil Nadu, Karnataka, Maharashtra</div>
            </div>
          </div>
        </div>

        {/* Trip list */}
        <div className="card">
          <div className="card-header"><div className="card-title">Active Trips</div></div>
          <div style={{ overflowY: "auto", maxHeight: 432 }}>
            {activeTrips.map((t) => (
              <div
                key={t.id}
                className="trip-item"
                onClick={() => setSelected(t)}
                style={{ background: selected?.id === t.id ? "var(--accent-dim)" : "" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-accent font-semibold text-sm">{t.id}</span>
                  <StatusBadge status={t.status} />
                </div>
                <div className="trip-route">
                  <span className="trip-city" style={{ fontSize: 12 }}>{t.from}</span>
                  <span className="trip-arrow">→</span>
                  <span className="trip-city" style={{ fontSize: 12 }}>{t.to}</span>
                </div>
                <div className="trip-meta">
                  <span>👤 {t.driver}</span>
                  <span>📏 {t.dist}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted">ETA: {t.eta}</span>
                  <button className="btn btn-ghost btn-sm" style={{ fontSize: 11 }}>🔗 Share Link</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail bar */}
      {selected && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">Trip Details — {selected.id}</div>
            <div className="flex gap-2">
              <button className="btn btn-secondary btn-sm">🔗 Copy Tracking Link</button>
              <button className="btn btn-primary btn-sm">📱 WhatsApp to Customer</button>
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {[
                ["Route",     `${selected.from} → ${selected.to}`],
                ["Distance",  selected.dist],
                ["Driver",    selected.driver],
                ["Truck",     selected.truck],
                ["Cargo",     `${selected.cargo} (${selected.weight})`],
                ["Customer",  selected.customer],
                ["Departure", selected.start],
                ["ETA",       selected.eta],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-xs text-muted">{k}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginTop: 3 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracking;
