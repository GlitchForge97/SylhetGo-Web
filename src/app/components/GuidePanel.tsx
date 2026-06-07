import { ArrowLeft, User, MapPin, Star, DollarSign, Calendar, MessageSquare, ToggleLeft, ToggleRight, CheckCircle, Send, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

type Booking = {
  id: number;
  name: string;
  destination: string;
  date: string;
  duration: string;
  amount: string;
  status: "pending" | "accepted" | "declined";
};

type Message = {
  from: string;
  preview: string;
  time: string;
  unread?: boolean;
  conversation: string[];
};

export function GuidePanel() {
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(true);
  const [profileSaved, setProfileSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: "Rafiq Ahmed",
    specialty: "Tea Estate Expert",
    languages: "Bengali, English, Hindi",
    rate: "500",
    bio: "Passionate about showcasing the beauty of Sreemangal's tea estates. 10+ years of experience guiding international and local tourists.",
    areas: ["Sreemangal", "Lawachara"],
  });
  const [bookings, setBookings] = useState<Booking[]>([
    { id: 1, name: "Sarah Johnson", destination: "Sreemangal Tea Tour", date: "June 15, 2026", duration: "Full Day", amount: "৳4,000", status: "pending" },
    { id: 2, name: "Ahmed Hassan", destination: "Lawachara Trek", date: "June 18, 2026", duration: "Half Day", amount: "৳2,500", status: "pending" },
    { id: 3, name: "Emily Chen", destination: "Tea Estate Photography", date: "June 20, 2026", duration: "6 hours", amount: "৳3,500", status: "pending" },
  ]);
  const [activeMessage, setActiveMessage] = useState<number | null>(null);
  const [msgReply, setMsgReply] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { from: "Sarah Johnson", preview: "What time should we meet?", time: "10m ago", unread: true, conversation: ["Sarah: What time should we meet?"] },
    { from: "SylhetGo Support", preview: "Profile update approved", time: "2h ago", unread: true, conversation: ["SylhetGo: Profile update approved ✓"] },
    { from: "Ahmed Hassan", preview: "Can we extend the tour?", time: "5h ago", unread: false, conversation: ["Ahmed: Can we extend the tour to include Ratargul?"] },
  ]);

  const allAreas = ["Sreemangal", "Ratargul", "Jaflong", "Bholaganj", "Shamshernagar", "Lawachara"];

  const handleProfileSave = () => {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleBooking = (id: number, action: "accepted" | "declined") => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: action } : b));
  };

  const handleAreaToggle = (area: string) => {
    setProfile(prev => ({
      ...prev,
      areas: prev.areas.includes(area)
        ? prev.areas.filter(a => a !== area)
        : [...prev.areas, area],
    }));
  };

  const handleSendReply = () => {
    if (!msgReply.trim() || activeMessage === null) return;
    setMessages(prev => prev.map((m, idx) =>
      idx === activeMessage
        ? { ...m, conversation: [...m.conversation, `You: ${msgReply.trim()}`], unread: false }
        : m
    ));
    setMsgReply("");
  };

  const unreadCount = messages.filter(m => m.unread).length;

  const handleLogout = () => navigate("/guide");

  return (
    <div className="min-h-screen bg-[#F8F9F9]">
      {/* Message Modal */}
      {activeMessage !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setActiveMessage(null)}>
          <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="font-semibold text-gray-800">{messages[activeMessage].from}</h3>
              <button onClick={() => setActiveMessage(null)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-5 space-y-2 max-h-60 overflow-y-auto">
              {messages[activeMessage].conversation.map((line, i) => (
                <p key={i} className={`text-sm p-3 rounded-lg ${line.startsWith("You:") ? "bg-[#2ECC71] text-white ml-8" : "bg-gray-100 text-gray-700 mr-8"}`}>{line}</p>
              ))}
            </div>
            <div className="p-4 border-t flex gap-2">
              <input
                type="text"
                value={msgReply}
                onChange={e => setMsgReply(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSendReply()}
                placeholder="Type a reply..."
                className="flex-1 px-4 py-2 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345] text-sm"
              />
              <button onClick={handleSendReply} className="bg-[#2ECC71] text-white px-4 py-2 rounded-lg hover:bg-[#27AE60] transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <nav className="bg-[#0B5345] text-white px-8 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-[#2ECC71] transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold">Guide Portal</h1>
              <p className="text-xs text-white/80">Manage your profile and bookings</p>
            </div>
          </div>
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#0B5345] to-[#2ECC71] text-white rounded-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Welcome back, {profile.name}!</h2>
              <p className="text-white/90">
                You have {bookings.filter(b => b.status === "pending").length} pending tour requests and {bookings.filter(b => b.status === "accepted").length} confirmed bookings this week.
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold mb-1">4.9</div>
              <div className="flex items-center justify-end gap-1 mb-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />)}
              </div>
              <p className="text-sm text-white/80">340 tours completed</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-2 space-y-6">
            {/* Profile Settings */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Profile Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Specialty</label>
                  <select
                    value={profile.specialty}
                    onChange={e => setProfile(p => ({ ...p, specialty: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
                  >
                    <option>Tea Estate Expert</option>
                    <option>Cultural Heritage</option>
                    <option>Adventure & Trekking</option>
                    <option>Haor Navigation</option>
                    <option>Photography Tours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Operating Areas</label>
                  <div className="grid grid-cols-2 gap-3">
                    {allAreas.map(area => (
                      <label key={area} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profile.areas.includes(area)}
                          onChange={() => handleAreaToggle(area)}
                          className="w-4 h-4 text-[#0B5345] rounded"
                        />
                        <span className="text-sm">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Languages</label>
                  <input
                    type="text"
                    value={profile.languages}
                    onChange={e => setProfile(p => ({ ...p, languages: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Hourly Rate (৳)</label>
                  <input
                    type="number"
                    value={profile.rate}
                    onChange={e => setProfile(p => ({ ...p, rate: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Bio</label>
                  <textarea
                    rows={4}
                    value={profile.bio}
                    onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
                  />
                </div>
                <button
                  onClick={handleProfileSave}
                  className="w-full bg-[#2ECC71] text-white py-3 rounded-lg hover:bg-[#27AE60] transition-colors flex items-center justify-center gap-2"
                >
                  {profileSaved ? <><CheckCircle className="w-5 h-5" /> Profile Updated!</> : "Update Profile"}
                </button>
              </div>
            </div>

            {/* Booking Requests */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Pending Booking Requests</h3>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className={`border rounded-lg p-4 transition-colors ${
                      booking.status === "accepted" ? "border-green-300 bg-green-50" :
                      booking.status === "declined" ? "border-gray-200 bg-gray-50 opacity-60" :
                      "border-gray-200 hover:border-[#0B5345]"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-800">{booking.name}</h4>
                        <p className="text-sm text-gray-600">{booking.destination}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-[#0B5345]">{booking.amount}</div>
                        <div className="text-xs text-gray-500">{booking.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{booking.date}</span>
                    </div>
                    {booking.status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleBooking(booking.id, "accepted")}
                          className="flex-1 bg-[#2ECC71] text-white py-2 rounded-lg hover:bg-[#27AE60] transition-colors text-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleBooking(booking.id, "declined")}
                          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <div className={`text-center text-sm font-semibold py-2 rounded-lg ${
                        booking.status === "accepted" ? "text-green-700 bg-green-100" : "text-gray-500 bg-gray-100"
                      }`}>
                        {booking.status === "accepted" ? "✓ Booking Confirmed" : "✗ Declined"}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Availability Toggle */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Availability Status</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700">Currently {isAvailable ? "Available" : "Unavailable"}</span>
                <button onClick={() => setIsAvailable(!isAvailable)}>
                  {isAvailable ? (
                    <ToggleRight className="w-12 h-12 text-[#2ECC71]" />
                  ) : (
                    <ToggleLeft className="w-12 h-12 text-gray-400" />
                  )}
                </button>
              </div>
              <div className={`text-xs px-3 py-2 rounded-lg ${isAvailable ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {isAvailable
                  ? "You are visible to tourists and accepting bookings."
                  : "You are hidden from search results. Toggle to accept bookings."}
              </div>
            </div>

            {/* Verification Badge */}
            <div className="bg-gradient-to-br from-[#2ECC71] to-[#0B5345] text-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-8 h-8" />
                <h3 className="text-lg font-semibold">SylhetGo Verified</h3>
              </div>
              <p className="text-sm text-white/90">
                Your profile has been verified by SylhetGo administrators. This badge increases trust with tourists.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">This Month</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tours Completed</span>
                  <span className="font-semibold text-gray-800">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Revenue Earned</span>
                  <span className="font-semibold text-[#0B5345]">৳48,500</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">New Reviews</span>
                  <span className="font-semibold text-gray-800">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg. Rating</span>
                  <span className="font-semibold text-gray-800 flex items-center gap-1">
                    4.9 <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                  </span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Messages</h3>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{unreadCount} New</span>
                )}
              </div>
              <div className="space-y-3">
                {messages.map((msg, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveMessage(idx);
                      setMessages(prev => prev.map((m, i) => i === idx ? { ...m, unread: false } : m));
                    }}
                    className="w-full p-3 bg-[#F8F9F9] rounded-lg hover:bg-gray-100 cursor-pointer transition-colors text-left"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-semibold text-gray-800 ${msg.unread ? "text-[#0B5345]" : ""}`}>{msg.from}</span>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                    <p className="text-xs text-gray-600 truncate">{msg.preview}</p>
                    {msg.unread && <div className="w-2 h-2 bg-[#2ECC71] rounded-full mt-1 ml-auto"></div>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
