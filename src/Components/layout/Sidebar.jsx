// // src/components/layout/Sidebar.jsx
// import React from "react";

// const NAV_ITEMS = [
//   { id: "dashboard",   label: "Dashboard",    icon: "⬛",  section: "ops" },
//   { id: "trips",       label: "Trips",        icon: "🗺️",  section: "ops", badge: 3,  badgeCls: "accent" },
//   { id: "tracking",    label: "GPS Tracking", icon: "📍",  section: "ops", badge: 3,  badgeCls: "green"  },
//   { id: "drivers",     label: "Drivers",      icon: "👤",  section: "ops" },
//   { id: "fleet",       label: "Fleet",        icon: "🚛",  section: "ops" },
//   { id: "marketplace", label: "Marketplace",  icon: "📦",  section: "ops", badge: 4,  badgeCls: "blue"   },
//   { id: "expenses",    label: "Expenses",     icon: "💸",  section: "finance", badge: 2 },
//   { id: "customers",   label: "Customers",    icon: "🤝",  section: "finance" },
//   { id: "analytics",   label: "Analytics",    icon: "📊",  section: "finance" },
//   { id: "billing",     label: "Billing",      icon: "🧾",  section: "finance" },
//   { id: "settings",    label: "Settings",     icon: "⚙️",  section: "system" },
// ];

// const NavSection = ({ label, items, activePage, onNav }) => (
//   <div className="sidebar-section">
//     <div className="sidebar-section-label">{label}</div>
//     {items.map((n) => (
//       <div
//         key={n.id}
//         className={`nav-item ${activePage === n.id ? "active" : ""}`}
//         onClick={() => onNav(n.id)}
//       >
//         <span className="nav-icon">{n.icon}</span>
//         <span>{n.label}</span>
//         {n.badge && (
//           <span className={`nav-badge ${n.badgeCls || ""}`}>{n.badge}</span>
//         )}
//       </div>
//     ))}
//   </div>
// );

// const Sidebar = ({ activePage, onNav }) => {
//   const ops     = NAV_ITEMS.filter((n) => n.section === "ops");
//   const finance = NAV_ITEMS.filter((n) => n.section === "finance");
//   const system  = NAV_ITEMS.filter((n) => n.section === "system");

//   return (
//     <div className="sidebar">
//       {/* Logo */}
//       <div className="sidebar-logo">
//         <div className="logo-icon">🚛</div>
//         <div>
//           <div className="logo-text">SmartLogix</div>
//           <div className="logo-sub">Transport OS</div>
//         </div>
//       </div>

  

//       {/* Nav */}
//       <div style={{ overflowY: "auto", flex: 1 }}>
//         <NavSection label="Operations"     items={ops}     activePage={activePage} onNav={onNav} />
//         <NavSection label="Finance & Data" items={finance} activePage={activePage} onNav={onNav} />
//         <NavSection label="System"         items={system}  activePage={activePage} onNav={onNav} />
//       </div>

//       {/* User footer */}
//       <div className="sidebar-footer">
//         <div className="user-card">
//           <div className="user-avatar">A</div>
//           <div>
//             <div className="user-name">Admin User</div>
//             <div className="user-role">Fleet Manager · Chennai</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React from "react";

const NAV_ITEMS = [
  { id: "dashboard",   label: "Dashboard",    icon: "⬛",  section: "ops" },
  { id: "trips",       label: "Trips",        icon: "🗺️",  section: "ops", badge: 3 },
  { id: "tracking",    label: "GPS Tracking", icon: "📍",  section: "ops", badge: 3 },
  { id: "drivers",     label: "Drivers",      icon: "👤",  section: "ops" },
  { id: "fleet",       label: "Fleet",        icon: "🚛",  section: "ops" },
  { id: "marketplace", label: "Marketplace",  icon: "📦",  section: "ops", badge: 4 },
  { id: "expenses",    label: "Expenses",     icon: "💸",  section: "finance", badge: 2 },
  { id: "customers",   label: "Customers",    icon: "🤝",  section: "finance" },
  { id: "analytics",   label: "Analytics",    icon: "📊",  section: "finance" },
  { id: "billing",     label: "Billing",      icon: "🧾",  section: "finance" },
  { id: "settings",    label: "Settings",     icon: "⚙️",  section: "system" },
];

const NavSection = ({ label, items, activePage, onNav }) => (
  <div className="mb-4">
    <div className="text-xs text-gray-400 px-3 mb-2 uppercase tracking-wide">
      {label}
    </div>

    <div className="space-y-1">
      {items.map((n) => (
        <div
          key={n.id}
          onClick={() => onNav(n.id)}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
            ${
              activePage === n.id
                ? "bg-orange-500/20 text-orange-400"
                : "text-gray-300 hover:bg-gray-800"
            }`}
        >
          <span className="text-lg">{n.icon}</span>
          <span className="text-sm flex-1">{n.label}</span>

          {n.badge && (
            <span className="text-xs bg-gray-700 px-2 py-0.5 rounded">
              {n.badge}
            </span>
          )}
        </div>
      ))}
    </div>
  </div>
);

const Sidebar = ({ activePage, onNav }) => {
  const ops     = NAV_ITEMS.filter((n) => n.section === "ops");
  const finance = NAV_ITEMS.filter((n) => n.section === "finance");
  const system  = NAV_ITEMS.filter((n) => n.section === "system");

  return (
    <div className="w-64 h-screen bg-gray-900 border-r border-gray-700 flex flex-col">

      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-700">
        <div className="text-2xl">🚛</div>
        <div>
          <div className="text-white font-semibold">SmartLogix</div>
          <div className="text-xs text-gray-400">Transport OS</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-2 py-3">
        <NavSection label="Operations" items={ops} activePage={activePage} onNav={onNav} />
        <NavSection label="Finance & Data" items={finance} activePage={activePage} onNav={onNav} />
        <NavSection label="System" items={system} activePage={activePage} onNav={onNav} />
      </div>

      {/* User Footer */}
      <div className="p-3 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
            A
          </div>
          <div>
            <div className="text-sm text-white">Admin User</div>
            <div className="text-xs text-gray-400">Fleet Manager</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;