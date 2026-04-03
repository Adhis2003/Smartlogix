// src/pages/Fleet.jsx
import React from "react";
import { mockData } from "../data/mockData";
import { StatusBadge } from "../Components/ui/StatusBadge";

const STATUS_COLOR = { on_trip: "orange", available: "green", maintenance: "red", idle: "yellow" };

const Fleet = () => (
  <div className="page-content">
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-2">
        {[["on_trip","On Trip"],["available","Available"],["maintenance","Maintenance"],["idle","Idle"]].map(([s, l]) => (
          <span key={s} className={`badge ${STATUS_COLOR[s]}`} style={{ padding: "6px 14px", fontSize: 12.5 }}>
            <span className="badge-dot"></span>{l}{" "}
            <strong style={{ marginLeft: 4 }}>
              {mockData.trucks.filter((t) => t.status === s).length}
            </strong>
          </span>
        ))}
      </div>
      <button className="btn btn-primary btn-sm">+ Add Truck</button>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
      {mockData.trucks.map((t) => (
        <div key={t.id} className="card" style={{ transition: "all 0.2s", cursor: "pointer" }}>
          <div className="card-header" style={{ padding: "14px 16px" }}>
            <div>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: 1 }}>
                {t.num}
              </div>
              <div className="text-xs text-muted mt-1">{t.model} · {t.year}</div>
            </div>
            <StatusBadge status={t.status} />
          </div>
          <div className="card-body" style={{ padding: "14px 16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
              {[["Type", t.type],["Capacity", t.cap],["Driver", t.driver || "Unassigned"],["Trips Done", t.trips]].map(([k, v]) => (
                <div key={k}>
                  <div className="text-xs text-muted">{k}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
            <div className="divider"></div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Last Service: {t.maint}</span>
              <span className="text-xs" style={{ color: t.ins < "2025-04-01" ? "var(--red)" : "var(--text-muted)" }}>
                Ins: {t.ins}
              </span>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: "center" }}>Details</button>
              <button className="btn btn-ghost btn-sm">🔧</button>
              <button className="btn btn-ghost btn-sm">📍</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Fleet;
