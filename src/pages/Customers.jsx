// src/pages/Customers.jsx
import React from "react";
import { mockData } from "../data/mockData";
import { fmt } from "../utils/helpers";

const PLAN_COLOR = { Starter: "gray", Growth: "blue", Pro: "purple", Enterprise: "orange" };

const Customers = () => (
  <div className="page-content">
    <div className="flex items-center justify-between mb-4">
      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", margin: 0, flex: 1, marginRight: 16 }}>
        {[
          { label: "Total Customers",    val: "134", cls: "blue"   },
          { label: "Active This Month",  val: "118", cls: "green"  },
          { label: "Enterprise Plans",   val: "3",   cls: "orange" },
          { label: "Avg. Shipments/mo",  val: "8.4", cls: "purple" },
        ].map(({ label, val, cls }) => (
          <div key={label} className={`stat-card ${cls}`} style={{ padding: 14 }}>
            <div className="stat-label">{label}</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{val}</div>
          </div>
        ))}
      </div>
      <button className="btn btn-primary btn-sm" style={{ whiteSpace: "nowrap" }}>+ Add Customer</button>
    </div>

    <div className="card">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Customer</th><th>Contact</th><th>City</th><th>Plan</th>
              <th>Shipments</th><th>Total Value</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockData.customers.map((c) => (
              <tr key={c.id}>
                <td>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</div>
                  <div className="text-xs text-muted">{c.id}</div>
                </td>
                <td>
                  <div className="text-sm">{c.contact}</div>
                  <div className="text-xs text-muted">{c.phone}</div>
                </td>
                <td className="text-sm">{c.city}</td>
                <td><span className={`badge ${PLAN_COLOR[c.plan]}`}>{c.plan}</span></td>
                <td className="font-semibold">{c.shipments}</td>
                <td className="font-semibold text-green">₹{fmt(c.value)}</td>
                <td>
                  <span className={`badge ${c.status === "active" ? "green" : "gray"}`}>
                    <span className="badge-dot"></span>
                    {c.status === "active" ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <div className="flex gap-1">
                    <button className="btn btn-ghost btn-sm">View</button>
                    <button className="btn btn-ghost btn-sm">📱</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Customers;
