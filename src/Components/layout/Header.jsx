// src/components/layout/Header.jsx
import React, { useState, useRef, useEffect } from "react";
import { mockData } from "../../data/mockData";

const PAGE_META = {
  dashboard:   { title: "Dashboard",         sub: "SmartLogix Transport OS" },
  trips:       { title: "Trip Management",   sub: "Create, track and manage all trips" },
  tracking:    { title: "GPS Tracking",      sub: "Real-time live location of all trucks" },
  drivers:     { title: "Driver Management", sub: "Manage driver profiles and assignments" },
  fleet:       { title: "Fleet Management",  sub: "All vehicles — status, maintenance, details" },
  marketplace: { title: "Load Marketplace",  sub: "Post and assign available loads" },
  expenses:    { title: "Expense Tracking",  sub: "Fuel, toll, maintenance approvals" },
  customers:   { title: "Customers",         sub: "All shippers and their shipment history" },
  analytics:   { title: "Analytics",        sub: "Fleet performance and business metrics" },
  billing:     { title: "Billing & Invoicing", sub: "Subscriptions, invoices and revenue" },
  settings:    { title: "Settings",          sub: "Company profile and configurations" },
};

const Header = ({ activePage }) => {
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef(null);
  const unreadCount = mockData.notifications.filter((n) => !n.read).length;
  const meta = PAGE_META[activePage] || {};

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target))
        setShowNotif(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="header">
      <div>
        <div className="page-title">{meta.title}</div>
        <div className="page-subtitle">{meta.sub}</div>
      </div>

      <div className="header-right">
        <div className="search-bar">
          <span style={{ color: "var(--text-muted)", fontSize: 14 }}>🔍</span>
          <input placeholder="Search trips, drivers, trucks…" />
        </div>

        {/* Notifications */}
        <div style={{ position: "relative" }} ref={notifRef}>
          <div
            className="header-btn"
            onClick={() => setShowNotif((v) => !v)}
          >
            🔔
            {unreadCount > 0 && <span className="notif-dot"></span>}
          </div>

          {showNotif && (
            <div className="notif-panel">
              <div className="notif-header">
                <span className="notif-title">Notifications</span>
                <span className="badge red">{unreadCount} New</span>
              </div>
              {mockData.notifications.map((n) => (
                <div
                  key={n.id}
                  className={`notif-item ${!n.read ? "unread" : ""}`}
                >
                  <div className="notif-icon">{n.icon}</div>
                  <div>
                    <div className="notif-text">{n.msg}</div>
                    <div className="notif-time">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="header-btn">❓</div>
      </div>
    </div>
  );
};

export default Header;
