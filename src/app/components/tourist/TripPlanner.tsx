import { useState } from "react";
import { Calendar, DollarSign, MapPin, Users, Loader, CheckCircle, Clock, Star } from "lucide-react";
import { useLang } from "../../context/LanguageContext";

const DESTINATIONS = [
  "Full Sylhet Circuit",
  "Sreemangal Tea Trail",
  "Ratargul & Jaflong",
  "Haor Adventure (Tanguar Haor)",
  "Spiritual & Heritage Tour",
  "Budget Weekend Getaway",
  "Photography Expedition",
];

type DayPlan = { day: number; title: string; items: string[]; cost: number };
type Itinerary = { title: string; days: DayPlan[]; totalCost: number; tips: string[] };

function generateItinerary(destination: string, budget: number, days: number, groupSize: number): Itinerary {
  const plans: Record<string, DayPlan[]> = {
    "Sreemangal Tea Trail": [
      { day: 1, title: "Arrival & Tea Estates", items: ["Check in to tea garden resort", "Guided walk through Finlay Tea Estate", "Sunset at Madhabpur Lake", "Tea tasting session"], cost: Math.round(budget * 0.3) },
      { day: 2, title: "Lawachara & Local Culture", items: ["Early morning Lawachara Forest trek (Hoolock Gibbons!)", "Visit Tribhuj Reservoir", "Lunch at local tea cabin", "Evening cultural show"], cost: Math.round(budget * 0.25) },
      { day: 3, title: "Hidden Tea Gardens & Return", items: ["Visit Satchari National Park", "Breakfast at 7-layer tea shop", "Souvenir shopping at Sreemangal market", "Return journey"], cost: Math.round(budget * 0.45) },
    ],
    "Ratargul & Jaflong": [
      { day: 1, title: "Ratargul Swamp Forest", items: ["Early morning boat ride through swamp forest", "Photography of submerged trees", "Lunch in Sylhet city", "Evening at Osmani Museum"], cost: Math.round(budget * 0.35) },
      { day: 2, title: "Jaflong & Stone Country", items: ["Drive to Jaflong (1.5 hrs)", "River view of India border", "Stone collection area", "Boat ride on Piyain River", "Visit Kean Bridge"], cost: Math.round(budget * 0.35) },
      { day: 3, title: "Bholaganj & Return", items: ["White stone quarries (Bholaganj Sada Pathor)", "Crystal clear river swim", "Local fish lunch", "Return & souvenir shopping"], cost: Math.round(budget * 0.3) },
    ],
    "Haor Adventure (Tanguar Haor)": [
      { day: 1, title: "Journey to Sunamganj", items: ["Bus to Sunamganj (2 hrs)", "Houseboat hire (overnight)", "Sunset cruise on haor", "Local fish BBQ dinner"], cost: Math.round(budget * 0.4) },
      { day: 2, title: "Deep Haor Exploration", items: ["Dawn birdwatching (migratory birds)", "Visit Shimar Beel", "Floating village visit", "Fishing with locals"], cost: Math.round(budget * 0.35) },
      { day: 3, title: "Return & Shah Jalal", items: ["Morning haor panorama", "Visit Dargah of Shah Jalal (Sylhet)", "Traditional Sylheti lunch", "Return home"], cost: Math.round(budget * 0.25) },
    ],
  };

  const defaultPlan: DayPlan[] = Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    title: i === 0 ? "Arrival & Orientation" : i === days - 1 ? "Leisure & Departure" : `Day ${i + 1} Exploration`,
    items: i === 0
      ? ["Check in to accommodation", "Explore Sylhet city center", "Visit Shah Jalal Dargah", "Evening at Rose Garden"]
      : i === days - 1
      ? ["Morning free time", "Souvenir shopping", "Local lunch", "Departure"]
      : ["Guided tour of key attractions", "Local cuisine tasting", "Cultural experience", "Evening walk"],
    cost: Math.round(budget / days),
  }));

  const selectedPlan = plans[destination] || defaultPlan;

  return {
    title: `${destination} — ${days}-Day Itinerary for ${groupSize} Person${groupSize > 1 ? "s" : ""}`,
    days: selectedPlan.slice(0, days),
    totalCost: budget,
    tips: [
      "Book guides at least 3 days in advance via SylhetGo",
      "Carry cash — ATMs are scarce outside Sylhet city",
      "Best months: October to March for most attractions",
      "Download offline maps before leaving the city",
      `Group of ${groupSize}: split transport costs for better value`,
    ],
  };
}

