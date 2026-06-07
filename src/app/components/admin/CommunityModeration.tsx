import { MessageSquare, CheckCircle, XCircle, Eye, AlertTriangle, Image as ImageIcon, Flag, Edit2, X } from "lucide-react";
import { useState } from "react";

type ContentItem = {
  id: number;
  type: string;
  user: string;
  location: string;
  content: string;
  timestamp: string;
  photoCount: number;
  status: "pending" | "approved" | "rejected";
  priority?: string;
};

type FlaggedItem = {
  id: number;
  type: string;
  user: string;
  reason: string;
  flaggedBy: number;
  content: string;
  timestamp: string;
  dismissed?: boolean;
};

export function CommunityModeration() {
  const [queue, setQueue] = useState<ContentItem[]>([
    { id: 1, type: "Photo Upload", user: "TravelExplorer_BD", location: "Sreemangal Tea Estates", content: "Amazing sunrise view over the tea gardens. The morning mist creates a magical atmosphere!", timestamp: "2 hours ago", photoCount: 3, status: "pending" },
    { id: 2, type: "Community Update", user: "LocalGuide_Rafiq", location: "Ratargul Swamp Forest", content: "Water levels are perfect this week for boat tours. Best time to visit is early morning before 9 AM.", timestamp: "4 hours ago", photoCount: 0, status: "pending" },
    { id: 3, type: "Hazard Report", user: "SafetyFirst_User", location: "Jaflong Road", content: "Road construction ongoing near Jaflong entrance. Expect 20-30 minute delays during 10 AM - 4 PM.", timestamp: "6 hours ago", photoCount: 2, status: "pending", priority: "high" },
    { id: 4, type: "Travel Review", user: "Wanderer_Sarah", location: "Bholaganj Sada Pathor", content: "Crystal clear water and stunning white stones. Guide 'Mohan' was excellent - very knowledgeable about local geology!", timestamp: "8 hours ago", photoCount: 5, status: "pending" },
  ]);

  const [flagged, setFlagged] = useState<FlaggedItem[]>([
    { id: 501, type: "Comment", user: "Anonymous_User", reason: "Inappropriate language", flaggedBy: 3, content: "This place is overrated and the guides are...", timestamp: "1 day ago" },
    { id: 502, type: "Photo", user: "PhotoSpammer_123", reason: "Spam/Advertising", flaggedBy: 7, content: "Multiple photos with commercial watermarks", timestamp: "2 days ago" },
  ]);

  const [toast, setToast] = useState("");
  const [viewingItem, setViewingItem] = useState<ContentItem | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleAction = (id: number, action: "approved" | "rejected") => {
    setQueue(prev => prev.map(item => item.id === id ? { ...item, status: action } : item));
    showToast(action === "approved" ? "✓ Content approved and published!" : "✗ Content rejected.");
    setViewingItem(null);
  };

  const handleApproveAll = () => {
    setQueue(prev => prev.map(item => item.status === "pending" ? { ...item, status: "approved" } : item));
    showToast("✓ All pending content approved and published!");
  };

  const handleRejectAll = () => {
    setQueue(prev => prev.map(item => item.status === "pending" ? { ...item, status: "rejected" } : item));
    showToast("✗ All pending content rejected.");
  };

  const dismissFlag = (id: number) => {
    setFlagged(prev => prev.map(f => f.id === id ? { ...f, dismissed: true } : f));
    showToast("Flags dismissed.");
  };

  const removeContent = (id: number) => {
    setFlagged(prev => prev.filter(f => f.id !== id));
    showToast("Content removed successfully.");
  };

  const pending = queue.filter(q => q.status === "pending");
  const activeFlagged = flagged.filter(f => !f.dismissed);

  return (
    <div className="p-8 relative">
      {toast && (
        <div className="fixed top-6 right-6 bg-[#0B5345] text-white px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3">
          <span className="text-sm">{toast}</span>
          <button onClick={() => setToast("")}><X className="w-4 h-4" /></button>
        </div>
      )}

      {viewingItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setViewingItem(null)}>
          <div className="bg-white rounded-xl max-w-lg w-full p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-xs ${
                viewingItem.type === "Photo Upload" ? "bg-blue-100 text-blue-700" :
                viewingItem.type === "Community Update" ? "bg-green-100 text-green-700" :
                viewingItem.type === "Hazard Report" ? "bg-red-100 text-red-700" :
                "bg-purple-100 text-purple-700"
              }`}>{viewingItem.type}</span>
              <button onClick={() => setViewingItem(null)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <p className="font-semibold text-gray-800 mb-1">{viewingItem.user}</p>
            <p className="text-sm text-gray-500 mb-3">{viewingItem.location} • {viewingItem.timestamp}</p>
            {viewingItem.photoCount > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-600 mb-3">
                <ImageIcon className="w-3 h-3" />{viewingItem.photoCount} photos attached
              </div>
            )}
            <p className="text-gray-700 bg-[#F8F9F9] p-4 rounded-lg mb-6">"{viewingItem.content}"</p>
            <div className="flex gap-3">
              <button onClick={() => handleAction(viewingItem.id, "rejected")} className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                <XCircle className="w-4 h-4" /> Reject
              </button>
              <button onClick={() => handleAction(viewingItem.id, "approved")} className="flex-1 bg-[#2ECC71] text-white py-3 rounded-lg hover:bg-[#27AE60] transition-colors flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" /> Approve & Publish
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">Community Moderation Queue</h2>
        <p className="text-gray-600">Review and approve user-generated content before it goes live</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <MessageSquare className="w-8 h-8 text-[#0B5345] mb-2" />
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{pending.length}</h3>
          <p className="text-sm text-gray-600">Pending Reviews</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <Flag className="w-8 h-8 text-red-500 mb-2" />
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{activeFlagged.length}</h3>
          <p className="text-sm text-gray-600">Flagged Content</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{queue.filter(q => q.status === "approved").length + 1847}</h3>
          <p className="text-sm text-gray-600">Approved (30 days)</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <XCircle className="w-8 h-8 text-gray-500 mb-2" />
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{queue.filter(q => q.status === "rejected").length + 42}</h3>
          <p className="text-sm text-gray-600">Rejected (30 days)</p>
        </div>
      </div>

      {/* Flagged Content */}
      {activeFlagged.length > 0 && (
        <div className="bg-white rounded-xl shadow-md mb-8 border-l-4 border-red-500">
          <div className="p-6 bg-red-500 text-white">
            <div className="flex items-center gap-3">
              <Flag className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Flagged Content - Requires Immediate Attention</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {activeFlagged.map(item => (
              <div key={item.id} className="border border-red-200 rounded-lg p-5 bg-red-50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-red-600 text-white rounded-full text-xs">{item.type}</span>
                      <span className="text-sm text-gray-600">by {item.user}</span>
                    </div>
                    <p className="text-sm text-gray-800 mb-2"><span className="font-semibold">Reason:</span> {item.reason}</p>
                    <p className="text-sm text-gray-600 italic">"{item.content}"</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">{item.timestamp}</p>
                    <p className="text-xs text-red-600 font-semibold">Flagged by {item.flaggedBy} users</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => dismissFlag(item.id)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                    Dismiss Flags
                  </button>
                  <button className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors text-sm">
                    Request Edit
                  </button>
                  <button onClick={() => removeContent(item.id)} className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
                    Remove Content
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approval Queue */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6 bg-[#0B5345] text-white">
          <h3 className="text-xl font-semibold">Content Approval Queue</h3>
        </div>
        <div className="p-6 space-y-4">
          {queue.map(item => (
            <div
              key={item.id}
              className={`border rounded-lg p-5 transition-colors ${
                item.status === "approved" ? "border-green-300 bg-green-50 opacity-70" :
                item.status === "rejected" ? "border-gray-200 bg-gray-50 opacity-50" :
                item.priority === "high" ? "border-yellow-400 bg-yellow-50 hover:border-[#0B5345]" :
                "border-gray-200 hover:border-[#0B5345]"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      item.type === "Photo Upload" ? "bg-blue-100 text-blue-700" :
                      item.type === "Community Update" ? "bg-green-100 text-green-700" :
                      item.type === "Hazard Report" ? "bg-red-100 text-red-700" :
                      "bg-purple-100 text-purple-700"
                    }`}>{item.type}</span>
                    {item.priority === "high" && item.status === "pending" && (
                      <span className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded-full text-xs">
                        <AlertTriangle className="w-3 h-3" /> High Priority
                      </span>
                    )}
                    {item.status !== "pending" && (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "approved" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}>
                        {item.status === "approved" ? "✓ Approved" : "✗ Rejected"}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-800">{item.user}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{item.location}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{item.timestamp}</span>
                  </div>
                  {item.photoCount > 0 && (
                    <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                      <ImageIcon className="w-3 h-3" />{item.photoCount} photos attached
                    </div>
                  )}
                  <p className="text-gray-700 bg-white p-3 rounded-lg border border-gray-200">"{item.content}"</p>
                </div>
              </div>
              {item.status === "pending" && (
                <div className="flex gap-2">
                  <button onClick={() => setViewingItem(item)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 text-sm">
                    <Eye className="w-4 h-4" />{item.photoCount > 0 ? "View Photos" : "View Full Details"}
                  </button>
                  <button className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2 text-sm">
                    <Edit2 className="w-4 h-4" />Request Edits
                  </button>
                  <button onClick={() => handleAction(item.id, "rejected")} className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 text-sm">
                    <XCircle className="w-4 h-4" />Reject
                  </button>
                  <button onClick={() => handleAction(item.id, "approved")} className="flex-1 bg-[#2ECC71] text-white py-2 rounded-lg hover:bg-[#27AE60] transition-colors flex items-center justify-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4" />Approve & Publish
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="p-4 bg-[#F8F9F9] border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">{pending.length} items awaiting review</p>
            {pending.length > 0 && (
              <div className="flex gap-3">
                <button onClick={handleRejectAll} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm">
                  Reject All
                </button>
                <button onClick={handleApproveAll} className="bg-[#2ECC71] text-white px-4 py-2 rounded-lg hover:bg-[#27AE60] transition-colors text-sm">
                  Approve All
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
