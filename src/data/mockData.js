// src/data/mockData.js

export const mockData = {
  stats: {
    totalTrucks: 47,
    activeTrips: 12,
    driversOnline: 18,
    totalRevenue: 284500,
    monthlyRevenue: 72000,
    pendingPOD: 8,
    fleetUtilization: 76,
    totalCustomers: 134,
  },

  revenue: [
    { month: "Aug", revenue: 42000, expenses: 18000, profit: 24000 },
    { month: "Sep", revenue: 51000, expenses: 21000, profit: 30000 },
    { month: "Oct", revenue: 48000, expenses: 19500, profit: 28500 },
    { month: "Nov", revenue: 63000, expenses: 24000, profit: 39000 },
    { month: "Dec", revenue: 58000, expenses: 22000, profit: 36000 },
    { month: "Jan", revenue: 72000, expenses: 27000, profit: 45000 },
  ],

  fleetPie: [
    { name: "Active", value: 12, color: "#10b981" },
    { name: "Idle", value: 18, color: "#f59e0b" },
    { name: "Maintenance", value: 5, color: "#ef4444" },
    { name: "Unassigned", value: 12, color: "#6366f1" },
  ],

  tripVolume: [
    { day: "Mon", trips: 8 },
    { day: "Tue", trips: 12 },
    { day: "Wed", trips: 10 },
    { day: "Thu", trips: 15 },
    { day: "Fri", trips: 18 },
    { day: "Sat", trips: 14 },
    { day: "Sun", trips: 6 },
  ],

  drivers: [
    { id: "DRV001", name: "Ravi Kumar", phone: "+91 98765 43210", license: "TN01 2019 0012345", truck: "TN01 AB 1234", status: "on_trip", trips: 142, rating: 4.8, joined: "Mar 2024", trip: "TRIP-2401", city: "Chennai → Coimbatore" },
    { id: "DRV002", name: "Murugan S", phone: "+91 87654 32109", license: "TN02 2018 0023456", truck: "TN02 CD 5678", status: "available", trips: 98, rating: 4.6, joined: "May 2024", trip: null, city: "Chennai" },
    { id: "DRV003", name: "Senthil P", phone: "+91 76543 21098", license: "TN03 2021 0034567", truck: "TN03 EF 9012", status: "on_trip", trips: 67, rating: 4.5, joined: "Aug 2024", trip: "TRIP-2400", city: "Pune → Chennai" },
    { id: "DRV004", name: "Anand R", phone: "+91 65432 10987", license: "TN04 2017 0045678", truck: "TN04 GH 3456", status: "offline", trips: 213, rating: 4.9, joined: "Nov 2023", trip: null, city: "—" },
    { id: "DRV005", name: "Karthik M", phone: "+91 54321 09876", license: "TN05 2022 0056789", truck: null, status: "available", trips: 34, rating: 4.3, joined: "Oct 2024", trip: null, city: "Chennai" },
    { id: "DRV006", name: "Vijay S", phone: "+91 99887 76655", license: "TN06 2019 0067890", truck: "TN05 IJ 7890", status: "on_trip", trips: 178, rating: 4.7, joined: "Jan 2024", trip: "TRIP-2403", city: "Hosur → Bangalore" },
  ],

  trucks: [
    { id: "TRK001", num: "TN01 AB 1234", type: "Heavy Duty", cap: "20 Ton", driver: "Ravi Kumar", status: "on_trip", maint: "20 Dec 2024", trips: 142, model: "Tata Prima 4028.S", year: 2021, ins: "30 Jun 2025" },
    { id: "TRK002", num: "TN02 CD 5678", type: "Medium Duty", cap: "10 Ton", driver: "Murugan S", status: "available", maint: "05 Jan 2025", trips: 98, model: "Ashok Leyland 1615", year: 2020, ins: "15 Aug 2025" },
    { id: "TRK003", num: "TN03 EF 9012", type: "Heavy Duty", cap: "25 Ton", driver: "Senthil P", status: "on_trip", maint: "30 Nov 2024", trips: 67, model: "Mahindra Blazo X 40", year: 2022, ins: "20 Jan 2026" },
    { id: "TRK004", num: "TN04 GH 3456", type: "Light Duty", cap: "5 Ton", driver: "Anand R", status: "maintenance", maint: "18 Jan 2025", trips: 213, model: "Eicher Pro 3015", year: 2019, ins: "10 Mar 2025" },
    { id: "TRK005", num: "TN05 IJ 7890", type: "Heavy Duty", cap: "22 Ton", driver: "Vijay S", status: "on_trip", maint: "10 Jan 2025", trips: 178, model: "Tata SIGNA 4825.TK", year: 2023, ins: "05 Apr 2026" },
    { id: "TRK006", num: "TN06 KL 2345", type: "Medium Duty", cap: "12 Ton", driver: null, status: "idle", maint: "01 Dec 2024", trips: 55, model: "BharatBenz 1415R", year: 2021, ins: "20 Nov 2025" },
  ],

  trips: [
    { id: "TRIP-2401", truck: "TN01 AB 1234", driver: "Ravi Kumar", customer: "ABC Textiles Ltd", from: "Chennai Port", to: "Coimbatore", dist: "490 km", status: "in_progress", start: "Today 06:30", eta: "Today 16:00", cargo: "Cotton Bales", weight: "18T", freight: 28000, expenses: 4200, pod: false },
    { id: "TRIP-2400", truck: "TN03 EF 9012", driver: "Senthil P", customer: "Reliance Retail", from: "Pune MIDC", to: "Chennai Perungudi", dist: "1,150 km", status: "in_progress", start: "Yesterday 22:00", eta: "Tomorrow 10:00", cargo: "Consumer Electronics", weight: "15T", freight: 52000, expenses: 8600, pod: false },
    { id: "TRIP-2399", truck: "TN02 CD 5678", driver: "Murugan S", customer: "Sun Pharma", from: "Chennai Ambattur", to: "Madurai", dist: "460 km", status: "completed", start: "18 Jan 09:00", eta: "18 Jan 18:30", cargo: "Pharma Supplies", weight: "8T", freight: 22000, expenses: 3800, pod: true },
    { id: "TRIP-2398", truck: "TN05 IJ 7890", driver: "Vijay S", customer: "HUL", from: "Hosur Factory", to: "Bangalore DC", dist: "40 km", status: "in_progress", start: "Today 08:15", eta: "Today 10:30", cargo: "FMCG Products", weight: "20T", freight: 8500, expenses: 650, pod: false },
    { id: "TRIP-2397", truck: "TN01 AB 1234", driver: "Ravi Kumar", customer: "TVS Motors", from: "Hosur Plant", to: "Chennai Port", dist: "44 km", status: "completed", start: "17 Jan 07:00", eta: "17 Jan 10:00", cargo: "Auto Components", weight: "12T", freight: 12000, expenses: 950, pod: true },
    { id: "TRIP-2396", truck: "TN02 CD 5678", driver: "Murugan S", customer: "Titan Company", from: "Hosur", to: "Delhi NCR", dist: "2,180 km", status: "cancelled", start: "16 Jan 10:00", eta: "—", cargo: "Watches", weight: "6T", freight: 0, expenses: 0, pod: false },
  ],

  loads: [
    { id: "LOAD-891", by: "Global Steel Corp", pickup: "Vizag Port", drop: "Chennai SIPCOT", dist: "725 km", weight: "20T", cargo: "Steel Coils", price: 38000, deadline: "25 Jan", status: "open", bids: 3 },
    { id: "LOAD-890", by: "FreshFarm Produce", pickup: "Nashik", drop: "Chennai APMC", dist: "1,220 km", weight: "10T", cargo: "Fresh Vegetables", price: 45000, deadline: "22 Jan", status: "assigned", bids: 5 },
    { id: "LOAD-889", by: "Textile Hub", pickup: "Tirupur", drop: "Mumbai Port", dist: "1,180 km", weight: "15T", cargo: "Garments (Export)", price: 52000, deadline: "28 Jan", status: "open", bids: 2 },
    { id: "LOAD-888", by: "AutoParts Direct", pickup: "Chennai", drop: "Pune", dist: "1,150 km", weight: "18T", cargo: "Auto Parts", price: 48000, deadline: "30 Jan", status: "completed", bids: 4 },
  ],

  expenses: [
    { id: "EXP-3401", trip: "TRIP-2401", driver: "Ravi Kumar", type: "fuel", amount: 3200, desc: "Diesel 80L @ ₹40", date: "Today", verified: true },
    { id: "EXP-3402", trip: "TRIP-2401", driver: "Ravi Kumar", type: "toll", amount: 850, desc: "Toll - Salem, Erode", date: "Today", verified: true },
    { id: "EXP-3403", trip: "TRIP-2400", driver: "Senthil P", type: "fuel", amount: 6400, desc: "Diesel 160L @ ₹40", date: "Yesterday", verified: true },
    { id: "EXP-3404", trip: "TRIP-2400", driver: "Senthil P", type: "maintenance", amount: 1800, desc: "Tyre puncture repair", date: "Today", verified: false },
    { id: "EXP-3405", trip: "TRIP-2398", driver: "Vijay S", type: "toll", amount: 450, desc: "Hosur Expressway Toll", date: "Today", verified: true },
    { id: "EXP-3406", trip: "TRIP-2398", driver: "Vijay S", type: "fuel", amount: 200, desc: "Top-up 5L diesel", date: "Today", verified: false },
  ],

  customers: [
    { id: "CUST-101", name: "ABC Textiles Ltd", contact: "Rajesh Mehta", phone: "+91 98001 23456", city: "Coimbatore", shipments: 42, value: 386000, plan: "Growth", status: "active" },
    { id: "CUST-102", name: "Reliance Retail", contact: "Priya Sharma", phone: "+91 91234 56789", city: "Mumbai", shipments: 128, value: 2480000, plan: "Enterprise", status: "active" },
    { id: "CUST-103", name: "Sun Pharma", contact: "Anil Gupta", phone: "+91 80987 65432", city: "Mumbai", shipments: 67, value: 940000, plan: "Pro", status: "active" },
    { id: "CUST-104", name: "TVS Motors", contact: "Kumar V", phone: "+91 79876 54321", city: "Hosur", shipments: 210, value: 3200000, plan: "Enterprise", status: "active" },
    { id: "CUST-105", name: "FreshFarm Produce", contact: "Suresh Patil", phone: "+91 99876 54321", city: "Nashik", shipments: 15, value: 92000, plan: "Starter", status: "active" },
    { id: "CUST-106", name: "Textile Hub", contact: "Meena Krishnan", phone: "+91 88765 43210", city: "Tirupur", shipments: 38, value: 285000, plan: "Growth", status: "inactive" },
  ],

  notifications: [
    { id: 1, msg: "Ravi Kumar started TRIP-2401 (Chennai → Coimbatore)", time: "2 min ago", read: false, icon: "🚛" },
    { id: 2, msg: "POD uploaded for TRIP-2399 by Murugan S", time: "45 min ago", read: false, icon: "📄" },
    { id: 3, msg: "Expense approval needed: ₹1,800 maintenance by Senthil P", time: "1 hr ago", read: false, icon: "⚠️" },
    { id: 4, msg: "New load posted: Vizag → Chennai, 20T Steel Coils", time: "2 hr ago", read: true, icon: "📦" },
    { id: 5, msg: "TRIP-2399 completed. Invoice generated.", time: "5 hr ago", read: true, icon: "✅" },
  ],

  plans: [
    { name: "Starter", price: 499, trucks: "1-3 trucks", customers: 45 },
    { name: "Growth", price: 1499, trucks: "Up to 10", customers: 62 },
    { name: "Pro", price: 2999, trucks: "Unlimited", customers: 24 },
    { name: "Enterprise", price: 8000, trucks: "50+", customers: 3 },
  ],
};
