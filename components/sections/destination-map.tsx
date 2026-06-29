"use client";

import { useEffect, useRef, useState } from "react";

/* ── Data ─────────────────────────────────────────── */

type IssueType = "missing-trails" | "unclaimed" | "wrong-data" | "street-view" | "success";

// Per-destination display copy lives in dictionaries/{locale}/brands.json under
// visibleTourism.map. Proper place names, coordinates and colours stay in code.
type DestinationCopy = {
  country: string;
  issueBadge: string;
  details: string;
  statLabel: string;
  subItems: string[];
};

export type MapCopy = {
  statsBar: { line1: string; line2: string };
  viz: {
    notOnGoogleMaps: string;
    unclaimedLabel: string;
    unclaimedDescLine1: string;
    unclaimedDescLine2: string;
    noStreetView: string;
    coverageMissing: string;
    incorrectData: string;
    incorrectDataDesc: string;
  };
  panel: { close: string; keyMetrics: string; issuesFound: string };
  default: { count: string; intro: string };
  destinations: Record<string, DestinationCopy>;
};

interface DestinationData {
  id: string;
  name: string;
  flag: string;
  coords: [number, number];
  issueType: IssueType;
  stat: string;
  color: string;
}

const destinations: DestinationData[] = [
  {
    id: "lofoten",
    name: "Lofoten Islands",
    flag: "🇳🇴",
    coords: [68.15, 13.60],
    issueType: "missing-trails",
    stat: "3+",
    color: "#ef4444",
  },
  {
    id: "sodankyla",
    name: "Sodankylä",
    flag: "🇫🇮",
    coords: [67.42, 26.60],
    issueType: "unclaimed",
    stat: "44%",
    color: "#f59e0b",
  },
  {
    id: "siauliai",
    name: "Šiauliai",
    flag: "🇱🇹",
    coords: [55.93, 23.32],
    issueType: "unclaimed",
    stat: "63%",
    color: "#ef4444",
  },
  {
    id: "panevezys",
    name: "Panevėžys",
    flag: "🇱🇹",
    coords: [55.73, 24.36],
    issueType: "missing-trails",
    stat: "82 / 152",
    color: "#8b5cf6",
  },
  {
    id: "bled",
    name: "Bled",
    flag: "🇸🇮",
    coords: [46.37, 14.11],
    issueType: "wrong-data",
    stat: "54 / 165",
    color: "#f59e0b",
  },
  {
    id: "fonyod",
    name: "Fonyód",
    flag: "🇭🇺",
    coords: [46.74, 17.55],
    issueType: "success",
    stat: "206 km",
    color: "#10b981",
  },
  {
    id: "subotica",
    name: "Subotica",
    flag: "🇷🇸",
    coords: [46.10, 19.68],
    issueType: "street-view",
    stat: "10 / 68",
    color: "#3b82f6",
  },
  {
    id: "tiszazug",
    name: "Tiszazug",
    flag: "🇭🇺",
    coords: [46.97, 20.48],
    issueType: "unclaimed",
    stat: "395",
    color: "#f59e0b",
  },
  {
    id: "azores",
    name: "Azores",
    flag: "🇵🇹",
    coords: [38.5, -28.1],
    issueType: "missing-trails",
    stat: "3",
    color: "#0891b2",
  },
];

/* ── Issue panel visuals ─────────────────────────── */

function MissingTrailsViz({ color, label }: { color: string; label: string }) {
  return (
    <svg viewBox="0 0 220 70" className="w-full h-16 rounded-lg overflow-hidden">
      <rect width="220" height="70" fill="#f0f2ee" rx="8" />
      {/* Road lines */}
      <path d="M 10 35 L 65 35" stroke="#d0d4ce" strokeWidth="4" strokeLinecap="round" />
      <path d="M 65 35 L 155 35" stroke={color} strokeWidth="2.5"
            strokeDasharray="7,5" strokeLinecap="round" />
      <path d="M 155 35 L 210 35" stroke="#d0d4ce" strokeWidth="4" strokeLinecap="round" />
      {/* Destination dot */}
      <circle cx="210" cy="35" r="7" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.5" />
      <text x="112" y="22" fill={color} fontSize="9" textAnchor="middle"
            fontFamily="monospace" fontWeight="bold">{label}</text>
      <line x1="112" y1="25" x2="112" y2="33" stroke={color} strokeWidth="1" strokeDasharray="2,2" />
    </svg>
  );
}

