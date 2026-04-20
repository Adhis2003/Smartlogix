// src/utils/helpers.js

/** Format number with Indian locale (e.g., 1,00,000) */
export const fmt = (n) => new Intl.NumberFormat("en-IN").format(n);

/** Map status strings to badge classes and display labels */
export const STATUS_MAP = {
  on_trip:     ["orange", "On Trip"],
  available:   ["green",  "Available"],
  offline:     ["gray",   "Offline"],
  maintenance: ["red",    "Maintenance"],
  idle:        ["yellow", "Idle"],
  in_progress: ["blue",   "In Progress"],
  completed:   ["green",  "Completed"],
  cancelled:   ["red",    "Cancelled"],
  open:        ["blue",   "Open"],
  assigned:    ["orange", "Assigned"],
};
