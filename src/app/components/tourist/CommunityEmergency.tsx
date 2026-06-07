import { useState, useEffect } from "react";
import { Phone, AlertTriangle, MessageSquare, Globe, Heart, Shield, Send, ThumbsUp, RefreshCw, ChevronDown } from "lucide-react";
import { useLang } from "../../context/LanguageContext";

type Post = {
  id: number;
  user_name: string;
  post_type: string;
  location: string;
  content: string;
  upvotes: number;
  is_warning: boolean;
  created_at: string;
};

const EMERGENCY = [
  { name: "Tourist Police Sylhet", number: "01320-100100", icon: Shield, color: "blue" },
  { name: "National Emergency (Fire/Police/Ambulance)", number: "999", icon: AlertTriangle, color: "red" },
  { name: "Osmani Medical College Hospital", number: "0821-715034", icon: Heart, color: "green" },
  { name: "Tourist Helpline (BTRC)", number: "1535", icon: Phone, color: "purple" },
  { name: "Sylhet Police Control Room", number: "0821-714999", icon: Shield, color: "blue" },
  { name: "Al-Haramain Hospital", number: "0821-716000", icon: Heart, color: "green" },
];

const PHRASES = [
  { en: "How much does it cost?", sylheti: "Koto takar?", bn: "এটার দাম কত?" },
  { en: "Please take me to...", sylheti: "Amare niya jan...", bn: "আমাকে নিয়ে যান..." },
  { en: "Is it far from here?", sylheti: "Dur hoi?", bn: "এটা কি এখান থেকে দূরে?" },
  { en: "Thank you very much", sylheti: "Bahut dhonnobad", bn: "অনেক ধন্যবাদ" },
  { en: "I need a doctor", sylheti: "Amar daktar lagbo", bn: "আমার ডাক্তার দরকার" },
  { en: "Where is the mosque?", sylheti: "Masjid kotha?", bn: "মসজিদ কোথায়?" },
  { en: "Call the police!", sylheti: "Police dako!", bn: "পুলিশ ডাকো!" },
  { en: "This price is too high", sylheti: "Dam beshi hoi", bn: "দাম বেশি হচ্ছে" },
  { en: "Delicious food!", sylheti: "Khana maja hoi!", bn: "খাবার মজা হয়েছে!" },
  { en: "Take me to the hospital", sylheti: "Haaspaatal niya jan", bn: "হাসপাতালে নিয়ে যাও" },
];

const TYPE_COLORS: Record<string, string> = {
  review: "border-blue-400",
  update: "border-green-400",
  alert: "border-red-400",
};

