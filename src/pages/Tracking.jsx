import React, { useState } from "react";
import {
  MapPin, Truck, Users, Ruler, Clock, Link2,
  MessageCircle, Navigation, Radio, ArrowRight, Copy,
} from "lucide-react";
import { mockData } from "../data/mockData";
import { StatusBadge } from "../Components/ui/StatusBadge";

const GPS_POSITIONS = [
  { top: "35%", left: "42%", name: "Ravi Kumar",  color: "green"  },
  { top: "20%", left: "62%", name: "Senthil P",   color: "orange" },
  { top: "55%", left: "40%", name: "Vijay S",     color: "green"  },
];

/* ─── Map Marker ─────────────────────────────────────────── */
const MapMarker = ({ pos }) => (
  <div className="absolute" style={{ top: pos.top, left: pos.left }}>
    <div className="relative flex items-center justify-center">
      {/* Pulse ring */}
      <span className={`absolute inline-flex h-6 w-6 rounded-full animate-ping opacity-40
        ${pos.color === "green" ? "bg-green-400" : "bg-orange-400"}`} />
      {/* Dot */}
      <span className={`relative inline-flex h-4 w-4 rounded-full border-2 border-gray-900 shadow-lg
        ${pos.color === "green" ? "bg-green-500" : "bg-orange-500"}`} />
      {/* Label */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-1
        bg-gray-900/95 border border-gray-700 text-gray-200 text-[10px] whitespace-nowrap
        px-2 py-1 rounded-lg shadow-lg">
        <Truck size={9} className={pos.color === "green" ? "text-green-400" : "text-orange-400"} />
        {pos.name}
      </div>
    </div>
  </div>
);

/* ─── Trip List Item ─────────────────────────────────────── */
const TripListItem = ({ trip, isSelected, onSelect }) => (
  <div
    onClick={() => onSelect(trip)}
    className={`px-4 py-3.5 cursor-pointer transition-colors duration-150 border-b border-gray-700/60 last:border-0
      ${isSelected ? "bg-orange-500/8 border-l-2 border-l-orange-500" : "hover:bg-gray-700/40"}`}
  >
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-bold text-orange-400">{trip.id}</span>
      <StatusBadge status={trip.status} />
    </div>

    <div className="flex items-center gap-1.5 text-xs text-gray-300 mb-2">
      <MapPin size={10} className="text-orange-400 shrink-0" />
      <span className="font-medium">{trip.from}</span>
      <ArrowRight size={9} className="text-gray-600 shrink-0" />
      <span className="font-medium">{trip.to}</span>
    </div>

    <div className="flex items-center gap-3 text-[11px] text-gray-500 mb-2">
      <span className="flex items-center gap-1"><Users size={10} /> {trip.driver}</span>
      <span className="flex items-center gap-1"><Ruler size={10} /> {trip.dist}</span>
    </div>

    <div className="flex items-center justify-between">
      <span className="flex items-center gap-1 text-[11px] text-gray-500">
        <Clock size={10} />
        ETA: {trip.eta}
      </span>
      <button
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-orange-400
          hover:bg-orange-500/10 px-2 py-1 rounded-md transition-colors"
      >
        <Link2 size={10} />
        Share
      </button>
    </div>
  </div>
);

/* ─── Detail Field ───────────────────────────────────────── */
const DetailField = ({ label, value, Icon }) => (
  <div>
    <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1">{label}</div>
    <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
      {Icon && <Icon size={11} className="text-gray-500 shrink-0" />}
      {value}
    </div>
  </div>
);

/* ─── Tracking Page ──────────────────────────────────────── */
const Tracking = () => {
  const activeTrips = mockData.trips.filter((t) => t.status === "in_progress");
  const [selected, setSelected] = useState(activeTrips[0]);

  return (
    <div className="p-5 space-y-4">

      {/* ── Top grid: Map + Trip list ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">

        {/* Map Card */}
        <div className="bg-gray-800/70 border border-gray-700/80 rounded-xl overflow-hidden">

          {/* Card header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-700/80">
            <div className="flex items-center gap-3">
              <Navigation size={15} className="text-orange-400" />
              <span className="text-sm font-semibold text-white">Live GPS Map</span>

              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>

              <span className="text-xs text-gray-500">Real-time tracking</span>
            </div>

            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold
              bg-green-500/10 text-green-400 border border-green-500/20">
              <Radio size={10} className="animate-pulse" />
              {activeTrips.length} Active
            </span>
          </div>

          {/* Map area */}
          <div className="relative bg-gray-900/50" style={{ height: 380 }}>

            {/* Grid lines */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), " +
                "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />

            {/* India silhouette blob */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="opacity-10 border-2 border-dashed border-gray-500" style={{
                width: 280, height: 320,
                borderRadius: "40% 30% 50% 20% / 30% 40% 30% 50%",
              }} />
            </div>

            {/* GPS markers */}
            {GPS_POSITIONS.map((p, i) => <MapMarker key={i} pos={p} />)}

            {/* Selected trip highlight line (decorative) */}
            {selected && (
              <div className="absolute bottom-4 right-4 flex items-center gap-2
                bg-gray-900/90 border border-gray-700 px-3 py-2 rounded-xl shadow-lg">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[11px] text-gray-300 font-medium">
                  Tracking: {selected.driver}
                </span>
              </div>
            )}

            {/* Map footer */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2
              bg-gray-900/90 border border-gray-700 px-3 py-2 rounded-xl shadow-lg">
              <MapPin size={11} className="text-gray-500" />
              <span className="text-[11px] text-gray-400">
                India · TN, KA, MH
              </span>
            </div>
          </div>
        </div>

        {/* Active Trips list */}
        <div className="bg-gray-800/70 border border-gray-700/80 rounded-xl overflow-hidden flex flex-col">

          <div className="px-4 py-3 border-b border-gray-700/80 flex items-center justify-between shrink-0">
            <span className="text-sm font-semibold text-white">Active Trips</span>
            <span className="text-[11px] text-gray-500">{activeTrips.length} in progress</span>
          </div>

          <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-700">
            {activeTrips.map((t) => (
              <TripListItem
                key={t.id}
                trip={t}
                isSelected={selected?.id === t.id}
                onSelect={setSelected}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Detail bar ── */}
      {selected && (
        <div className="bg-gray-800/70 border border-gray-700/80 rounded-xl overflow-hidden">

          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-700/80">
            <div className="flex items-center gap-2">
              <Truck size={14} className="text-orange-400" />
              <span className="text-sm font-semibold text-white">
                Trip Details —{" "}
                <span className="text-orange-400">{selected.id}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold
                text-gray-400 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg transition-colors">
                <Copy size={12} />
                Copy Tracking Link
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold
                text-white bg-green-600 hover:bg-green-500 rounded-lg transition-colors shadow-lg shadow-green-500/20">
                <MessageCircle size={12} />
                WhatsApp Customer
              </button>
            </div>
          </div>

          <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
            <DetailField label="Route"     value={`${selected.from} → ${selected.to}`} Icon={ArrowRight} />
            <DetailField label="Distance"  value={selected.dist}                        Icon={Ruler} />
            <DetailField label="Driver"    value={selected.driver}                      Icon={Users} />
            <DetailField label="Truck"     value={selected.truck}                       Icon={Truck} />
            <DetailField label="Cargo"     value={`${selected.cargo} (${selected.weight})`} Icon={MapPin} />
            <DetailField label="Customer"  value={selected.customer}                    Icon={Users} />
            <DetailField label="Departure" value={selected.start}                       Icon={Clock} />
            <DetailField label="ETA"       value={selected.eta}                         Icon={Clock} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracking;