import { useState } from "react";
import {
  Search, MapPin, Calendar, DollarSign, Leaf, Mountain, Droplets,
  Users, Star, X, ChevronRight, Bus, Utensils, Map, ClipboardList,
  HeartHandshake, Menu, Globe, Wifi,
} from "lucide-react";
import { Link } from "react-router";
import { DemoAccessPanel } from "./DemoAccessPanel";
import { TransportHub } from "./tourist/TransportHub";
import { AccommodationDining } from "./tourist/AccommodationDining";
import { GuidesAttractions } from "./tourist/GuidesAttractions";
import { HaorTracker } from "./tourist/HaorTracker";
import { TripPlanner } from "./tourist/TripPlanner";
import { CommunityEmergency } from "./tourist/CommunityEmergency";
import { LanguageProvider, useLang, Lang } from "../context/LanguageContext";

// ── Data ───────────────────────────────────────────────────────────────────────
const destinations = [
  { id: 1, name: "Sreemangal", subtitle: "The Tea Capital", type: "Nature", distance: "85km from Sylhet", rating: 4.8, reviews: 1240, bestTime: "Year-round", desc: "Explore rolling tea estates, cycle through Lawachara National Park, and experience authentic tea cabin culture in Bangladesh's premier tea region.", img: "https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", badge: "Featured", large: true },
  { id: 2, name: "Shamshernagar", subtitle: "The Hidden Heritage", type: "Heritage", distance: "92km from Sylhet", rating: 4.6, reviews: 387, bestTime: "Oct-Apr", desc: "Discover serene tea garden lakes, historic airport landmarks, indigenous culture, and peaceful landscapes in this underrated destination.", img: "https://images.unsplash.com/photo-1658051161493-1d311c4c7b4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", badge: "Hidden Gem", large: true },
  { id: 3, name: "Ratargul Swamp Forest", subtitle: "", type: "Nature", distance: "26km from Sylhet", rating: 4.7, reviews: 920, bestTime: "Oct-Apr", desc: "Experience Bangladesh's only freshwater swamp forest by boat. Magical mangrove-like trees rise from the still water.", img: "https://images.unsplash.com/photo-1543777166-81504743e51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", badge: "", large: false },
  { id: 4, name: "Jaflong", subtitle: "", type: "Adventure", distance: "62km from Sylhet", rating: 4.9, reviews: 2100, bestTime: "Year-round", desc: "Stunning river views, stone collection, and mountain panoramas at the border with Meghalaya, India.", img: "https://images.unsplash.com/photo-1516483797183-de683a8ef229?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", badge: "", large: false },
  { id: 5, name: "Bholaganj Sada Pathor", subtitle: "", type: "Nature", distance: "38km from Sylhet", rating: 4.5, reviews: 610, bestTime: "Nov-Mar", desc: "White stone quarries with crystal-clear river waters, set against a dramatic backdrop of Indian hills.", img: "https://images.unsplash.com/photo-1566076009300-e313adb6f2a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", badge: "", large: false },
  { id: 6, name: "Lawachara National Park", subtitle: "", type: "Nature", distance: "87km from Sylhet", rating: 4.6, reviews: 830, bestTime: "Oct-May", desc: "Home to the endangered Hoolock Gibbon and a rich diversity of birds, butterflies, and rainforest flora.", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", badge: "", large: false },
  { id: 7, name: "Tanguar Haor", subtitle: "", type: "Nature", distance: "110km from Sylhet", rating: 4.8, reviews: 540, bestTime: "Jan-Apr", desc: "A vast seasonal wetland and Ramsar site — witness thousands of migratory birds and explore by country boat.", img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", badge: "", large: false },
  { id: 8, name: "Hazrat Shah Jalal Dargah", subtitle: "", type: "Spiritual", distance: "0km from Sylhet", rating: 4.7, reviews: 3200, bestTime: "Year-round", desc: "The sacred shrine of the 14th-century Sufi saint, attracting millions of pilgrims and curious travelers each year.", img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", badge: "", large: false },
];

const communityPosts = [
  { user: "Traveler_Mike", time: "2 hours ago", update: "Just visited Jaflong - water levels perfect! Crystal clear views of the stones. Highly recommend going this week.", upvotes: 24 },
  { user: "LocalExpert_BD", time: "5 hours ago", update: "Flash flood warning issued for Ratargul area. Best to postpone boat tours for the next 48 hours.", upvotes: 47, warning: true },
  { user: "TeaLover_Sarah", time: "1 day ago", update: "Finlay Tea Estate in Sreemangal is stunning right now. Fresh tea picking season has started!", upvotes: 31 },
  { user: "AdventureKing", time: "2 days ago", update: "Lawachara National Park - spotted 3 Hoolock Gibbons this morning around 7 AM near the main trail.", upvotes: 58 },
];

// ── Destination Modal ──────────────────────────────────────────────────────────
function DestinationModal({ dest, onClose }: { dest: typeof destinations[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="relative h-72">
          <img src={dest.img} alt={dest.name} className="w-full h-full object-cover rounded-t-2xl" />
          <button onClick={onClose} className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors">
            <X className="w-5 h-5" />
          </button>
          {dest.badge && <div className="absolute top-4 left-4 bg-[#2ECC71] text-white px-3 py-1 rounded-full text-sm">{dest.badge}</div>}
        </div>
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">{dest.name}</h2>
          {dest.subtitle && <p className="text-[#2ECC71] font-medium mb-3">{dest.subtitle}</p>}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{dest.distance}</span>
            <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />{dest.rating} ({dest.reviews.toLocaleString()} reviews)</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />Best: {dest.bestTime}</span>
          </div>
          <p className="text-gray-700 mb-6 leading-relaxed">{dest.desc}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#F8F9F9] rounded-lg p-4"><p className="text-xs text-gray-500 mb-1">Category</p><p className="font-semibold text-gray-800">{dest.type}</p></div>
            <div className="bg-[#F8F9F9] rounded-lg p-4"><p className="text-xs text-gray-500 mb-1">Best Season</p><p className="font-semibold text-gray-800">{dest.bestTime}</p></div>
          </div>
          <div className="flex gap-3">
            <Link to="/guide" className="flex-1 bg-[#0B5345] text-white py-3 rounded-lg hover:bg-[#0a4538] transition-colors text-center">Book a Guide</Link>
            <button onClick={onClose} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors">Back to Explore</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Nav items ──────────────────────────────────────────────────────────────────
type SectionKey = "explore" | "transport" | "stay" | "guides" | "haor" | "planner" | "community";

const NAV_ITEMS: { key: SectionKey; icon: React.ElementType; label: string }[] = [
  { key: "explore",   icon: Search,         label: "Explore" },
  { key: "transport", icon: Bus,            label: "Transport Hub" },
  { key: "stay",      icon: Utensils,       label: "Stay & Dine" },
  { key: "guides",    icon: Map,            label: "Guides & Spots" },
  { key: "haor",      icon: Droplets,       label: "Haor Tracker" },
  { key: "planner",   icon: ClipboardList,  label: "Trip Planner" },
  { key: "community", icon: HeartHandshake, label: "Community & Emergency" },
];

// ── Language Toggle ────────────────────────────────────────────────────────────
function LanguageToggle() {
  const { lang, setLang } = useLang();
  const langs: { code: Lang; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "bn", label: "বাং" },
    { code: "ar", label: "عر" },
  ];
  return (
    <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
      <Globe className="w-4 h-4 text-white/70 mr-1" />
      {langs.map(l => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${lang === l.code ? "bg-white text-[#0B5345]" : "text-white/80 hover:text-white"}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

// ── Explore Section (original content) ────────────────────────────────────────
function ExploreSection() {
  const { tx } = useLang();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [selectedDest, setSelectedDest] = useState<typeof destinations[0] | null>(null);
  const [upvotes, setUpvotes] = useState<Record<number, boolean>>({});
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState(communityPosts);
  const [postSubmitted, setPostSubmitted] = useState(false);

  const filtered = destinations.filter(d => {
    const matchQuery = query === "" || d.name.toLowerCase().includes(query.toLowerCase()) || d.desc.toLowerCase().includes(query.toLowerCase());
    const matchType = typeFilter === "All Types" || d.type === typeFilter;
    return matchQuery && matchType;
  });
  const featured = filtered.filter(d => d.large);
  const attractions = filtered.filter(d => !d.large);

  const handleUpvote = (idx: number) => setUpvotes(prev => ({ ...prev, [idx]: !prev[idx] }));
  const handlePostSubmit = () => {
    if (!newPost.trim()) return;
    setPosts(prev => [{ user: "You", time: "Just now", update: newPost.trim(), upvotes: 0 }, ...prev]);
    setNewPost("");
    setPostSubmitted(true);
    setTimeout(() => setPostSubmitted(false), 3000);
  };

  return (
    <div className="min-h-full bg-white">
      {selectedDest && <DestinationModal dest={selectedDest} onClose={() => setSelectedDest(null)} />}

      {/* Hero / Search */}
      <section className="relative bg-gradient-to-br from-[#0B5345] to-[#1a7a63] text-white py-16 px-8" id="explore">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-3">One Platform. All of Sylhet.</h2>
          <p className="text-lg text-white/90 mb-7">Discover authentic experiences, verified guides, and transparent pricing.</p>
          <div className="bg-white rounded-xl p-2 flex items-center gap-3 shadow-2xl">
            <Search className="w-5 h-5 text-gray-400 ml-2" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={tx.search}
              className="flex-1 px-3 py-3 text-gray-800 outline-none"
            />
            <div className="flex items-center gap-2 pr-2">
              <select
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg outline-none cursor-pointer"
              >
                <option>All Types</option>
                <option>Nature</option>
                <option>Spiritual</option>
                <option>Adventure</option>
                <option>Heritage</option>
              </select>
              {(query || typeFilter !== "All Types") && (
                <button onClick={() => { setQuery(""); setTypeFilter("All Types"); }} className="p-2 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          {(query || typeFilter !== "All Types") && (
            <p className="text-white/70 mt-3 text-sm">
              {filtered.length === 0 ? "No destinations match your search." : `Found ${filtered.length} destination${filtered.length > 1 ? "s" : ""}`}
            </p>
          )}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-8">
        {/* Featured */}
        {featured.length > 0 && (
          <section className="py-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Featured Local Highlights</h3>
            <div className="grid grid-cols-2 gap-6 mb-12">
              {featured.map(dest => (
                <div key={dest.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <div className="relative h-64">
                    <img src={dest.img} alt={dest.name} className="w-full h-full object-cover" />
                    {dest.badge && <div className="absolute top-4 right-4 bg-[#2ECC71] text-white px-3 py-1 rounded-full text-sm">{dest.badge}</div>}
                  </div>
                  <div className="p-5">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{dest.name}: {dest.subtitle}</h4>
                    <p className="text-gray-600 mb-3 text-sm">{dest.desc}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{dest.distance}</span>
                      <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" />{dest.rating}</span>
                    </div>
                    <button onClick={() => setSelectedDest(dest)} className="w-full bg-[#0B5345] text-white py-2.5 rounded-lg hover:bg-[#0a4538] transition-colors">
                      Explore {dest.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Attractions Grid */}
        {attractions.length > 0 && (
          <section className="pb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">{featured.length === 0 ? "All Destinations" : "Main Attractions"}</h3>
            <div className="grid grid-cols-3 gap-5 mb-12">
              {attractions.map(dest => (
                <div key={dest.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <div className="relative h-40">
                    <img src={dest.img} alt={dest.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h5 className="font-semibold text-gray-800 mb-1">{dest.name}</h5>
                    <p className="text-xs text-gray-600 mb-3">{dest.desc.substring(0, 70)}...</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Best: {dest.bestTime}</span>
                      <button onClick={() => setSelectedDest(dest)} className="text-[#2ECC71] text-sm hover:underline flex items-center gap-1">
                        {tx.viewDetails} <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {filtered.length === 0 && (
          <section className="py-24 text-center">
            <Mountain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-500 mb-2">No destinations found</h3>
            <p className="text-gray-400 mb-6">Try a different search term or category.</p>
            <button onClick={() => { setQuery(""); setTypeFilter("All Types"); }} className="bg-[#2ECC71] text-white px-6 py-3 rounded-lg hover:bg-[#27AE60] transition-colors">
              {tx.clearFilters}
            </button>
          </section>
        )}
      </div>

      {/* Transport Pricing (quick reference) */}
      <section className="bg-[#F8F9F9] py-12">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-7 h-7 text-[#0B5345]" />
            <h3 className="text-2xl font-semibold text-gray-800">Quick Transport Fares</h3>
          </div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#0B5345] text-white">
                <tr>
                  <th className="px-5 py-3 text-left text-sm">Route</th>
                  <th className="px-5 py-3 text-left text-sm">Distance</th>
                  <th className="px-5 py-3 text-left text-sm">CNG Fare</th>
                  <th className="px-5 py-3 text-left text-sm">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { route: "Sylhet → Ratargul", dist: "26 km", fare: "৳350–400", dur: "45 min" },
                  { route: "Sylhet → Jaflong", dist: "62 km", fare: "৳800–900", dur: "1.5 hr" },
                  { route: "Sylhet → Sreemangal", dist: "85 km", fare: "৳1,100–1,200", dur: "2 hr" },
                  { route: "Sylhet → Bholaganj", dist: "38 km", fare: "৳500–600", dur: "1 hr" },
                  { route: "Sylhet → Tanguar Haor", dist: "110 km", fare: "৳1,400–1,600", dur: "2.5 hr" },
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-5 py-3 text-sm">{r.route}</td>
                    <td className="px-5 py-3 text-sm text-gray-600">{r.dist}</td>
                    <td className="px-5 py-3 font-semibold text-[#0B5345] text-sm">{r.fare}</td>
                    <td className="px-5 py-3 text-sm text-gray-600">{r.dur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Haor Tracker (embedded summary) */}
      <section className="max-w-5xl mx-auto px-8 py-12">
        <div className="flex items-center gap-3 mb-6">
          <Droplets className="w-7 h-7 text-[#0B5345]" />
          <h3 className="text-2xl font-semibold text-gray-800">Haor Season Tracker</h3>
        </div>
        <div className="bg-gradient-to-r from-[#0B5345] to-[#2ECC71] rounded-xl p-7 text-white">
          <div className="grid grid-cols-12 gap-2 mb-5">
            {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((month, idx) => (
              <div key={month} className="text-center">
                <div className={`h-20 rounded-lg mb-2 flex items-end justify-center pb-2 ${idx>=5&&idx<=8?"bg-red-500":(idx>=3&&idx<=4)||(idx>=9&&idx<=10)?"bg-yellow-500":"bg-green-500"}`}>
                  <span className="text-xs font-bold">{idx>=5&&idx<=8?"🚫":(idx>=3&&idx<=4)||(idx>=9&&idx<=10)?"⚠️":"✓"}</span>
                </div>
                <span className="text-xs">{month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-500 rounded" /><span>Accessible</span></div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-yellow-500 rounded" /><span>Partial</span></div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-500 rounded" /><span>Monsoon</span></div>
          </div>
        </div>
      </section>

      {/* Verified Guides (quick preview) */}
      <section className="bg-[#F8F9F9] py-12">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-7 h-7 text-[#0B5345]" />
            <h3 className="text-2xl font-semibold text-gray-800">Verified Local Guides</h3>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {[
              { name: "Rafiq Ahmed", specialty: "Tea Estate Expert", rating: 4.9, tours: 340 },
              { name: "Anika Rahman", specialty: "Cultural Heritage", rating: 4.8, tours: 215 },
              { name: "Mohan Das", specialty: "Adventure & Trekking", rating: 4.9, tours: 428 },
              { name: "Salma Begum", specialty: "Haor Navigation", rating: 4.7, tours: 182 },
            ].map(guide => (
              <div key={guide.name} className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-shadow text-center">
                <div className="w-14 h-14 bg-[#0B5345] rounded-full mx-auto mb-3 flex items-center justify-center text-white text-xl">{guide.name.charAt(0)}</div>
                <h5 className="font-semibold text-gray-800 mb-1 text-sm">{guide.name}</h5>
                <p className="text-xs text-gray-600 mb-2">{guide.specialty}</p>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-semibold">{guide.rating}</span>
                  <span className="text-xs text-gray-500">({guide.tours})</span>
                </div>
                <div className="bg-[#2ECC71] text-white text-xs px-3 py-1 rounded-full mb-2">Verified</div>
                <Link to="/guide" className="block w-full text-center text-[#0B5345] text-xs border border-[#0B5345] py-1.5 rounded-lg hover:bg-[#0B5345] hover:text-white transition-colors">
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Board */}
      <section className="max-w-5xl mx-auto px-8 py-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Live Community Updates</h3>
        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200 mb-5">
          <h4 className="font-semibold text-gray-700 mb-3">{tx.shareUpdate}</h4>
          <textarea
            value={newPost}
            onChange={e => setNewPost(e.target.value)}
            placeholder="Share current conditions, tips, or travel updates..."
            rows={3}
            className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345] mb-3"
          />
          <div className="flex items-center justify-between">
            {postSubmitted ? (
              <span className="text-green-600 text-sm font-medium">✓ Update posted!</span>
            ) : <span />}
            <button
              onClick={handlePostSubmit}
              disabled={!newPost.trim()}
              className="bg-[#2ECC71] text-white px-5 py-2 rounded-lg hover:bg-[#27AE60] transition-colors disabled:opacity-40 text-sm"
            >
              {tx.postUpdate}
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {posts.map((post, idx) => (
            <div key={idx} className={`bg-white rounded-xl p-5 border-l-4 ${(post as any).warning ? "border-red-400" : "border-[#2ECC71]"} shadow-sm`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="font-semibold text-gray-800 text-sm">{post.user}</span>
                  <span className="text-gray-400 text-xs ml-2">{post.time}</span>
                  {(post as any).warning && <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">⚠ Safety Alert</span>}
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">{post.update}</p>
              <button
                onClick={() => handleUpvote(idx)}
                className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full transition-colors ${upvotes[idx] ? "bg-[#2ECC71] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                👍 {post.upvotes + (upvotes[idx] ? 1 : 0)} Helpful
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B5345] text-white/80 py-8">
        <div className="max-w-5xl mx-auto px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Leaf className="w-6 h-6 text-[#2ECC71]" />
            <div>
              <p className="font-semibold text-white">{tx.sylhetGo}</p>
              <p className="text-xs">{tx.tagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Wifi className="w-4 h-4 text-[#2ECC71]" />
            <span>{tx.offlineReady}</span>
          </div>
          <div className="flex gap-4 text-sm">
            <Link to="/guide" className="hover:text-white transition-colors">Guides</Link>
            <Link to="/contributor" className="hover:text-white transition-colors">Contribute</Link>
            <Link to="/admin/login" className="hover:text-white transition-colors">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Section Renderer ───────────────────────────────────────────────────────────
function SectionContent({ section }: { section: SectionKey }) {
  switch (section) {
    case "explore":    return <ExploreSection />;
    case "transport":  return <TransportHub />;
    case "stay":       return <AccommodationDining />;
    case "guides":     return <GuidesAttractions />;
    case "haor":       return <HaorTracker />;
    case "planner":    return <TripPlanner />;
    case "community":  return <CommunityEmergency />;
    default:           return <ExploreSection />;
  }
}

// ── Main TouristPanel with Sidebar ────────────────────────────────────────────
function TouristPanelInner() {
  const { tx } = useLang();
  const [section, setSection] = useState<SectionKey>("explore");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentNav = NAV_ITEMS.find(n => n.key === section)!;

  return (
    <div className="min-h-screen bg-[#F8F9F9] flex flex-col">
      <DemoAccessPanel />

      {/* Top Nav */}
      <nav className="bg-[#0B5345] text-white px-5 py-3.5 shadow-lg sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button onClick={() => setSidebarOpen(o => !o)} className="md:hidden p-1">
              <Menu className="w-6 h-6" />
            </button>
            <Leaf className="w-7 h-7" />
            <div>
              <h1 className="text-lg font-bold leading-none">{tx.sylhetGo}</h1>
              <p className="text-[10px] text-white/70">{tx.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LanguageToggle />
            <div className="hidden md:flex items-center gap-4">
              <Link to="/guide" className="text-sm hover:text-[#2ECC71] transition-colors">Guide Login</Link>
              <Link to="/contributor" className="text-sm hover:text-[#2ECC71] transition-colors">Contributor Login</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 min-h-0">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed md:sticky top-0 md:top-[60px] left-0 z-40 md:z-auto
          w-64 md:w-56 min-h-screen md:min-h-0 md:h-[calc(100vh-60px)]
          bg-white border-r border-gray-200 flex flex-col shadow-xl md:shadow-none
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
          {/* Sidebar Header (mobile only) */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
            <span className="font-semibold text-gray-800">{tx.sylhetGo}</span>
            <button onClick={() => setSidebarOpen(false)}><X className="w-5 h-5 text-gray-500" /></button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const isActive = section === item.key;
              const label = (() => {
                switch (item.key) {
                  case "explore":   return tx.explore;
                  case "transport": return tx.transport;
                  case "stay":      return tx.stay;
                  case "guides":    return tx.guides;
                  case "haor":      return "Haor Tracker";
                  case "planner":   return tx.planner;
                  case "community": return tx.community;
                  default:          return item.label;
                }
              })();
              return (
                <button
                  key={item.key}
                  onClick={() => { setSection(item.key); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-colors text-sm ${
                    isActive
                      ? "bg-[#0B5345] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#2ECC71]" : "text-gray-400"}`} />
                  <span className="truncate font-medium">{label}</span>
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-gray-200">
            <div className="bg-[#F8F9F9] rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-[#2ECC71] mb-1">
                <Wifi className="w-4 h-4" />
                <span className="text-xs font-semibold">Offline Ready</span>
              </div>
              <p className="text-[10px] text-gray-400">All data cached locally</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <SectionContent section={section} />
        </main>
      </div>
    </div>
  );
}

// ── Export wrapped in LanguageProvider ────────────────────────────────────────
export function TouristPanel() {
  return (
    <LanguageProvider>
      <TouristPanelInner />
    </LanguageProvider>
  );
}
