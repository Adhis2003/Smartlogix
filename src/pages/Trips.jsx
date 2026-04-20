// src/pages/Trips.jsx
import React, { useState } from "react";
import { mockData } from "../data/mockData";
import { fmt } from "../utils/helpers";
import { StatusBadge } from "../Components/ui/StatusBadge";

const TripDetailModal = ({ trip, onClose }) => (
  <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div className="modal">
      <div className="modal-header">
        <div>
          <div className="modal-title">{trip.id}</div>
          <StatusBadge status={trip.status} />
        </div>
        <span className="modal-close" onClick={onClose}>✕</span>
      </div>
      <div className="modal-body">
        <div className="form-row mb-4">
          <div>
            <div className="form-label">From</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{trip.from}</div>
          </div>
          <div>
            <div className="form-label">To</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{trip.to}</div>
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
          <div key={k} className="metric-row">
            <span className="text-sm text-muted">{k}</span>
            <span className="text-sm font-semibold">{v}</span>
          </div>
        ))}
        <div className="metric-row">
          <span className="text-sm text-muted">POD Uploaded</span>
          <span className={`badge ${trip.pod ? "green" : "red"}`}>{trip.pod ? "Yes" : "Pending"}</span>
        </div>
        <div className="mt-3" style={{ background: "var(--bg-secondary)", borderRadius: 8, padding: 12, fontSize: 12, color: "var(--text-muted)" }}>
          🔗 Tracking Link: smartlogix.in/track/{trip.id}
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary btn-sm" onClick={onClose}>Close</button>
        {!trip.pod && trip.status === "in_progress" && (
          <button className="btn btn-primary btn-sm">Send WhatsApp Alert</button>
        )}
      </div>
    </div>
  </div>
);

const CreateTripModal = ({ onClose }) => (
  <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div className="modal">
      <div className="modal-header">
        <div className="modal-title">Create New Trip</div>
        <span className="modal-close" onClick={onClose}>✕</span>
      </div>
      <div className="modal-body">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Customer</label>
            <select className="form-select">
              <option>ABC Textiles Ltd</option>
              <option>Reliance Retail</option>
              <option>Sun Pharma</option>
              <option>TVS Motors</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Truck</label>
            <select className="form-select">
              <option>TN01 AB 1234 — Ravi Kumar</option>
              <option>TN02 CD 5678 — Murugan S</option>
              <option>TN06 KL 2345 — Unassigned</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Pickup Location</label>
            <input className="form-input" placeholder="Enter pickup address" />
          </div>
          <div className="form-group">
            <label className="form-label">Delivery Location</label>
            <input className="form-input" placeholder="Enter delivery address" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Cargo Type</label>
            <input className="form-input" placeholder="e.g. Cotton Bales" />
          </div>
          <div className="form-group">
            <label className="form-label">Weight (Tons)</label>
            <input className="form-input" placeholder="e.g. 18" type="number" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Freight Amount (₹)</label>
            <input className="form-input" placeholder="e.g. 28000" type="number" />
          </div>
          <div className="form-group">
            <label className="form-label">Scheduled Departure</label>
            <input className="form-input" type="datetime-local" />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Notes</label>
          <input className="form-input" placeholder="Any special instructions..." />
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary btn-sm" onClick={onClose}>Create Trip + Notify Driver</button>
      </div>
    </div>
  </div>
);

const Trips = () => {
  const [filter, setFilter]     = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected]  = useState(null);

  const filtered =
    filter === "all"
      ? mockData.trips
      : mockData.trips.filter((t) => t.status === filter);

  return (
    <div className="page-content">
      <div className="flex items-center justify-between mb-4">
        <div className="tabs" style={{ margin: 0, border: "none" }}>
          {[["all","All Trips"],["in_progress","Active"],["completed","Completed"],["cancelled","Cancelled"]].map(([v, l]) => (
            <button
              key={v}
              className={`tab-btn ${filter === v ? "active" : ""}`}
              onClick={() => setFilter(v)}
            >
              {l}
            </button>
          ))}
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal("create")}>
          + New Trip
        </button>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Trip ID</th><th>Route</th><th>Driver / Truck</th>
                <th>Customer</th><th>Cargo</th><th>Status</th>
                <th>Freight</th><th>POD</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr
                  key={t.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => { setSelected(t); setShowModal("detail"); }}
                >
                  <td><span className="font-semibold text-accent">{t.id}</span></td>
                  <td>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{t.from}</div>
                    <div className="text-xs text-muted">→ {t.to} · {t.dist}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: 13 }}>{t.driver}</div>
                    <div className="text-xs text-muted">{t.truck}</div>
                  </td>
                  <td style={{ fontSize: 13 }}>{t.customer}</td>
                  <td>
                    <div style={{ fontSize: 13 }}>{t.cargo}</div>
                    <div className="text-xs text-muted">{t.weight}</div>
                  </td>
                  <td><StatusBadge status={t.status} /></td>
                  <td><span className="font-semibold">₹{fmt(t.freight)}</span></td>
                  <td>
                    <span className={`badge ${t.pod ? "green" : "yellow"}`}>
                      <span className="badge-dot"></span>
                      {t.pod ? "Done" : "Pending"}
                    </span>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => { setSelected(t); setShowModal("detail"); }}
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
