// src/components/ui/StatusBadge.jsx
import { STATUS_MAP } from "../../utils/helpers";

export const StatusBadge = ({ status }) => {
  const [cls, label] = STATUS_MAP[status] || ["gray", status];
  return (
    <span className={`badge ${cls}`}>
      <span className="badge-dot"></span>
      {label}
    </span>
  );
};

// src/components/ui/Rating.jsx
export const Rating = ({ val }) => (
  <span style={{ color: "#f59e0b", fontWeight: 700, fontSize: 13 }}>★ {val}</span>
);