export function CommunityEmergency() {
  const { tx } = useLang();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"community" | "emergency" | "phrases">("community");
  const [newPost, setNewPost] = useState({ user_name: "", post_type: "update", location: "", content: "" });
  const [postSuccess, setPostSuccess] = useState(false);
  const [upvoted, setUpvoted] = useState<Set<number>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/api/community")
      .then(r => r.json())
      .then(data => { setPosts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleUpvote = async (postId: number) => {
    if (upvoted.has(postId)) return;
    setUpvoted(prev => new Set([...prev, postId]));
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p));
    await fetch(`/api/community/${postId}/upvote`, { method: "POST" }).catch(() => {});
  };

  const handleSubmitPost = async () => {
    if (!newPost.content.trim() || !newPost.location.trim()) return;
    setSubmitting(true);
    try {
      const resp = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newPost,
          user_name: newPost.user_name || "Anonymous",
          is_warning: newPost.post_type === "alert",
        }),
      });
      if (resp.ok) {
        const created = await resp.json();
        setPosts(prev => [created, ...prev]);
        setNewPost({ user_name: "", post_type: "update", location: "", content: "" });
        setPostSuccess(true);
        setTimeout(() => setPostSuccess(false), 3000);
      }
    } catch {}
    setSubmitting(false);
  };

  const displayedPosts = showAll ? posts : posts.slice(0, 5);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{tx.community}</h2>
        <p className="text-gray-500 text-sm">Real-time updates, emergency contacts & essential Sylheti phrases</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { key: "community", label: "💬 Community Updates" },
          { key: "emergency", label: "🆘 Emergency Contacts" },
          { key: "phrases", label: "🗣️ Sylheti Phrases" },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as typeof activeTab)}
            className={`px-4 py-2.5 rounded-lg text-sm transition-colors ${activeTab === t.key ? "bg-[#0B5345] text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Community Tab */}
      {activeTab === "community" && (
        <>
          {/* New Post Form */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <h3 className="font-semibold text-gray-800 mb-4">{tx.shareUpdate}</h3>
            {postSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3 text-green-700 text-sm">
                ✓ Your update has been posted!
              </div>
            )}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                value={newPost.user_name}
                onChange={e => setNewPost(p => ({ ...p, user_name: e.target.value }))}
                placeholder="Your name (optional)"
                className="px-3 py-2 bg-[#F8F9F9] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0B5345]"
              />
              <select
                value={newPost.post_type}
                onChange={e => setNewPost(p => ({ ...p, post_type: e.target.value }))}
                className="px-3 py-2 bg-[#F8F9F9] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0B5345]"
              >
                <option value="update">Travel Update</option>
                <option value="review">Review</option>
                <option value="alert">⚠️ Safety Alert</option>
              </select>
            </div>
            <input
              type="text"
              value={newPost.location}
              onChange={e => setNewPost(p => ({ ...p, location: e.target.value }))}
              placeholder="Location (e.g., Jaflong, Ratargul) *"
              className="w-full px-3 py-2 bg-[#F8F9F9] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0B5345] mb-3"
            />
            <textarea
              rows={3}
              value={newPost.content}
              onChange={e => setNewPost(p => ({ ...p, content: e.target.value }))}
              placeholder="Share current conditions, a tip, or a review with fellow travelers... *"
              className="w-full px-3 py-2 bg-[#F8F9F9] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0B5345] mb-3"
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-400">* Required fields</p>
              <button
                onClick={handleSubmitPost}
                disabled={!newPost.content.trim() || !newPost.location.trim() || submitting}
                className="flex items-center gap-2 bg-[#2ECC71] text-white px-5 py-2 rounded-lg hover:bg-[#27AE60] transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
              >
                {submitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {tx.postUpdate}
              </button>
            </div>
          </div>

          {/* Posts */}
          {loading ? (
            <div className="flex justify-center py-12">
              <RefreshCw className="w-6 h-6 animate-spin text-[#0B5345]" />
            </div>
          ) : (
            <div className="space-y-3">
              {displayedPosts.map(post => (
                <div key={post.id} className={`bg-white rounded-xl border-l-4 p-4 hover:shadow-sm transition-shadow ${TYPE_COLORS[post.post_type] || "border-gray-300"}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#0B5345] rounded-full flex items-center justify-center text-white text-xs">
                        {post.user_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{post.user_name}</p>
                        <p className="text-xs text-gray-400">{post.location} • {new Date(post.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${
                        post.post_type === "alert" ? "bg-red-100 text-red-700" :
                        post.post_type === "review" ? "bg-blue-100 text-blue-700" :
                        "bg-green-100 text-green-700"
                      }`}>{post.post_type}</span>
                    </div>
                  </div>
                  {post.is_warning && (
                    <div className="flex items-center gap-1 text-red-600 text-xs mb-2">
                      <AlertTriangle className="w-3 h-3" /> Safety Alert
                    </div>
                  )}
                  <p className="text-sm text-gray-700 mb-3">{post.content}</p>
                  <button
                    onClick={() => handleUpvote(post.id)}
                    className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full transition-colors ${
                      upvoted.has(post.id) ? "bg-[#2ECC71] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" /> {post.upvotes + (upvoted.has(post.id) ? 1 : 0)} Helpful
                  </button>
                </div>
              ))}
              {posts.length > 5 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm text-[#0B5345] hover:underline"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
                  {showAll ? "Show less" : `Show ${posts.length - 5} more updates`}
                </button>
              )}
            </div>
          )}
        </>
      )}

      {/* Emergency Tab */}
      {activeTab === "emergency" && (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 text-red-700 mb-1">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-semibold">National Emergency: Call 999</span>
            </div>
            <p className="text-sm text-red-600">Available 24/7 for police, fire, and ambulance services.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EMERGENCY.map((e, i) => {
              const Icon = e.icon;
              const colorMap: Record<string, string> = {
                blue: "bg-blue-50 border-blue-200",
                red: "bg-red-50 border-red-200",
                green: "bg-green-50 border-green-200",
                purple: "bg-purple-50 border-purple-200",
              };
              const iconColorMap: Record<string, string> = {
                blue: "bg-blue-100 text-blue-600",
                red: "bg-red-100 text-red-600",
                green: "bg-green-100 text-green-600",
                purple: "bg-purple-100 text-purple-600",
              };
              return (
                <div key={i} className={`${colorMap[e.color]} border rounded-xl p-4`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconColorMap[e.color]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{e.name}</p>
                    </div>
                  </div>
                  <a
                    href={`tel:${e.number}`}
                    className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#0B5345]" />
                    <span className="font-mono font-bold text-[#0B5345]">{e.number}</span>
                    <span className="text-xs text-gray-400 ml-auto">Tap to call</span>
                  </a>
                </div>
              );
            })}
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mt-4">
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5" /> Useful Tips for Tourists
            </h4>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• Keep a photo of your passport/visa on your phone</li>
              <li>• Share your itinerary with someone back home</li>
              <li>• The Tourist Police are specifically trained to help foreign visitors</li>
              <li>• Download maps offline before heading to remote haor areas</li>
              <li>• Local SIM cards (Grameenphone/Robi) are available at Sylhet airport</li>
            </ul>
          </div>
        </div>
      )}

      {/* Phrases Tab */}
      {activeTab === "phrases" && (
        <div>
          <div className="bg-gradient-to-r from-[#0B5345] to-[#2ECC71] text-white rounded-xl p-5 mb-5">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5" />
              <h3 className="font-semibold">Essential Sylheti Phrases</h3>
            </div>
            <p className="text-white/80 text-sm">Sylheti is distinct from standard Bengali — locals appreciate the effort!</p>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {PHRASES.map((p, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-shadow">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">English</p>
                    <p className="text-sm font-medium text-gray-800">{p.en}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Sylheti</p>
                    <p className="text-sm font-semibold text-[#0B5345] italic">{p.sylheti}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Bengali</p>
                    <p className="text-sm text-gray-700">{p.bn}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
