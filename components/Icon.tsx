type IconName =
  | "arrow-right"
  | "arrow-down"
  | "building-2"
  | "landmark"
  | "cpu"
  | "chart-column"
  | "timer"
  | "trending-down"
  | "circle-dashed"
  | "gauge"
  | "phone"
  | "message-circle"
  | "mail"
  | "map-pin"
  | "target"
  | "users"
  | "graduation-cap"
  | "radio"
  | "trending-up"
  | "code-xml"
  | "briefcase"
  | "handshake"
  | "chevron-left"
  | "chevron-right"
  | "globe"
  | "menu"
  | "close";

const paths: Record<IconName, React.ReactNode> = {
  "arrow-right": <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  "arrow-down": <><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></>,
  "building-2": <><path d="M10 12h4" /><path d="M10 8h4" /><path d="M14 21v-3a2 2 0 0 0-4 0v3" /><path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" /><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" /></>,
  landmark: <><path d="M10 18v-7" /><path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z" /><path d="M14 18v-7" /><path d="M18 18v-7" /><path d="M3 22h18" /><path d="M6 18v-7" /></>,
  cpu: <><path d="M12 20v2" /><path d="M12 2v2" /><path d="M17 20v2" /><path d="M17 2v2" /><path d="M2 12h2" /><path d="M2 17h2" /><path d="M2 7h2" /><path d="M20 12h2" /><path d="M20 17h2" /><path d="M20 7h2" /><path d="M7 20v2" /><path d="M7 2v2" /><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="8" y="8" width="8" height="8" rx="1" /></>,
  "chart-column": <><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></>,
  timer: <><path d="M10 2h4" /><path d="m12 14 3-3" /><circle cx="12" cy="14" r="8" /></>,
  "trending-down": <><path d="M16 17h6v-6" /><path d="m22 17-8.5-8.5-5 5L2 7" /></>,
  "circle-dashed": <><path d="M10.1 2.182a10 10 0 0 1 3.8 0" /><path d="M13.9 21.818a10 10 0 0 1-3.8 0" /><path d="M17.609 3.721a10 10 0 0 1 2.69 2.7" /><path d="M2.182 13.9a10 10 0 0 1 0-3.8" /><path d="M20.279 17.609a10 10 0 0 1-2.7 2.69" /><path d="M21.818 10.1a10 10 0 0 1 0 3.8" /><path d="M3.721 6.391a10 10 0 0 1 2.7-2.69" /><path d="M6.391 20.279a10 10 0 0 1-2.69-2.7" /></>,
  gauge: <><path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></>,
  phone: <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />,
  "message-circle": <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />,
  mail: <><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></>,
  "map-pin": <><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 1 1 16 0" /><circle cx="12" cy="10" r="3" /></>,
  target: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  "graduation-cap": <><path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /><path d="M22 10v6" /></>,
  radio: <><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" /><path d="M7.8 16.2a5.94 5.94 0 0 1 0-8.4" /><circle cx="12" cy="12" r="2" /><path d="M16.2 7.8a5.94 5.94 0 0 1 0 8.4" /><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" /></>,
  "trending-up": <><path d="m22 7-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></>,
  "code-xml": <><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></>,
  briefcase: <><rect width="20" height="14" x="2" y="7" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><path d="M2 12h20" /><path d="M6 12v3" /><path d="M18 12v3" /></>,
  handshake: <><path d="m11 17 2 2a2 2 0 0 0 3 0l3-3" /><path d="m14 14 2 2a2 2 0 0 0 3 0l3-3a2 2 0 0 0 0-3l-4-4a2 2 0 0 0-3 0l-1 1" /><path d="m3 7 4-4a2 2 0 0 1 3 0l4 4" /><path d="m7 21-4-4a2 2 0 0 1 0-3l7-7a2 2 0 0 1 3 0l2 2" /></>,
  "chevron-left": <path d="m15 18-6-6 6-6" />,
  "chevron-right": <path d="m9 18 6-6-6-6" />,
  globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 0 20" /><path d="M12 2a15.3 15.3 0 0 0 0 20" /></>,
  menu: <><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="18" y2="18" /></>,
  close: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
};

export default function Icon({ name, size = 24, className = "" }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      data-icon={name}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  );
}
