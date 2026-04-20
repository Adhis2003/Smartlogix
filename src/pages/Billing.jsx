// src/pages/Billing.jsx
import React from "react";
import { mockData } from "../data/mockData";
import { fmt } from "../utils/helpers";

const PLAN_COLOR = { Starter: "gray", Growth: "blue", Pro: "purple", Enterprise: "orange" };

const INVOICES = [
  { id: "INV-1201", customer: "Reliance Retail",  trip: "TRIP-2400", amount: 52000, gst: 9360,  total: 61360, due: "27 Jan 2025", status: "unpaid" },
  { id: "INV-1200", customer: "ABC Textiles Ltd",  trip: "TRIP-2399", amount: 22000, gst: 3960,  total: 25960, due: "25 Jan 2025", status: "paid"   },
  { id: "INV-1199", customer: "TVS Motors",        trip: "TRIP-2397", amount: 12000, gst: 2160,  total: 14160, due: "24 Jan 2025", status: "paid"   },
  { id: "INV-1198", customer: "HUL",               trip: "TRIP-2398", amount: 8500,  gst: 1530,  total: 10030, due: "27 Jan 2025", status: "unpaid" },
];

const Billing = () => (
  <div className="page-content">
    <div className="stats-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
      {[
        { label: "MRR (Subscriptions)",   val: "₹1,34,280", cls: "green"  },
        { label: "Outstanding Invoices",  val: "₹71,390",   cls: "red"    },
        { label: "Collected This Month",  val: "₹2,84,500", cls: "blue"   },
        { label: "Marketplace Revenue",   val: "₹12,450",   cls: "orange" },
      ].map(({ label, val, cls }) => (
        <div key={label} className={`stat-card ${cls}`} style={{ padding: 16 }}>
          <div className="stat-label">{label}</div>
          <div className="stat-value" style={{ fontSize: 20 }}>{val}</div>
        </div>
      ))}
    </div>

    <div className="grid-2-1">
      <div className="card">
        <div className="card-header">
          <div className="card-title">Recent Invoices</div>
          <button className="btn btn-primary btn-sm">+ Generate Invoice</button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Invoice</th><th>Customer</th><th>Trip</th>
                <th>Base</th><th>GST</th><th>Total</th>
                <th>Due Date</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {INVOICES.map((inv) => (
                <tr key={inv.id}>
                  <td className="text-accent font-semibold">{inv.id}</td>
                  <td className="text-sm">{inv.customer}</td>
                  <td className="text-sm text-secondary">{inv.trip}</td>
                  <td>₹{fmt(inv.amount)}</td>
                  <td className="text-muted text-sm">₹{fmt(inv.gst)}</td>
                  <td className="font-semibold">₹{fmt(inv.total)}</td>
                  <td className="text-sm text-muted">{inv.due}</td>
                  <td>
                    <span className={`badge ${inv.status === "paid" ? "green" : "yellow"}`}>
                      <span className="badge-dot"></span>
                      {inv.status === "paid" ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><div className="card-title">Subscription Plans</div></div>
        <div style={{ padding: "0 16px 16px" }}>
          {mockData.plans.map((p) => (
            <div key={p.name} className="plan-card" style={{ marginTop: 12 }}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 14 }}>{p.name}</span>
                <span className="font-semibold text-accent">
                  ₹{fmt(p.price)}<span className="text-xs text-muted">/mo</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">{p.trucks}</span>
                <span className={`badge ${PLAN_COLOR[p.name]}`}>{p.customers} customers</span>
              </div>
              <div className="progress-bar mt-2">
                <div className="progress-fill" style={{ width: (p.customers / 134 * 100) + "%", background: "var(--accent)" }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Billing;
