// src/pages/Marketplace.jsx
import React, { useState } from "react";
import { mockData } from "../data/mockData";
import { fmt } from "../utils/helpers";
import { StatusBadge } from "../Components/ui/StatusBadge";

const Marketplace = () => {
  const [tab, setTab] = useState("all");

  const visible =
    tab === "all" ? mockData.loads : mockData.loads.filter((l) => l.status === tab);

  return (
    <div className="page-content">
      <div className="flex items-center justify-between mb-4">
        <div className="tabs" style={{ margin: 0, border: "none" }}>
          {[["all","All Loads"],["open","Open"],["assigned","Assigned"],["completed","Completed"]].map(([v, l]) => (
            <button key={v} className={`tab-btn ${tab === v ? "active" : ""}`} onClick={() => setTab(v)}>{l}</button>
          ))}
        </div>
        <button className="btn btn-primary btn-sm">+ Post Load</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
        <div>
          {visible.map((l) => (
            <div key={l.id} className="load-card">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="font-semibold text-accent">{l.id}</span>
                  <span className="text-xs text-muted" style={{ marginLeft: 8 }}>Posted by {l.by}</span>
                </div>
                <StatusBadge status={l.status} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
                {[["📍 Pickup", l.pickup],["🏁 Drop", l.drop],["📦 Cargo", `${l.cargo} · ${l.weight}`],["📏 Distance", l.dist]].map(([k, v]) => (
                  <div key={k}>
                    <div className="text-xs text-muted">{k}</div>
                    <div style={{ fontSize: 12.5, fontWeight: 600, marginTop: 2 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <div><span className="text-xs text-muted">Freight: </span><span className="font-semibold text-green">₹{fmt(l.price)}</span></div>
                  <div><span className="text-xs text-muted">Commission (3%): </span><span className="font-semibold text-accent">₹{fmt(Math.round(l.price * 0.03))}</span></div>
                  <div><span className="text-xs text-muted">Deadline: </span><span className="text-sm">{l.deadline}</span></div>
                  <div><span className="text-xs text-muted">Bids: </span><span className="font-semibold">{l.bids}</span></div>
                </div>
                <div className="flex gap-2">
                  {l.status === "open" && <button className="btn btn-primary btn-sm">Assign Driver</button>}
                  <button className="btn btn-secondary btn-sm">Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="card mb-3">
            <div className="card-header"><div className="card-title">Marketplace Stats</div></div>
            <div className="card-body" style={{ paddingTop: 12 }}>
              {[
                ["Total Loads Posted","847"],["Loads Completed","762"],
                ["Avg. Freight Value","₹42,500"],["Total Commission Earned","₹9.7L"],
                ["Top Route","Chennai → Mumbai"],["Avg. Bid Count","3.8 per load"],
              ].map(([k, v]) => (
                <div key={k} className="metric-row">
                  <span className="text-sm text-secondary">{k}</span>
                  <span className="text-sm font-semibold">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">Post a New Load</div></div>
            <div className="card-body">
              <div className="form-group"><label className="form-label">Pickup Location</label><input className="form-input" placeholder="City / Address" /></div>
              <div className="form-group"><label className="form-label">Drop Location</label><input className="form-input" placeholder="City / Address" /></div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Cargo Type</label><input className="form-input" placeholder="e.g. Steel" /></div>
                <div className="form-group"><label className="form-label">Weight (T)</label><input className="form-input" type="number" placeholder="0" /></div>
              </div>
              <div className="form-group"><label className="form-label">Offered Price (₹)</label><input className="form-input" type="number" placeholder="0" /></div>
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Post Load</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
 