import React, { useState } from "react";
import {
  LayoutDashboard,
  Route,
  MapPin,
  Users,
  Truck,
  ShoppingCart,
  Receipt,
  Building2,
  BarChart3,
  CreditCard,
  Settings,
  ChevronRight,
  LogOut,
  Bell,
} from "lucide-react";
import { useAppContext } from "../../context/AppProvider";
// import { useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", section: "ops", icon: LayoutDashboard },
  { id: "trips", label: "Trips", section: "ops", icon: Route, badge: 3 },
  { id: "tracking", label: "GPS Tracking", section: "ops", icon: MapPin, badge: 3 },
  { id: "drivers", label: "Drivers", section: "ops", icon: Users },
  { id: "fleet", label: "Fleet", section: "ops", icon: Truck },
  { id: "marketplace", label: "Marketplace", section: "ops", icon: ShoppingCart, badge: 4 },
  { id: "expenses", label: "Expenses", section: "finance", icon: Receipt, badge: 2 },
  { id: "customers", label: "Customers", section: "finance", icon: Building2 },
  { id: "analytics", label: "Analytics", section: "finance", icon: BarChart3 },
  { id: "billing", label: "Billing", section: "finance", icon: CreditCard },
  { id: "settings", label: "Settings", section: "system", icon: Settings },
];

const SECTIONS = [
  { key: "ops", label: "Operations" },
  { key: "finance", label: "Finance & Data" },
  { key: "system", label: "System" },
];

/* ─── Nav Item ──────────────────────────────────────────── */
const NavItem = ({ item, isActive, onNav }) => {
  const Icon = item.icon;

  return (
    <button
      onClick={() => onNav(item.id)}
      className={`group w-full flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
        transition-all duration-200 text-left relative overflow-hidden
        ${isActive
          ? "bg-orange-500/15 text-orange-400"
          : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/70"
        }`}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-orange-400 rounded-r-full" />
      )}

      <Icon
        size={16}
        strokeWidth={isActive ? 2.5 : 1.75}
        className={`shrink-0 transition-transform duration-200 group-hover:scale-110
          ${isActive ? "text-orange-400" : "text-gray-500 group-hover:text-gray-300"}`}
      />

      <span className={`text-sm flex-1 font-medium transition-colors duration-150
        ${isActive ? "text-orange-300" : ""}`}>
        {item.label}
      </span>

      {item.badge != null && (
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md leading-none
          ${isActive
            ? "bg-orange-500/30 text-orange-300"
            : "bg-gray-700/80 text-gray-400 group-hover:bg-gray-700"}`}>
          {item.badge}
        </span>
      )}

      {isActive && (
        <ChevronRight size={12} className="text-orange-500/60 shrink-0" />
      )}
    </button>
  );
};

/* ─── Nav Section ───────────────────────────────────────── */
const NavSection = ({ label, items, activePage, onNav }) => (
  <div className="mb-5">
    <p className="text-[10px] font-semibold text-gray-600 px-3 mb-1.5 uppercase tracking-widest">
      {label}
    </p>
    <div className="space-y-0.5">
      {items.map((item) => (
        <NavItem
          key={item.id}
          item={item}
          isActive={activePage === item.id}
          onNav={onNav}
        />
      ))}
    </div>
  </div>
);

/* ─── Sidebar ───────────────────────────────────────────── */
const Sidebar = ({ activePage, onNav,onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAppContext(); // ✅ moved inside component
  // const navigate = useNavigate();           // ✅ moved inside component

  const handleLogout = () => {             // ✅ moved inside component
    logout();
    onLogout();                    // ✅ navigate() not Navigate()
  };

  const totalBadges = NAV_ITEMS.reduce((sum, n) => sum + (n.badge ?? 0), 0);

  return (
    <aside
      className={`${collapsed ? "w-16" : "w-60"} h-screen bg-gray-900 border-r border-gray-700/80
        flex flex-col transition-all duration-300 ease-in-out shrink-0`}
    >
      {/* ── Logo ── */}
      <div className={`flex items-center border-b border-gray-700/80 h-14 px-4
        ${collapsed ? "justify-center" : "gap-3 justify-between"}`}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20">
            <Truck size={15} className="text-white" strokeWidth={2.5} />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-white font-bold text-sm leading-tight tracking-tight">
                SmartLogix
              </div>
              <div className="text-[10px] text-gray-500 font-medium tracking-wide">
                Transport OS
              </div>
            </div>
          )}
        </div>

        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded-md text-gray-600 hover:text-gray-400 hover:bg-gray-800 transition-colors shrink-0"
            title="Collapse sidebar"
          >
            <ChevronRight size={14} className="rotate-180" />
          </button>
        )}
      </div>

      {/* Expand button when collapsed */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="mx-2 mt-3 p-2 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-colors flex items-center justify-center relative"
          title="Expand sidebar"
        >
          <ChevronRight size={14} />
          {totalBadges > 0 && (
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-orange-500 rounded-full" />
          )}
        </button>
      )}

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1 scrollbar-thin scrollbar-thumb-gray-700">
        {collapsed ? (
          NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNav(item.id)}
                title={item.label}
                className={`relative w-full flex items-center justify-center p-2.5 rounded-lg transition-all duration-150
                  ${isActive
                    ? "bg-orange-500/15 text-orange-400"
                    : "text-gray-500 hover:text-gray-300 hover:bg-gray-800"}`}
              >
                <Icon size={16} strokeWidth={isActive ? 2.5 : 1.75} />
                {item.badge != null && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-orange-400 rounded-full" />
                )}
              </button>
            );
          })
        ) : (
          SECTIONS.map(({ key, label }) => (
            <NavSection
              key={key}
              label={label}
              items={NAV_ITEMS.filter((n) => n.section === key)}
              activePage={activePage}
              onNav={onNav}
            />
          ))
        )}
      </nav>

      {/* ── User Footer ── */}
      <div className={`border-t border-gray-700/80 p-3 ${collapsed ? "flex justify-center" : ""}`}>
        {collapsed ? (
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
            {user?.name?.[0]?.toUpperCase() ?? "A"}
          </div>
        ) : (
          <div className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold shadow-md shrink-0">
              {user?.name?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white leading-tight truncate">
                {user?.name ?? "Admin User"}
              </div>
              <div className="text-[10px] text-gray-500 leading-tight truncate">
                {user?.role ?? "Fleet Manager"}
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              <button
                className="p-1.5 rounded-md text-gray-600 hover:text-gray-300 hover:bg-gray-800 transition-colors"
                title="Notifications"
              >
                <Bell size={13} />
              </button>
              {/* ✅ logout is now a standalone button, not nested inside another button */}
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-md text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                title="Sign out"
              >
                <LogOut size={13} />
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;