import { useLang } from "../../context/LanguageContext";
import { Droplets, Sun, CloudRain, AlertTriangle, CheckCircle } from "lucide-react";

const MONTHS = [
  { m: "Jan", level: 15, accessible: true, label: "Low" },
  { m: "Feb", level: 10, accessible: true, label: "Very Low" },
  { m: "Mar", level: 20, accessible: true, label: "Low" },
  { m: "Apr", level: 45, accessible: true, label: "Moderate" },
  { m: "May", level: 75, accessible: false, label: "High" },
  { m: "Jun", level: 95, accessible: false, label: "Very High" },
  { m: "Jul", level: 100, accessible: false, label: "Flooded" },
  { m: "Aug", level: 100, accessible: false, label: "Flooded" },
  { m: "Sep", level: 90, accessible: false, label: "High" },
  { m: "Oct", level: 60, accessible: true, label: "Moderate" },
  { m: "Nov", level: 35, accessible: true, label: "Low" },
  { m: "Dec", level: 20, accessible: true, label: "Very Low" },
];

const HAORS = [
  {
    name: "Tanguar Haor",
    location: "Sunamganj",
    area: "9,727 hectares",
    bestMonths: "Jan–Mar",
    currentStatus: "accessible",
    birds: "212+ migratory species",
    note: "Ramsar Wetland Site. Houseboat tours available.",
  },
  {
    name: "Hakaluki Haor",
    location: "Moulvibazar / Sylhet",
    area: "18,385 hectares",
    bestMonths: "Dec–Mar",
    currentStatus: "accessible",
    birds: "100+ bird species",
    note: "Largest haor in Bangladesh. Fishing community tours.",
  },
  {
    name: "Baikka Beel",
    location: "Sreemangal, Moulvibazar",
    area: "100 hectares",
    bestMonths: "Oct–Mar",
    currentStatus: "accessible",
    birds: "200+ water birds",
    note: "Protected bird sanctuary. Watchtower available.",
  },
];

const currentMonth = new Date().getMonth(); // 0-indexed

export function HaorTracker() {
  const { tx } = useLang();

  const levelColor = (level: number) =>
    level >= 80 ? "bg-red-500" :
    level >= 50 ? "bg-orange-400" :
    level >= 30 ? "bg-yellow-400" :
    "bg-[#2ECC71]";

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Haor Season Tracker</h2>
        <p className="text-gray-500 text-sm">Real water-level guide for Sylhet's haor wetlands — plan your visit month by month</p>
      </div>

      {/* Current month callout */}
      <div className="bg-gradient-to-r from-[#0B5345] to-[#2ECC71] text-white rounded-xl p-5 mb-6 flex items-center gap-4">
        <Droplets className="w-10 h-10 opacity-80 shrink-0" />
        <div>
          <p className="text-white/70 text-sm">Current month: {MONTHS[currentMonth].m}</p>
          <h3 className="text-xl font-bold">Water Level: {MONTHS[currentMonth].label}</h3>
          <p className="text-white/80 text-sm mt-1">
            {MONTHS[currentMonth].accessible
              ? "✅ Haors are currently accessible for tours"
              : "⚠️ Flooding season — boat tours only, some areas closed"}
          </p>
        </div>
      </div>

      {/* Month-by-month bar chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-5 flex items-center gap-2">
          <CloudRain className="w-5 h-5 text-[#0B5345]" /> Water Level by Month
        </h3>
        <div className="flex items-end gap-2 h-32">
          {MONTHS.map((m, i) => (
            <div key={m.m} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full relative flex items-end" style={{ height: "96px" }}>
                <div
                  className={`w-full rounded-t-sm transition-all ${levelColor(m.level)} ${i === currentMonth ? "ring-2 ring-offset-1 ring-[#0B5345]" : ""}`}
                  style={{ height: `${m.level}%` }}
                />
              </div>
              <span className={`text-[10px] font-medium ${i === currentMonth ? "text-[#0B5345] font-bold" : "text-gray-500"}`}>{m.m}</span>
              {m.accessible
                ? <CheckCircle className="w-3 h-3 text-[#2ECC71]" />
                : <AlertTriangle className="w-3 h-3 text-red-400" />
              }
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-[#2ECC71]" /> Accessible</span>
          <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-yellow-400" /> Moderate</span>
          <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-orange-400" /> High water</span>
          <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-red-500" /> Flooded (avoid)</span>
        </div>
      </div>

      {/* Haor listings */}
      <h3 className="font-semibold text-gray-800 mb-4">Major Haors in Sylhet Division</h3>
      <div className="grid grid-cols-1 gap-4">
        {HAORS.map(haor => (
          <div key={haor.name} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-800 text-lg">{haor.name}</h4>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                  <Sun className="w-3 h-3" /> Best season: {haor.bestMonths}
                </p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Accessible
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="bg-[#F8F9F9] rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">{haor.location}</p>
              </div>
              <div className="bg-[#F8F9F9] rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">Area</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">{haor.area}</p>
              </div>
              <div className="bg-[#F8F9F9] rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">Wildlife</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">{haor.birds}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 italic">💡 {haor.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
