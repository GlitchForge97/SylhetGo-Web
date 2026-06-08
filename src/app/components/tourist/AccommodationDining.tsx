import { useState, useEffect } from "react";
import { Hotel, Utensils, Star, CheckCircle, Phone, MapPin, Filter, RefreshCw } from "lucide-react";
import { useLang } from "../../context/LanguageContext";
import { API_ENDPOINTS } from "@/config";

type Accommodation = {
  id: number;
  name: string;
  type: string;
  location: string;
  price_min: number;
  price_max: number;
  rating: number;
  review_count: number;
  verified: boolean;
  amenities: string;
  contact: string;
};

type Restaurant = {
  id: number;
  name: string;
  location: string;
  cuisine: string;
  price_range: string;
  rating: number;
  review_count: number;
  verified: boolean;
  specialty: string;
  contact: string;
};

const PRICE_FILTERS = ["all", "budget", "mid", "premium"] as const;
const ACCOM_TYPES = ["all", "hotel", "resort", "homestay"] as const;

export function AccommodationDining() {
  const { tx } = useLang();
  const [tab, setTab] = useState<"stay" | "dine">("stay");
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceFilter, setPriceFilter] = useState<typeof PRICE_FILTERS[number]>("all");
  const [typeFilter, setTypeFilter] = useState<typeof ACCOM_TYPES[number]>("all");

  useEffect(() => {
    Promise.all([
      fetch(API_ENDPOINTS.accommodations).then(r => r.json()),
      fetch(API_ENDPOINTS.restaurants).then(r => r.json()),
    ]).then(([accom, resto]) => {
      setAccommodations(accom);
      setRestaurants(resto);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const priceLabel: Record<string, string> = {
    all: tx.all, budget: tx.budget, mid: tx.moderate, premium: tx.premium,
  };

  const filteredAccom = accommodations.filter(a => {
    const byType = typeFilter === "all" || a.type === typeFilter;
    const byPrice = priceFilter === "all" ||
      (priceFilter === "budget" && a.price_min < 2000) ||
      (priceFilter === "mid" && a.price_min >= 2000 && a.price_min < 5000) ||
      (priceFilter === "premium" && a.price_min >= 5000);
    return byType && byPrice;
  });

  const filteredResto = restaurants.filter(r =>
    priceFilter === "all" || r.price_range === priceFilter
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <RefreshCw className="w-6 h-6 animate-spin text-[#0B5345]" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{tx.stay}</h2>
        <p className="text-gray-500 text-sm">Verified hotels, resorts, homestays & top dining spots</p>
      </div>

      {/* Main Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("stay")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-colors ${tab === "stay" ? "bg-[#0B5345] text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
        >
          <Hotel className="w-4 h-4" /> {tx.hotel} / {tx.resort}
        </button>
        <button
          onClick={() => setTab("dine")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-colors ${tab === "dine" ? "bg-[#0B5345] text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
        >
          <Utensils className="w-4 h-4" /> {tx.restaurant}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-5">
        <div className="flex items-center gap-1 mr-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500">Budget:</span>
        </div>
        {PRICE_FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setPriceFilter(f)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${priceFilter === f ? "bg-[#2ECC71] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            {priceLabel[f]}
          </button>
        ))}
        {tab === "stay" && (
          <>
            <span className="text-sm text-gray-400 mx-1">|</span>
            {ACCOM_TYPES.map(t => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1 rounded-full text-sm transition-colors capitalize ${typeFilter === t ? "bg-[#0B5345] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                {t === "all" ? tx.all : t}
              </button>
            ))}
          </>
        )}
      </div>

      {tab === "stay" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAccom.length === 0 ? (
            <div className="col-span-2 text-center py-12 text-gray-400">{tx.noResults}</div>
          ) : filteredAccom.map(a => (
            <div key={a.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-800">{a.name}</h4>
                    {a.verified && (
                      <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                        <CheckCircle className="w-3 h-3" /> {tx.verified}
                      </span>
                    )}
                  </div>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs capitalize">{a.type}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#0B5345]">৳{a.price_min.toLocaleString()}–{a.price_max.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">per night</div>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-2">
                <MapPin className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">{a.location}</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{a.rating}</span>
                </div>
                <span className="text-xs text-gray-400">({a.review_count} reviews)</span>
              </div>
              {a.amenities && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {a.amenities.split(",").slice(0, 4).map((am, i) => (
                    <span key={i} className="px-2 py-0.5 bg-[#F8F9F9] text-gray-600 rounded text-xs">{am.trim()}</span>
                  ))}
                </div>
              )}
              <a href={`tel:${a.contact}`} className="flex items-center gap-1 text-xs text-[#0B5345] hover:underline">
                <Phone className="w-3 h-3" /> {a.contact}
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResto.length === 0 ? (
            <div className="col-span-2 text-center py-12 text-gray-400">{tx.noResults}</div>
          ) : filteredResto.map(r => (
            <div key={r.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-800">{r.name}</h4>
                    {r.verified && (
                      <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                        <CheckCircle className="w-3 h-3" /> {tx.verified}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{r.cuisine}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      r.price_range === "budget" ? "bg-green-100 text-green-700" :
                      r.price_range === "mid" ? "bg-yellow-100 text-yellow-700" :
                      "bg-purple-100 text-purple-700"
                    }`}>
                      {r.price_range === "budget" ? tx.budget : r.price_range === "mid" ? tx.moderate : tx.premium}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{r.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-2">
                <MapPin className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">{r.location}</span>
              </div>
              {r.specialty && (
                <p className="text-xs text-gray-600 mb-3 italic">🍽️ Must-try: {r.specialty}</p>
              )}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">({r.review_count} reviews)</span>
                <a href={`tel:${r.contact}`} className="flex items-center gap-1 text-xs text-[#0B5345] hover:underline">
                  <Phone className="w-3 h-3" /> {r.contact}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
