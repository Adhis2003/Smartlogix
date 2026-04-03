// src/pages/Drivers.jsx
import React, { useState } from "react";
import { mockData } from "../data/mockData";
import { StatusBadge, Rating } from "../Components/ui/StatusBadge";

const DriverModal = ({ d, onClose }) => (
  <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div className="modal">
      <div className="modal-header">
        <div>
          <div className="modal-title">{d.name}</div>
          <div className="text-xs text-muted mt-1">{d.id}</div>
        </div>
        <span className="modal-close" onClick={onClose}>✕</span>
      </div>
      <div className="modal-body">
        <div
          className="flex items-center gap-4 mb-4"
          style={{ background: "var(--bg-secondary)", padding: 16, borderRadius: 10 }}
        >
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, var(--accent), #fb923c)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700 }}>
            {d.name.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{d.name}</div>
            <div className="text-sm text-muted">{d.phone}</div>
            <div className="flex gap-2 mt-1">
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
          <div key={k} className="metric-row">
            <span className="text-sm text-muted">{k}</span>
            <span className="text-sm font-semibold">{v}</span>
          </div>
        ))}
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary btn-sm" onClick={onClose}>Close</button>
        <button className="btn btn-primary btn-sm">📱 Send WhatsApp</button>
      </div>
    </div>
  </div>
);

const AddDriverModal = ({ onClose }) => (
  <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div className="modal">
      <div className="modal-header">
        <div className="modal-title">Add New Driver</div>
        <span className="modal-close" onClick={onClose}>✕</span>
      </div>
      <div className="modal-body">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" placeholder="Driver name" />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input className="form-input" placeholder="+91 XXXXX XXXXX" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">License Number</label>
            <input className="form-input" placeholder="e.g. TN01 2020 0012345" />
          </div>
          <div className="form-group">
            <label className="form-label">Assign Truck</label>
            <select className="form-select">
              <option>— Select Truck —</option>
              <option>TN06 KL 2345</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">License Expiry</label>
          <input className="form-input" type="date" />
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary btn-sm" onClick={onClose}>Add Driver</button>
      </div>
    </div>
  </div>
);

const Drivers = () => {
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd]   = useState(false);

  return (
    <div className="page-content">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-3">
          {[["on_trip","On Trip","orange",3],["available","Available","green",2],["offline","Offline","gray",1]].map(([s, l, c, n]) => (
            <div key={s} className={`badge ${c}`} style={{ padding: "6px 14px", fontSize: 12.5 }}>
              <span className="badge-dot"></span>{l} <strong style={{ marginLeft: 4 }}>{n}</strong>
            </div>
          ))}
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(true)}>+ Add Driver</button>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Driver</th><th>License</th><th>Assigned Truck</th>
                <th>Status</th><th>Trips</th><th>Rating</th>
                <th>Location</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockData.drivers.map((d) => (
                <tr key={d.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, var(--accent), #fb923c)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>
                        {d.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{d.name}</div>
                        <div className="text-xs text-muted">{d.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm text-secondary">{d.license}</td>
                  <td className="text-sm">
                    {d.truck ? <span className="tag">{d.truck}</span> : <span className="text-muted">—</span>}
                  </td>
                  <td><StatusBadge status={d.status} /></td>
                  <td className="font-semibold">{d.trips}</td>
                  <td><Rating val={d.rating} /></td>
                  <td className="text-sm text-secondary">{d.city}</td>
                  <td>
                    <div className="flex gap-1">
                      <button className="btn btn-ghost btn-sm" onClick={() => setSelected(d)}>View</button>
                      <button className="btn btn-ghost btn-sm">📱</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && <DriverModal d={selected} onClose={() => setSelected(null)} />}
      {showAdd  && <AddDriverModal onClose={() => setShowAdd(false)} />}
    </div>
  );
};

export default Drivers;
