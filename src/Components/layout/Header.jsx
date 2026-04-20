// // src/components/layout/Header.jsx
// import React, { useState, useRef, useEffect } from "react";
// import { mockData } from "../../data/mockData";

// const PAGE_META = {
//   dashboard:   { title: "Dashboard",         sub: "SmartLogix Transport OS" },
//   trips:       { title: "Trip Management",   sub: "Create, track and manage all trips" },
//   tracking:    { title: "GPS Tracking",      sub: "Real-time live location of all trucks" },
//   drivers:     { title: "Driver Management", sub: "Manage driver profiles and assignments" },
//   fleet:       { title: "Fleet Management",  sub: "All vehicles — status, maintenance, details" },
//   marketplace: { title: "Load Marketplace",  sub: "Post and assign available loads" },
//   expenses:    { title: "Expense Tracking",  sub: "Fuel, toll, maintenance approvals" },
//   customers:   { title: "Customers",         sub: "All shippers and their shipment history" },
//   analytics:   { title: "Analytics",        sub: "Fleet performance and business metrics" },
//   billing:     { title: "Billing & Invoicing", sub: "Subscriptions, invoices and revenue" },
//   settings:    { title: "Settings",          sub: "Company profile and configurations" },
// };

// const Header = ({ activePage }) => {
//   const [showNotif, setShowNotif] = useState(false);
//   const notifRef = useRef(null);
//   const unreadCount = mockData.notifications.filter((n) => !n.read).length;
//   const meta = PAGE_META[activePage] || {};

//   useEffect(() => {
//     const handler = (e) => {
//       if (notifRef.current && !notifRef.current.contains(e.target))
//         setShowNotif(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   return (
//     <div className="header">
//       <div>
//         <div className="page-title">{meta.title}</div>
//         <div className="page-subtitle">{meta.sub}</div>
//       </div>

//       <div className="header-right">
//         <div className="search-bar">
//           <span style={{ color: "var(--text-muted)", fontSize: 14 }}>🔍</span>
//           <input placeholder="Search trips, drivers, trucks…" />
//         </div>

//         {/* Notifications */}
//         <div style={{ position: "relative" }} ref={notifRef}>
//           <div
//             className="header-btn"
//             onClick={() => setShowNotif((v) => !v)}
//           >
//             🔔
//             {unreadCount > 0 && <span className="notif-dot"></span>}
//           </div>

//           {showNotif && (
//             <div className="notif-panel">
//               <div className="notif-header">
//                 <span className="notif-title">Notifications</span>
//                 <span className="badge red">{unreadCount} New</span>
//               </div>
//               {mockData.notifications.map((n) => (
//                 <div
//                   key={n.id}
//                   className={`notif-item ${!n.read ? "unread" : ""}`}
//                 >
//                   <div className="notif-icon">{n.icon}</div>
//                   <div>
//                     <div className="notif-text">{n.msg}</div>
//                     <div className="notif-time">{n.time}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="header-btn">❓</div>
//       </div>
//     </div>
//   );
// };

// export default Header;







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
  analytics:   { title: "Analytics",         sub: "Fleet performance and business metrics" },
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
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-700">

      {/* Left */}
      <div>
        <h1 className="text-lg font-semibold text-white">{meta.title}</h1>
        <p className="text-xs text-gray-400">{meta.sub}</p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        {/* Search */}
        <div className="flex items-center bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700">
          <span className="text-gray-400 text-sm mr-2">🔍</span>
          <input
            className="bg-transparent outline-none text-sm text-white placeholder-gray-500"
            placeholder="Search trips, drivers..."
          />
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotif((v) => !v)}
            className="relative p-2 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700"
          >
            🔔
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {showNotif && (
            <div className="absolute right-0 mt-2 w-72 bg-gray-800 border border-gray-700 rounded-xl shadow-lg z-50">

              {/* Header */}
              <div className="flex justify-between items-center px-3 py-2 border-b border-gray-700">
                <span className="text-sm font-semibold text-white">Notifications</span>
                <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded">
                  {unreadCount} New
                </span>
              </div>

              {/* Items */}
              <div className="max-h-60 overflow-y-auto">
                {mockData.notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`flex gap-2 px-3 py-2 text-sm ${
                      !n.read ? "bg-gray-700" : ""
                    }`}
                  >
                    <span>{n.icon}</span>
                    <div>
                      <div className="text-white text-xs">{n.msg}</div>
                      <div className="text-gray-400 text-[10px]">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>

        {/* Help */}
        <button className="p-2 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700">
          ❓
        </button>

      </div>
    </div>
  );
};

export default Header;