export function TripPlanner() {
  const { tx } = useLang();
  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    groupSize: "2",
  });
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const calcDays = () => {
    if (!form.startDate || !form.endDate) return 3;
    const diff = Math.ceil((new Date(form.endDate).getTime() - new Date(form.startDate).getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(1, Math.min(diff, 7));
  };

  const handleGenerate = async () => {
    if (!form.destination || !form.budget) return;
    setLoading(true);
    setItinerary(null);
    setSaved(false);

    // Save to DB
    try {
import { API_ENDPOINTS } from "@/config";

// Then:
await fetch(API_ENDPOINTS.tripPlan, {        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: form.destination,
          start_date: form.startDate || null,
          end_date: form.endDate || null,
          budget: parseInt(form.budget),
          group_size: parseInt(form.groupSize),
        }),
      });
    } catch {}

    setTimeout(() => {
      const plan = generateItinerary(form.destination, parseInt(form.budget), calcDays(), parseInt(form.groupSize));
      setItinerary(plan);
      setLoading(false);
    }, 1200);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{tx.planner}</h2>
        <p className="text-gray-500 text-sm">Enter your details to generate a personalised day-by-day Sylhet itinerary</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />{tx.destination}
            </label>
            <select
              value={form.destination}
              onChange={e => setForm(p => ({ ...p, destination: e.target.value }))}
              className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
            >
              <option value="">Select a tour package...</option>
              {DESTINATIONS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />Start Date
            </label>
            <input
              type="date"
              value={form.startDate}
              onChange={e => setForm(p => ({ ...p, startDate: e.target.value }))}
              className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />End Date
            </label>
            <input
              type="date"
              value={form.endDate}
              onChange={e => setForm(p => ({ ...p, endDate: e.target.value }))}
              className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 inline mr-1" />{tx.tripBudget} (total)
            </label>
            <input
              type="number"
              value={form.budget}
              onChange={e => setForm(p => ({ ...p, budget: e.target.value }))}
              placeholder="e.g., 15000"
              className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Users className="w-4 h-4 inline mr-1" />{tx.groupSize}
            </label>
            <select
              value={form.groupSize}
              onChange={e => setForm(p => ({ ...p, groupSize: e.target.value }))}
              className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
            >
              {[1,2,3,4,5,6,8,10].map(n => <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>)}
            </select>
          </div>
        </div>

        {form.startDate && form.endDate && (
          <div className="bg-blue-50 rounded-lg p-3 mb-4 text-sm text-blue-700">
            📅 Trip duration: <strong>{calcDays()} day{calcDays() > 1 ? "s" : ""}</strong>
            {form.budget && ` • Budget per day: ৳${Math.round(parseInt(form.budget) / calcDays()).toLocaleString()}`}
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={!form.destination || !form.budget || loading}
          className="w-full bg-[#2ECC71] text-white py-3 rounded-lg hover:bg-[#27AE60] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? <><Loader className="w-5 h-5 animate-spin" /> Generating your itinerary...</> : tx.generatePlan}
        </button>
      </div>

      {/* Generated Itinerary */}
      {itinerary && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-[#0B5345] to-[#2ECC71] text-white rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-1">{itinerary.title}</h3>
            <p className="text-white/80 text-sm">Total budget: ৳{itinerary.totalCost.toLocaleString()}</p>
          </div>

          {itinerary.days.map(day => (
            <div key={day.day} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0B5345] rounded-full flex items-center justify-center text-white font-bold">
                    {day.day}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{day.title}</h4>
                    <p className="text-xs text-gray-500">Est. cost: ৳{day.cost.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[#2ECC71]">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs">Day {day.day}</span>
                </div>
              </div>
              <ul className="space-y-1">
                {day.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-[#2ECC71] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
              <Star className="w-4 h-4" /> Pro Tips for This Trip
            </h4>
            <ul className="space-y-2">
              {itinerary.tips.map((tip, i) => (
                <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
                  <span>💡</span>{tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-[#0B5345] text-white py-3 rounded-lg hover:bg-[#0a4538] transition-colors flex items-center justify-center gap-2"
            >
              {saved ? <><CheckCircle className="w-5 h-5" /> Saved!</> : "💾 Save Itinerary"}
            </button>
            <button
              onClick={handleGenerate}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              🔄 Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
