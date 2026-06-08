import { useState, useEffect } from "react";
import { Bus, Train, Fuel, MapPin, Clock, DollarSign, Search, RefreshCw } from "lucide-react";
import { useLang } from "../../context/LanguageContext";

type Route = {
  id: number;
  route_type: string;
  from_location: string;
  to_location: string;
  distance_km: number;
  fare_min: number;
  fare_max: number;
  duration: string;
  notes: string;
  schedule: string | null;
};

const TABS = ["cng", "bus", "train"] as const;

export function TransportHub() {
  const { tx } = useLang();
  const [tab, setTab] = useState<typeof TABS[number]>("cng");
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
import { API_ENDPOINTS } from "@/config";

// Then:
fetch(`${API_ENDPOINTS.transport}?type=${tab}`)      .then(r => r.json())
      .then(data => { setRoutes(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [tab]);

  const filtered = routes.filter(r =>
    !search || r.from_location.toLowerCase().includes(search.toLowerCase()) ||
    r.to_location.toLowerCase().includes(search.toLowerCase())
  );

  const tabIcon = { cng: Fuel, bus: Bus, train: Train };
  const tabLabel: Record<string, string> = { cng: tx.cng, bus: tx.bus, train: tx.train };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{tx.transport}</h2>
        <p className="text-gray-500 text-sm">Zone-based fares, bus schedules & train timetables — no surprises</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {TABS.map(t => {
          const Icon = tabIcon[t];
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-colors ${
                tab === t ? "bg-[#0B5345] text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tabLabel[t]}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Filter by location..."
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
        />
      </div>

      {/* Fare Calculator Box */}
      {tab === "cng" && (
        <div className="bg-gradient-to-r from-[#0B5345] to-[#1a7a63] text-white rounded-xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5" />
            <h3 className="font-semibold">Verified Fare Zone</h3>
          </div>
          <p className="text-white/80 text-sm">All CNG fares below are verified by SylhetGo. If charged more, report via the app. Average rate: ৳12–15/km</p>
        </div>
      )}

      {/* Routes Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <RefreshCw className="w-6 h-6 animate-spin text-[#0B5345]" />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#0B5345] text-white">
              <tr>
                <th className="px-5 py-3 text-left text-sm">Route</th>
                <th className="px-5 py-3 text-left text-sm">Distance</th>
                <th className="px-5 py-3 text-left text-sm">Fare (৳)</th>
                <th className="px-5 py-3 text-left text-sm"><Clock className="w-4 h-4 inline mr-1" />Duration</th>
                <th className="px-5 py-3 text-left text-sm">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="py-10 text-center text-gray-400">{tx.noResults}</td></tr>
              ) : filtered.map(r => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#0B5345]" />
                      <span className="font-medium text-sm">{r.from_location} → {r.to_location}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">{r.distance_km} km</td>
                  <td className="px-5 py-3">
                    <span className="font-semibold text-[#0B5345]">৳{r.fare_min}–{r.fare_max}</span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">{r.duration}</td>
                  <td className="px-5 py-3 text-xs text-gray-500 max-w-xs">{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Train schedule special display */}
      {tab === "train" && filtered.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-gray-800 mb-3">Train Schedules</h4>
          <div className="grid grid-cols-1 gap-4">
            {filtered.map(r => {
              let schedule: string[] = [];
              try { schedule = r.schedule ? JSON.parse(r.schedule) : []; } catch {}
              return (
                <div key={r.id} className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-semibold text-gray-800">{r.from_location} → {r.to_location}</h5>
                    <span className="text-[#0B5345] font-semibold text-sm">৳{r.fare_min}–{r.fare_max}</span>
                  </div>
                  {schedule.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {schedule.map((s, i) => (
                        <span key={i} className="px-3 py-1 bg-[#F8F9F9] rounded-full text-xs text-gray-700">
                          🕐 {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