function UnclaimedViz({ stat, color, label, descLine1, descLine2 }: {
  stat: string;
  color: string;
  label: string;
  descLine1: string;
  descLine2: string;
}) {
  const pct = parseFloat(stat.replace("%", "").replace(/\s.+/, ""));
  const r = 28;
  const circ = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 72 72" className="w-16 h-16 shrink-0">
        <circle cx="36" cy="36" r={r} fill="none" stroke="#f3f4f6" strokeWidth="7" />
        <circle
          cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="7"
          strokeDasharray={`${(pct / 100) * circ} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
        />
        <text x="36" y="40" textAnchor="middle" fill={color}
              fontSize="13" fontWeight="bold" fontFamily="monospace">
          {stat.split(" ")[0]}
        </text>
      </svg>
      <div>
        <p className="text-xs font-bold text-slate-700">{label}</p>
        <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
          {descLine1}<br />{descLine2}
        </p>
      </div>
    </div>
  );
}

function SuccessViz({ stat, statLabel, subItems, color }: {
  stat: string;
  statLabel: string;
  subItems: string[];
  color: string;
}) {
  return (
    <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-4">
      <div className="shrink-0">
        <p className="font-display text-2xl font-bold leading-tight" style={{ color }}>{stat}</p>
        <p className="text-[10px] font-mono text-emerald-700 mt-0.5 max-w-[90px] leading-snug">{statLabel}</p>
      </div>
      <div className="flex-1 flex flex-col gap-1.5">
        {subItems.map((item, i) => (
          <div key={i} className="flex items-start gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1" />
            <span className="text-[10px] text-emerald-800 font-mono leading-snug">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StreetViewViz({ label, sublabel }: { label: string; sublabel: string }) {
  return (
    <svg viewBox="0 0 220 70" className="w-full h-16 rounded-lg overflow-hidden">
      <rect width="220" height="70" fill="#e8f4fd" rx="8" />
      {/* Road grid */}
      <rect x="0" y="28" width="220" height="14" fill="#f5f5f0" />
      <rect x="85" y="0" width="50" height="70" fill="#f5f5f0" />
      {/* Covered segments */}
      <rect x="0" y="32" width="80" height="6" fill="#3b82f6" fillOpacity="0.5" rx="2" />
      <rect x="90" y="0" width="6" height="28" fill="#3b82f6" fillOpacity="0.5" rx="2" />
      {/* Gap label */}
      <text x="145" y="40" fill="#3b82f6" fontSize="8" textAnchor="middle"
            fontFamily="monospace" fontWeight="bold">{label}</text>
      <text x="145" y="50" fill="#9ca3af" fontSize="7" textAnchor="middle" fontFamily="monospace">
        {sublabel}
      </text>
    </svg>
  );
}

function WrongDataViz({ color, title, desc }: { color: string; title: string; desc: string }) {
  return (
    <div className="rounded-xl border-2 bg-amber-50 p-3 flex items-start gap-3" style={{ borderColor: color }}>
      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
           style={{ background: color }}>
        <span className="text-white text-sm font-bold">!</span>
      </div>
      <div>
        <p className="text-xs font-bold text-slate-800">{title}</p>
        <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
          {desc}
        </p>
      </div>
    </div>
  );
}

function IssuePanel({ dest, copy, t, onClose }: {
  dest: DestinationData;
  copy: DestinationCopy;
  t: MapCopy;
  onClose: () => void;
}) {
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-5 border-b border-foreground/8 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-lg">{dest.flag}</span>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
              {copy.country}
            </span>
          </div>
          <h4 className="font-display text-[#334F5A] text-lg leading-tight">{dest.name}</h4>
          <span
            className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold text-white"
            style={{ background: dest.color }}
          >
            {copy.issueBadge}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors shrink-0 mt-1"
          aria-label={t.panel.close}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Visual */}
      <div className="p-5 border-b border-foreground/8">
        {dest.issueType === "missing-trails" && (
          <MissingTrailsViz color={dest.color} label={t.viz.notOnGoogleMaps} />
        )}
        {dest.issueType === "unclaimed" && (
          <UnclaimedViz
            stat={dest.stat}
            color={dest.color}
            label={t.viz.unclaimedLabel}
            descLine1={t.viz.unclaimedDescLine1}
            descLine2={t.viz.unclaimedDescLine2}
          />
        )}
        {dest.issueType === "success" && (
          <SuccessViz
            stat={dest.stat}
            statLabel={copy.statLabel}
            subItems={copy.subItems}
            color={dest.color}
          />
        )}
        {dest.issueType === "street-view" && (
          <StreetViewViz label={t.viz.noStreetView} sublabel={t.viz.coverageMissing} />
        )}
        {dest.issueType === "wrong-data" && (
          <WrongDataViz color={dest.color} title={t.viz.incorrectData} desc={t.viz.incorrectDataDesc} />
        )}
      </div>

      {/* Details */}
      <div className="p-5 border-b border-foreground/8">
        <p className="text-xs text-muted-foreground leading-relaxed">{copy.details}</p>
      </div>

      {/* Sub-items */}
      <div className="p-5 border-b border-foreground/8">
        <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground mb-3">
          {dest.issueType === "success" ? t.panel.keyMetrics : t.panel.issuesFound}
        </p>
        <ul className="space-y-2">
          {copy.subItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-[11px] text-slate-700">
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-white"
                style={{ background: dest.color, fontSize: "8px", marginTop: "1px" }}
              >
                {dest.issueType === "success" ? "✓" : "!"}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Stat */}
      <div className="p-5">
        <p className="font-display text-2xl" style={{ color: dest.color }}>{dest.stat}</p>
        <p className="font-mono text-[10px] text-muted-foreground mt-0.5">{copy.statLabel}</p>
      </div>
    </div>
  );
}

function DefaultPanel({ destinations, t }: { destinations: DestinationData[]; t: MapCopy }) {
  return (
    <div className="h-full flex flex-col p-5 overflow-y-auto">
      <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground mb-4">
        {t.default.count}
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
        {t.default.intro}
      </p>
      <div className="space-y-2 mb-6">
        {destinations.map((d) => (
          <div key={d.id} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-foreground/[0.03] border border-foreground/8">
            <span className="text-base shrink-0">{d.flag}</span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#334F5A] truncate">{d.name}</p>
              <p className="text-[10px] font-mono text-muted-foreground truncate">{t.destinations[d.id].issueBadge}</p>
            </div>
            <span
              className="w-2 h-2 rounded-full shrink-0 ml-auto"
              style={{ background: d.color }}
            />
          </div>
        ))}
      </div>
      <div className="mt-auto pt-4 border-t border-foreground/8">
        <a
          href="https://visibletourism.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#334F5A] group"
        >
          visibletourism.com
          <span className="text-[#AAD7E6] group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </div>
  );
}

/* ── Main map component ──────────────────────────── */

export function DestinationMap({ t }: { t: MapCopy }) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletMapRef = useRef<any>(null);
  const [selected, setSelected] = useState<DestinationData | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;
    if (leafletMapRef.current) return;

    // Inject Leaflet CSS once
    if (!document.querySelector("#leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    import("leaflet").then((L) => {
      const map = L.map(mapContainerRef.current!, {
        center: [55, 5],
        zoom: 4,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
      });

      // CartoDB Positron tiles (clean, Google Maps-like, free, no API key)
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "© OpenStreetMap © CARTO",
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      // Zoom control bottom-right
      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Attribution bottom-left, small
      L.control.attribution({ position: "bottomleft", prefix: false })
        .addAttribution("© <a href='https://openstreetmap.org'>OSM</a> © <a href='https://carto.com'>CARTO</a>")
        .addTo(map);

      // Add markers
      destinations.forEach((dest) => {
        const isSuccess = dest.issueType === "success";

        const iconHtml = `
          <div style="position:relative;width:28px;height:36px;cursor:pointer;">
            <svg width="28" height="36" viewBox="0 0 28 36" fill="none"
                 style="display:block;filter:drop-shadow(0 2px 6px rgba(0,0,0,0.28))">
              <path d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.27 21.73 0 14 0z"
                    fill="${dest.color}"/>
              <circle cx="14" cy="14" r="${isSuccess ? 7 : 5}" fill="white"/>
              ${isSuccess
                ? '<path d="M10 14l3 3 5-6" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
                : `<circle cx="14" cy="14" r="2" fill="${dest.color}"/>`
              }
            </svg>
            ${dest.issueType === "unclaimed" && parseFloat(dest.stat) >= 60
              ? `<div style="position:absolute;top:-4px;right:-4px;width:10px;height:10px;background:#ef4444;border-radius:50%;border:2px solid white;"></div>`
              : ""
            }
          </div>
        `;

        const icon = L.divIcon({
          html: iconHtml,
          className: "",
          iconSize: [28, 36],
          iconAnchor: [14, 36],
          popupAnchor: [0, -38],
        });

        const marker = L.marker(dest.coords, { icon }).addTo(map);

        marker.bindTooltip(
          `<div style="font-family:monospace;font-size:11px;font-weight:600;color:#334F5A;padding:2px 4px">${dest.flag} ${dest.name}</div>`,
          {
            permanent: false,
            direction: "top",
            className: "leaflet-tooltip-clean",
            offset: [0, -4],
          }
        );

        marker.on("click", () => {
          setSelected(dest);
        });
      });

      leafletMapRef.current = map;
      setMapReady(true);
    });

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="rounded-2xl border border-foreground/10 overflow-hidden">
      {/* Stats bar */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 px-5 py-3 bg-white border-b border-foreground/8">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#334F5A] shrink-0" />
          <span className="font-mono text-[11px] text-muted-foreground">
            {t.statsBar.line1}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#AAD7E6] shrink-0" />
          <span className="font-mono text-[11px] text-muted-foreground">
            {t.statsBar.line2}
          </span>
        </div>
      </div>

      {/* Map + panel */}
      <div className="flex flex-col lg:flex-row" style={{ height: "480px" }}>
        {/* Map */}
        <div className="flex-1 relative min-h-[280px] lg:min-h-0">
          <div ref={mapContainerRef} className="absolute inset-0" />
          {!mapReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#f0f2ee]">
              <div className="w-7 h-7 border-2 border-[#334F5A]/30 border-t-[#334F5A] rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Issue panel */}
        <div
          className="lg:w-72 xl:w-80 border-t lg:border-t-0 lg:border-l border-foreground/8 bg-white overflow-hidden"
          style={{ minHeight: "200px" }}
        >
          {selected ? (
            <IssuePanel dest={selected} copy={t.destinations[selected.id]} t={t} onClose={() => setSelected(null)} />
          ) : (
            <DefaultPanel destinations={destinations} t={t} />
          )}
        </div>
      </div>

      {/* Custom tooltip style */}
      <style>{`
        .leaflet-tooltip-clean {
          background: white;
          border: 1px solid rgba(51,79,90,0.2);
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          padding: 4px 8px;
        }
        .leaflet-tooltip-clean::before {
          border-top-color: rgba(51,79,90,0.2);
        }
        .leaflet-control-attribution {
          font-size: 9px !important;
          background: rgba(255,255,255,0.8) !important;
        }
      `}</style>
    </div>
  );
}
