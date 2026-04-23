import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "./context/AppProvider";
import "./index.css";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

import Dashboard from "./pages/Dashboard";
import Trips from "./pages/Trips";
import Tracking from "./pages/Tracking";
import Drivers from "./pages/Drivers";
import Fleet from "./pages/Fleet";
import Marketplace from "./pages/Marketplace";
import Expenses from "./pages/Expenses";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import Billing from "./pages/Billing";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

const PAGE_MAP = {
  dashboard: Dashboard,
  trips: Trips,
  tracking: Tracking,
  drivers: Drivers,
  fleet: Fleet,
  marketplace: Marketplace,
  expenses: Expenses,
  customers: Customers,
  analytics: Analytics,
  billing: Billing,
  settings: Settings,
};

// Role-based page access — define which roles can see each page
const PAGE_ROLES = {
  dashboard: [],         // all authenticated users
  trips: [],
  tracking: [],
  drivers: ["ADMIN"],
  fleet: ["ADMIN"],
  marketplace: [],
  expenses: ["ADMIN"],
  customers: ["ADMIN"],
  analytics: ["ADMIN"],
  billing: ["ADMIN"],
  settings: [],
};

function App() {
  const [activePage, setActivePage] = useState(null);
  const { authToken, isLoading, user } = useAppContext();

  const userRole = user?.role?.toUpperCase();

  const getDefaultPage = () => {
    if (userRole === "ADMIN") return "dashboard";
    if (userRole === "DRIVER") return "trips";
    return "dashboard"; // fallback
  };

  const currentPage = activePage ?? getDefaultPage();
  const CurrentPage = PAGE_MAP[currentPage];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <div className="text-lg text-gray-300 font-medium">Loading...</div>
        </div>
      </div>
    );
  }

  // Not logged in — show login page
  if (!authToken) {
    return <Login />;
  }

  // Role-based nav guard
  const handleNav = (page) => {
    const allowedRoles = PAGE_ROLES[page] ?? [];
    const isAllowed =
      allowedRoles.length === 0 || allowedRoles.includes(userRole);

    if (isAllowed) {
      setActivePage(page);
    } else {
      setActivePage(getDefaultPage()); // redirect to default if not allowed
    }
  };

  // Guard current page on direct access or role change
  const allowedRoles = PAGE_ROLES[currentPage] ?? [];
  const isCurrentPageAllowed =
    allowedRoles.length === 0 || allowedRoles.includes(userRole);

  const safePage = isCurrentPageAllowed ? currentPage : getDefaultPage();
  const SafeCurrentPage = PAGE_MAP[safePage];

  return (
    <div className="flex h-screen bg-gray-900">

      {/* Sidebar */}
      <Sidebar
        activePage={safePage}
        onNav={handleNav}
        userRole={userRole}
        onLogout={() => setActivePage(null)} // Clear active page on logout
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Header */}
        <Header activePage={safePage} />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <SafeCurrentPage />
        </div>

      </div>
    </div>
  );
}

export default App;