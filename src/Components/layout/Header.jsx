import React, { useState, useRef, useEffect, useCallback } from "react";
import { Search, Bell, HelpCircle, X, CheckCheck, Truck } from "lucide-react";
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
  analytics:   { title: "Analytics",         sub: "Fleet performance and business metrics" },
  billing:     { title: "Billing & Invoicing", sub: "Subscriptions, invoices and revenue" },
  settings:    { title: "Settings",          sub: "Company profile and configurations" },
};

/* ─── Notification Item ─────────────────────────────────── */
const NotifItem = ({ n, onMarkRead }) => (
  <div
    className={`flex gap-3 px-4 py-3 border-b border-gray-700/50 transition-colors duration-150
      ${!n.read ? "bg-blue-500/5 hover:bg-blue-500/10" : "hover:bg-gray-700/40"}`}
  >
    <span className="text-base leading-none mt-0.5 shrink-0">{n.icon}</span>
    <div className="flex-1 min-w-0">
      <p className={`text-xs leading-relaxed ${!n.read ? "text-white" : "text-gray-400"}`}>
        {n.msg}
      </p>
      <p className="text-[10px] text-gray-500 mt-0.5">{n.time}</p>
    </div>
    {!n.read && (
      <button
        onClick={() => onMarkRead?.(n.id)}
        className="shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 hover:bg-blue-300 transition-colors"
        title="Mark as read"
      />
    )}
  </div>
);

/* ─── Header ─────────────────────────────────────────────── */
const Header = ({ activePage }) => {
  const [showNotif, setShowNotif]   = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(mockData.notifications);
  const notifRef  = useRef(null);
  const searchRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const meta = PAGE_META[activePage] ?? {};

  /* Close panel on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Keyboard shortcut: Ctrl/Cmd + K to focus search */
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const markOneRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  return (
    <header className="flex items-center justify-between px-5 py-3 bg-gray-900 border-b border-gray-700/80 backdrop-blur-sm">

      {/* ── Brand + Page title ── */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 pr-3 border-r border-gray-700">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
            <Truck size={14} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-xs font-bold text-blue-400 tracking-widest uppercase hidden sm:block">
            SmartLogix
          </span>
        </div>
        <div>
          <h1 className="text-sm font-semibold text-white leading-tight">
            {meta.title}
          </h1>
          <p className="text-[11px] text-gray-400 leading-tight hidden sm:block">
            {meta.sub}
          </p>
        </div>
      </div>

      {/* ── Right controls ── */}
      <div className="flex items-center gap-2">

        {/* Search */}
        <div className="relative hidden md:flex items-center">
          <Search
            size={13}
            className="absolute left-3 text-gray-500 pointer-events-none"
          />
          <input
            ref={searchRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-52 bg-gray-800/80 border border-gray-700 hover:border-gray-600 focus:border-blue-500
              pl-8 pr-8 py-1.5 rounded-lg text-xs text-white placeholder-gray-500
              outline-none transition-all duration-200 focus:w-64 focus:bg-gray-800"
            placeholder="Search trips, drivers…"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 text-gray-500 hover:text-gray-300 transition-colors"
            >
              <X size={12} />
            </button>
          )}
          <kbd className="absolute right-2 text-[9px] text-gray-600 font-mono pointer-events-none select-none hidden">
            ⌘K
          </kbd>
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotif((v) => !v)}
            aria-label="Notifications"
            className={`relative p-2 rounded-lg border transition-all duration-150
              ${showNotif
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-800/80 border-gray-700 hover:bg-gray-700 hover:border-gray-600"}`}
          >
            <Bell
              size={16}
              className={unreadCount > 0 ? "text-blue-400" : "text-gray-400"}
              strokeWidth={unreadCount > 0 ? 2.5 : 2}
            />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-gray-900 animate-pulse" />
            )}
          </button>

          {/* Dropdown */}
          {showNotif && (
            <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl shadow-black/40 z-50 overflow-hidden">

              {/* Panel header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-700 bg-gray-800/90">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-red-500 text-white font-bold px-1.5 py-0.5 rounded-full leading-none">
                      {unreadCount}
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <CheckCheck size={12} />
                    Mark all read
                  </button>
                )}
              </div>

              {/* Items */}
              <div className="max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-xs text-gray-500">
                    No notifications
                  </div>
                ) : (
                  notifications.map((n) => (
                    <NotifItem key={n.id} n={n} onMarkRead={markOneRead} />
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-gray-700 bg-gray-800/60">
                <button className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors w-full text-center">
                  View all notifications →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help */}
        <button
          aria-label="Help"
          className="p-2 bg-gray-800/80 rounded-lg border border-gray-700 hover:bg-gray-700 hover:border-gray-600 transition-all duration-150"
        >
          <HelpCircle size={16} className="text-gray-400" />
        </button>

      </div>
    </header>
  );
};

export default Header;