import React, { useState, useCallback } from "react";
import {
  X, Plus, MapPin, Truck, Users, Package, Link2,
  CheckCircle2, Clock, ArrowRight, Eye, MessageCircle,
  ChevronDown, Filter,
} from "lucide-react";
import { mockData } from "../data/mockData";
import { fmt } from "../utils/helpers";
import { StatusBadge } from "../Components/ui/StatusBadge";

/* ─── Shared field styles ────────────────────────────────── */
const INPUT_CLS =
  "w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg text-white " +
  "placeholder-gray-500 focus:outline-none focus:border-orange-500/60 focus:ring-1 " +
  "focus:ring-orange-500/30 transition-colors duration-150";

const LABEL_CLS =
  "text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1 block";

const Field = ({ label, children }) => (
  <div className="flex flex-col">
    <label className={LABEL_CLS}>{label}</label>
    {children}
  </div>
);

/* ─── POD Badge ──────────────────────────────────────────── */
const PodBadge = ({ pod }) => (
  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-semibold
    ${pod
      ? "bg-green-500/10 text-green-400 border border-green-500/20"
      : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${pod ? "bg-green-400" : "bg-yellow-400 animate-pulse"}`} />
    {pod ? "Done" : "Pending"}
  </span>
);

/* ─── Modal Shell ────────────────────────────────────────── */
const Modal = ({ onClose, children, maxW = "max-w-lg" }) => (
  <div
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    onClick={(e) => e.target === e.currentTarget && onClose()}
  >
    <div className={`bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl shadow-black/60 w-full ${maxW} flex flex-col max-h-[90vh]`}>
      {children}
    </div>
  </div>
);

const ModalHeader = ({ title, subtitle, onClose }) => (
  <div className="flex items-start justify-between px-5 py-4 border-b border-gray-700/80 shrink-0">
    <div>
      <h2 className="text-sm font-bold text-white">{title}</h2>
      {subtitle && <p className="text-[11px] text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
    <button
      onClick={onClose}
      className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-colors"
    >
      <X size={15} />
    </button>
  </div>
);

const ModalFooter = ({ children }) => (
  <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-gray-700/80 shrink-0">
    {children}
  </div>
);

/* ─── Trip Detail Modal ──────────────────────────────────── */
const TripDetailModal = ({ trip, onClose }) => {
  const rows = [
    ["Driver",    trip.driver],
    ["Truck",     trip.truck],
    ["Customer",  trip.customer],
    ["Cargo",     trip.cargo],
    ["Weight",    trip.weight],
    ["Distance",  trip.dist],
    ["Started",   trip.start],
    ["ETA",       trip.eta],
    ["Freight",   "₹" + fmt(trip.freight)],
    ["Expenses",  "₹" + fmt(trip.expenses)],
    ["Net",       "₹" + fmt(trip.freight - trip.expenses)],
  ];

  return (
    <Modal onClose={onClose}>
      <ModalHeader
        title={trip.id}
        subtitle={`${trip.from} → ${trip.to}`}
        onClose={onClose}
      />

      <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4">
        {/* Route banner */}
        <div className="flex items-center gap-3 p-3 bg-gray-800/60 border border-gray-700/60 rounded-xl">
          <div className="flex-1 text-center">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">From</p>
            <p className="text-sm font-bold text-white">{trip.from}</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ArrowRight size={16} className="text-orange-400" />
            <span className="text-[10px] text-gray-600">{trip.dist}</span>
          </div>
          <div className="flex-1 text-center">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">To</p>
            <p className="text-sm font-bold text-white">{trip.to}</p>
          </div>
        </div>

        {/* Detail rows */}
        <div className="space-y-0">
          {rows.map(([k, v], i) => (
            <div key={k}
              className={`flex items-center justify-between py-2.5
                ${i < rows.length - 1 ? "border-b border-gray-800" : ""}`}>
              <span className="text-xs text-gray-500">{k}</span>
              <span className={`text-xs font-semibold
                ${k === "Net" ? "text-green-400" : k === "Expenses" ? "text-red-400" : "text-white"}`}>
                {v}
              </span>
            </div>
          ))}

          {/* POD row */}
          <div className="flex items-center justify-between py-2.5">
            <span className="text-xs text-gray-500">POD Uploaded</span>
            <PodBadge pod={trip.pod} />
          </div>
        </div>

        {/* Tracking link */}
        <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-800/60 border border-gray-700/50 rounded-lg">
          <Link2 size={13} className="text-gray-500 shrink-0" />
          <span className="text-[11px] text-gray-400 font-mono truncate">
            smartlogix.in/track/{trip.id}
          </span>
          <button className="ml-auto text-[10px] text-orange-400 hover:text-orange-300 shrink-0 transition-colors">
            Copy
          </button>
        </div>
      </div>

      <ModalFooter>
        <button onClick={onClose}
          className="px-4 py-2 text-xs font-semibold text-gray-400 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
          Close
        </button>
        {!trip.pod && trip.status === "in_progress" && (
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white
            bg-green-600 hover:bg-green-500 rounded-lg transition-colors">
            <MessageCircle size={13} />
            Send WhatsApp Alert
          </button>
        )}
      </ModalFooter>
    </Modal>
  );
};

/* ─── Create Trip Modal ──────────────────────────────────── */
const CreateTripModal = ({ onClose }) => (
  <Modal onClose={onClose} maxW="max-w-2xl">
    <ModalHeader title="Create New Trip" subtitle="Fill in the details to dispatch a trip" onClose={onClose} />

    <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Customer">
          <div className="relative">
            <select className={INPUT_CLS + " appearance-none pr-8"}>
              <option>ABC Textiles Ltd</option>
              <option>Reliance Retail</option>
              <option>Sun Pharma</option>
              <option>TVS Motors</option>
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </Field>
        <Field label="Truck & Driver">
          <div className="relative">
            <select className={INPUT_CLS + " appearance-none pr-8"}>
              <option>TN01 AB 1234 — Ravi Kumar</option>
              <option>TN02 CD 5678 — Murugan S</option>
              <option>TN06 KL 2345 — Unassigned</option>
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Pickup Location">
          <div className="relative">
            <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input className={INPUT_CLS + " pl-8"} placeholder="Enter pickup address" />
          </div>
        </Field>
        <Field label="Delivery Location">
          <div className="relative">
            <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400" />
            <input className={INPUT_CLS + " pl-8"} placeholder="Enter delivery address" />
          </div>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Cargo Type">
          <div className="relative">
            <Package size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input className={INPUT_CLS + " pl-8"} placeholder="e.g. Cotton Bales" />
          </div>
        </Field>
        <Field label="Weight (Tons)">
          <div className="relative">
            <Truck size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input className={INPUT_CLS + " pl-8"} placeholder="e.g. 18" type="number" />
          </div>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Freight Amount (₹)">
          <input className={INPUT_CLS} placeholder="e.g. 28000" type="number" />
        </Field>
        <Field label="Scheduled Departure">
          <input className={INPUT_CLS} type="datetime-local" />
        </Field>
      </div>

      <Field label="Notes / Special Instructions">
        <textarea
          className={INPUT_CLS + " resize-none"}
          rows={2}
          placeholder="Any special handling instructions..."
        />
      </Field>
    </div>

    <ModalFooter>
      <button onClick={onClose}
        className="px-4 py-2 text-xs font-semibold text-gray-400 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
        Cancel
      </button>
      <button onClick={onClose}
        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white
          bg-orange-500 hover:bg-orange-400 rounded-lg transition-colors shadow-lg shadow-orange-500/20">
        <Plus size={13} />
        Create Trip + Notify Driver
      </button>
    </ModalFooter>
  </Modal>
);

/* ─── Trips Page ─────────────────────────────────────────── */
const TABS = [
  { value: "all",         label: "All Trips" },
  { value: "in_progress", label: "Active" },
  { value: "completed",   label: "Completed" },
  { value: "cancelled",   label: "Cancelled" },
];

const TABLE_HEADERS = [
  "Trip ID", "Route", "Driver / Truck", "Customer",
  "Cargo", "Status", "Freight", "POD", "Action",
];

const Trips = () => {
  const [filter, setFilter]     = useState("all");
  const [showModal, setShowModal] = useState(null);
  const [selected, setSelected]  = useState(null);

  const filtered = filter === "all"
    ? mockData.trips
    : mockData.trips.filter((t) => t.status === filter);

  const openDetail = useCallback((trip) => {
    setSelected(trip);
    setShowModal("detail");
  }, []);

  const tabCount = (val) =>
    val === "all"
      ? mockData.trips.length
      : mockData.trips.filter((t) => t.status === val).length;

  return (
    <div className="p-5 space-y-4">

      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Tabs */}
        <div className="flex gap-0.5 bg-gray-800 border border-gray-700 p-1 rounded-xl">
          {TABS.map(({ value, label }) => {
            const active = filter === value;
            const count = tabCount(value);
            return (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150
                  ${active
                    ? "bg-gray-700 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-300 hover:bg-gray-700/50"}`}
              >
                {label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold
                  ${active ? "bg-orange-500/20 text-orange-400" : "bg-gray-700 text-gray-500"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-400
            bg-gray-800 border border-gray-700 hover:bg-gray-700 rounded-lg transition-colors">
            <Filter size={13} />
            Filter
          </button>
          <button
            onClick={() => setShowModal("create")}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white
              bg-orange-500 hover:bg-orange-400 rounded-lg transition-colors shadow-lg shadow-orange-500/20"
          >
            <Plus size={14} />
            New Trip
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-gray-800/70 border border-gray-700/80 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead>
              <tr className="border-b border-gray-700/80 bg-gray-800/80">
                {TABLE_HEADERS.map((h) => (
                  <th key={h}
                    className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700/60">
              {filtered.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => openDetail(t)}
                  className="hover:bg-gray-700/40 cursor-pointer transition-colors duration-100 group"
                >
                  {/* Trip ID */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-xs font-bold text-orange-400">{t.id}</span>
                  </td>

                  {/* Route */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                      <MapPin size={11} className="text-orange-400 shrink-0" />
                      {t.from}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-0.5 ml-3.5">
                      <ArrowRight size={10} />
                      {t.to}
                      <span className="text-gray-600 ml-1">· {t.dist}</span>
                    </div>
                  </td>

                  {/* Driver / Truck */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-xs text-white">
                      <Users size={11} className="text-gray-500 shrink-0" />
                      {t.driver}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-0.5">
                      <Truck size={10} className="shrink-0" />
                      {t.truck}
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="px-4 py-3 text-xs text-gray-300 whitespace-nowrap">{t.customer}</td>

                  {/* Cargo */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-xs text-white">
                      <Package size={11} className="text-gray-500 shrink-0" />
                      {t.cargo}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5 ml-3.5">{t.weight}</div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3"><StatusBadge status={t.status} /></td>

                  {/* Freight */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-xs font-bold text-white">₹{fmt(t.freight)}</span>
                  </td>

                  {/* POD */}
                  <td className="px-4 py-3"><PodBadge pod={t.pod} /></td>

                  {/* Action */}
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => openDetail(t)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold
                        text-gray-400 hover:text-orange-400 hover:bg-orange-500/10 border border-transparent
                        hover:border-orange-500/20 rounded-lg transition-all duration-150"
                    >
                      <Eye size={12} />
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-xs text-gray-600">
                    No trips found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        <div className="px-4 py-2.5 border-t border-gray-700/60 flex items-center justify-between">
          <span className="text-[11px] text-gray-600">
            Showing {filtered.length} of {mockData.trips.length} trips
          </span>
          <span className="text-[11px] text-gray-600 tabular-nums">
            Page 1 of 1
          </span>
        </div>
      </div>

      {/* ── Modals ── */}
      {showModal === "detail" && selected && (
        <TripDetailModal trip={selected} onClose={() => setShowModal(null)} />
      )}
      {showModal === "create" && (
        <CreateTripModal onClose={() => setShowModal(null)} />
      )}
    </div>
  );
};

export default Trips;