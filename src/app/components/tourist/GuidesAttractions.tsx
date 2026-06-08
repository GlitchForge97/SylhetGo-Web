import { useState, useEffect } from "react";
import { MapPin, Star, CheckCircle, Gem, Clock, DollarSign, Users, RefreshCw, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { useLang } from "../../context/LanguageContext";
import { API_ENDPOINTS } from "@/config";

type Attraction = {
  id: number;
  name: string;
  type: string;
  location: string;
  distance_from_sylhet: string;
  entry_fee: number;
  best_time: string;
  description: string;
  rating: number;
  tips: string;
  is_hidden_gem: boolean;
};

const guides = [
  { id: 1, name: "Rafiq Ahmed", specialty: "Tea Estate Expert", areas: ["Sreemangal", "Lawachara"], rating: 4.9, tours: 340, languages: "Bengali, English", available: true },
  { id: 2, name: "Anika Rahman", specialty: "Cultural Heritage", areas: ["Sylhet City", "Moulvibazar"], rating: 4.8, tours: 215, languages: "Bengali, English, Arabic", available: true },
  { id: 3, name: "Mohan Das", specialty: "Adventure & Trekking", areas: ["Lawachara", "Jaflong"], rating: 4.9, tours: 428, languages: "Bengali, English, Hindi", available: false },
  { id: 4, name: "Salma Begum", specialty: "Haor Navigation", areas: ["Ratargul", "Tanguar Haor"], rating: 4.7, tours: 182, languages: "Bengali", available: true },
  { id: 5, name: "David Thompson", specialty: "Photography Tours", areas: ["All Sylhet"], rating: 4.8, tours: 96, languages: "English, French", available: true },
];

export function GuidesAttractions() {
  const { tx } = useLang();
  const [tab, setTab] = useState<"guides" | "attractions" | "gems">("attractions");
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    fetch(API_ENDPOINTS.attractions)
      .then(r => r.json())
      .then(data => { setAttractions(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const types = ["all", ...Array.from(new Set(attractions.map(a => a.type)))];
  const mainAttractions = attractions.filter(a => !a.is_hidden_gem && (typeFilter === "all" || a.type === typeFilter));
  const hiddenGems = attractions.filter(a => a.is_hidden_gem);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{tx.guides}</h2>
        <p className="text-gray-500 text-sm">Verified guides, must-see attractions & secret local spots</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { key: "attractions", label: "Attractions" },
          { key: "gems", label: `✨ ${tx.hiddenGem}` },
          { key: "guides", label: "Verified Guides" },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as typeof tab)}
            className={`px-5 py-2.5 rounded-lg transition-colors text-sm ${tab === t.key ? "bg-[#0B5345] text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <RefreshCw className="w-6 h-6 animate-spin text-[#0B5345]" />
        </div>
      ) : (
        <>
          {/* Attractions Tab */}
          {tab === "attractions" && (
            <>
              <div className="flex flex-wrap gap-2 mb-5">
                {types.map(t => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`px-3 py-1 rounded-full text-sm capitalize transition-colors ${typeFilter === t ? "bg-[#2ECC71] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mainAttractions.map(a => (
                  <div key={a.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{a.name}</h4>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{a.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{a.distance_from_sylhet}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{a.best_time}</span>
                      <span className={`px-2 py-0.5 rounded-full capitalize ${
                        a.type === "nature" ? "bg-green-100 text-green-700" :
                        a.type === "spiritual" ? "bg-yellow-100 text-yellow-700" :
                        a.type === "adventure" ? "bg-red-100 text-red-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>{a.type}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">{a.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <DollarSign className="w-3 h-3" />
                        {a.entry_fee === 0 ? "Free entry" : `৳${a.entry_fee} entry`}
                      </div>
                      {a.tips && <p className="text-xs text-[#0B5345] italic">💡 {a.tips}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Hidden Gems Tab */}
          {tab === "gems" && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-[#0B5345] to-[#2ECC71] text-white rounded-xl p-5 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Gem className="w-6 h-6" />
                  <h3 className="font-semibold text-lg">Hidden Gems of Sylhet</h3>
                </div>
                <p className="text-white/80 text-sm">Places the guidebooks miss — curated by our local contributor network</p>
              </div>
              {hiddenGems.map(a => (
                <div key={a.id} className="bg-white rounded-xl border-l-4 border-[#2ECC71] p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Gem className="w-4 h-4 text-[#2ECC71]" />
                      <h4 className="font-semibold text-gray-800">{a.name}</h4>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{a.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{a.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{a.best_time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{a.description}</p>
                  {a.tips && <p className="text-xs text-[#0B5345] italic">💡 Insider tip: {a.tips}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Guides Tab */}
          {tab === "guides" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guides.map(g => (
                <div key={g.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-[#0B5345] rounded-full flex items-center justify-center text-white text-xl shrink-0">
                      {g.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-800">{g.name}</h4>
                        <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                          <CheckCircle className="w-3 h-3" /> {tx.verified}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{g.specialty}</p>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{g.rating}</span>
                        <span className="text-xs text-gray-400">({g.tours} tours)</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {g.areas.map(area => (
                          <span key={area} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">{area}</span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mb-3">🌐 {g.languages}</p>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs ${g.available ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                          {g.available ? "● Available" : "○ Unavailable"}
                        </span>
                        <Link to="/guide" className="flex items-center gap-1 text-sm text-[#0B5345] hover:underline">
                          {tx.bookNow} <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
