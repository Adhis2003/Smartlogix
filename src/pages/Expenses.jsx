// src/pages/Expenses.jsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { mockData } from "../data/mockData";
import { fmt } from "../utils/helpers";

const TYPE_ICON  = { fuel: "⛽", toll: "🛣️", maintenance: "🔧" };
const TYPE_COLOR = { fuel: "orange", toll: "blue", maintenance: "red" };

const expByType = [
  { type: "Fuel",        amount: 9800 },
  { type: "Toll",        amount: 1300 },
  { type: "Maintenance", amount: 1800 },
];

const Expenses = () => (
  <div className="page-content">
    <div className="stats-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
      {[
        { label: "Total Expenses (Trip)", val: "₹12,900", icon: "💸", cls: "orange" },
        { label: "Fuel Costs",            val: "₹9,800",  icon: "⛽", cls: "yellow" },
        { label: "Toll Charges",          val: "₹1,300",  icon: "🛣️", cls: "blue"   },
        { label: "Maintenance",           val: "₹1,800",  icon: "🔧", cls: "red"    },
      ].map(({ label, val, icon, cls }) => (
        <div key={label} className={`stat-card ${cls}`}>
          <div className="stat-label">{label}</div>
          <div className="stat-value" style={{ fontSize: 22 }}>{val}</div>
          <div className="stat-icon">{icon}</div>
        </div>
      ))}
    </div>

    <div className="grid-2 mb-0">
      <div className="card">
        <div className="card-header"><div className="card-title">Expense Breakdown</div></div>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={expByType} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="type" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => "₹" + v / 1000 + "k"} />
              <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} formatter={(v) => "₹" + fmt(v)} />
              <Bar dataKey="amount" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><div className="card-title">Pending Verifications</div></div>
        <div className="card-body" style={{ paddingTop: 12 }}>
          {mockData.expenses.filter((e) => !e.verified).map((e) => (
            <div key={e.id} className="flex items-center gap-3" style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontSize: 20 }}>{TYPE_ICON[e.type]}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{e.desc}</div>
                <div className="text-xs text-muted">{e.driver} · {e.trip}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-accent">₹{fmt(e.amount)}</div>
                <div className="flex gap-1 mt-1">
                  <button className="btn btn-success btn-sm" style={{ padding: "3px 8px", fontSize: 11 }}>✓</button>
                  <button className="btn btn-danger  btn-sm" style={{ padding: "3px 8px", fontSize: 11 }}>✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="card mt-4">
      <div className="card-header">
        <div className="card-title">All Expenses</div>
        <button className="btn btn-secondary btn-sm">Export CSV</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Expense ID</th><th>Trip</th><th>Driver</th><th>Type</th>
              <th>Description</th><th>Amount</th><th>Date</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockData.expenses.map((e) => (
              <tr key={e.id}>
                <td className="text-accent font-semibold">{e.id}</td>
                <td className="text-sm text-secondary">{e.trip}</td>
                <td className="text-sm">{e.driver}</td>
                <td>
                  <span className={`badge ${TYPE_COLOR[e.type]}`}>
                    {TYPE_ICON[e.type]} {e.type.charAt(0).toUpperCase() + e.type.slice(1)}
                  </span>
                </td>
                <td className="text-sm text-secondary">{e.desc}</td>
                <td className="font-semibold">₹{fmt(e.amount)}</td>
                <td className="text-sm text-muted">{e.date}</td>
                <td>
                  <span className={`badge ${e.verified ? "green" : "yellow"}`}>
                    <span className="badge-dot"></span>
                    {e.verified ? "Verified" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Expenses;
