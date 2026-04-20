// import { useState } from 'react'
// import './index.css'

// import Sidebar from "./components/layout/Sidebar";
// import Header from "./components/layout/Header";

// import Dashboard from "./pages/Dashboard";
// import Trips from "./pages/Trips";
// import Tracking from "./pages/Tracking";
// import Drivers from "./pages/Drivers";
// import Fleet from "./pages/Fleet";
// import Marketplace from "./pages/Marketplace";
// import Expenses from "./pages/Expenses";
// import Customers from "./pages/Customers";
// import Analytics from "./pages/Analytics";
// import Billing from "./pages/Billing";
// import Settings from "./pages/Settings";

// const PAGE_MAP = {
//   dashboard: Dashboard,
//   trips: Trips,
//   tracking: Tracking,
//   drivers: Drivers,
//   fleet: Fleet,
//   marketplace: Marketplace,
//   expenses: Expenses,
//   customers: Customers,
//   analytics: Analytics,
//   billing: Billing,
//   settings: Settings,
// };

// function App() {
//   const [activePage, setActivePage] = useState("dashboard");

//   const CurrentPage = PAGE_MAP[activePage] || Dashboard;


//   return (
//     <>
//       <div className="app-shell">
//         <Sidebar activePage={activePage} onNav={setActivePage} />

//         <div className="main-content">
//           <Header activePage={activePage} />
//           <CurrentPage />
//         </div>
//       </div>
//     </>
//   )
// }

// export default App



import { useState } from "react";
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

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const CurrentPage = PAGE_MAP[activePage] || Dashboard;

  return (
    <div className="flex h-screen bg-gray-900">

      {/* Sidebar */}
      <Sidebar activePage={activePage} onNav={setActivePage} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Header */}
        <Header activePage={activePage} />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <CurrentPage />
        </div>

      </div>
    </div>
  );
}

export default App;