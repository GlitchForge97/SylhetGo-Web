import { UserCheck, CheckCircle, XCircle, Eye, Award, Star, MapPin, X } from "lucide-react";
import { useState } from "react";

type Guide = {
  id: number;
  name: string;
  specialty: string;
  areas: string[];
  experience: string;
  languages: string;
  phone: string;
  appliedDate: string;
  status: "pending" | "approved" | "rejected";
};

export function GuideVerification() {
  const [pendingGuides, setPendingGuides] = useState<Guide[]>([
    { id: 1, name: "Mohan Kumar Das", specialty: "Adventure & Trekking", areas: ["Lawachara", "Srimangal"], experience: "8 years", languages: "Bengali, English, Hindi", phone: "+880-1712-XXXXXX", appliedDate: "June 4, 2026", status: "pending" },
    { id: 2, name: "Salma Khatun", specialty: "Haor Navigation", areas: ["Ratargul", "Tanguar Haor"], experience: "5 years", languages: "Bengali, English", phone: "+880-1813-XXXXXX", appliedDate: "June 3, 2026", status: "pending" },
    { id: 3, name: "David Thompson", specialty: "Photography Tours", areas: ["Jaflong", "Bholaganj", "Sreemangal"], experience: "12 years", languages: "English, Bengali, French", phone: "+880-1923-XXXXXX", appliedDate: "June 2, 2026", status: "pending" },
  ]);

  const [verifiedGuides, setVerifiedGuides] = useState([
    { id: 101, name: "Rafiq Ahmed", specialty: "Tea Estate Expert", rating: 4.9, tours: 340, verified: "2024" },
    { id: 102, name: "Anika Rahman", specialty: "Cultural Heritage", rating: 4.8, tours: 215, verified: "2024" },
    { id: 103, name: "Mohan Das", specialty: "Adventure & Trekking", rating: 4.9, tours: 428, verified: "2023" },
    { id: 104, name: "Salma Begum", specialty: "Haor Navigation", rating: 4.7, tours: 182, verified: "2025" },
  ]);

  const [viewingGuide, setViewingGuide] = useState<Guide | null>(null);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleApprove = (id: number) => {
    const guide = pendingGuides.find(g => g.id === id);
    if (!guide) return;
    setPendingGuides(prev => prev.map(g => g.id === id ? { ...g, status: "approved" } : g));
    setVerifiedGuides(prev => [...prev, { id: id + 200, name: guide.name, specialty: guide.specialty, rating: 5.0, tours: 0, verified: "2026" }]);
    setViewingGuide(null);
    showToast(`✓ ${guide.name} has been verified and added to the guide directory.`);
  };

  const handleReject = (id: number) => {
    const guide = pendingGuides.find(g => g.id === id);
    setPendingGuides(prev => prev.map(g => g.id === id ? { ...g, status: "rejected" } : g));
    setViewingGuide(null);
    if (guide) showToast(`✗ ${guide.name}'s application has been rejected.`);
  };

  const handleRevoke = (id: number) => {
    const guide = verifiedGuides.find(g => g.id === id);
    setVerifiedGuides(prev => prev.filter(g => g.id !== id));
    if (guide) showToast(`Badge revoked for ${guide.name}.`);
  };

  const pending = pendingGuides.filter(g => g.status === "pending");

  return (
    <div className="p-8 relative">
      {toast && (
        <div className="fixed top-6 right-6 bg-[#0B5345] text-white px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3 animate-bounce">
          <span className="text-sm">{toast}</span>
          <button onClick={() => setToast("")}><X className="w-4 h-4" /></button>
        </div>
      )}

      {viewingGuide && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setViewingGuide(null)}>
          <div className="bg-white rounded-xl max-w-lg w-full p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-[#0B5345] rounded-full flex items-center justify-center text-white text-2xl">
                  {viewingGuide.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{viewingGuide.name}</h3>
                  <p className="text-gray-600">{viewingGuide.specialty}</p>
                </div>
              </div>
              <button onClick={() => setViewingGuide(null)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-[#F8F9F9] rounded-lg">
              <div><p className="text-xs text-gray-500 mb-1">Experience</p><p className="font-semibold">{viewingGuide.experience}</p></div>
              <div><p className="text-xs text-gray-500 mb-1">Languages</p><p className="font-semibold">{viewingGuide.languages}</p></div>
              <div><p className="text-xs text-gray-500 mb-1">Contact</p><p className="font-semibold">{viewingGuide.phone}</p></div>
              <div><p className="text-xs text-gray-500 mb-1">Applied</p><p className="font-semibold">{viewingGuide.appliedDate}</p></div>
            </div>
            <div className="mb-6">
              <p className="text-xs text-gray-500 mb-2">Operating Areas</p>
              <div className="flex flex-wrap gap-2">
                {viewingGuide.areas.map(area => (
                  <span key={area} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3" />{area}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleReject(viewingGuide.id)} className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                <XCircle className="w-4 h-4" /> Reject
              </button>
              <button onClick={() => handleApprove(viewingGuide.id)} className="flex-1 bg-[#2ECC71] text-white py-3 rounded-lg hover:bg-[#27AE60] transition-colors flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" /> Grant Verified Badge
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">Guide Verification Portal</h2>
        <p className="text-gray-600">Review and approve guide applications to maintain service quality</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <UserCheck className="w-8 h-8 text-[#0B5345] mb-2" />
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{verifiedGuides.length}</h3>
          <p className="text-sm text-gray-600">Verified Guides</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <span className="text-3xl mb-2">⏳</span>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{pending.length}</h3>
          <p className="text-sm text-gray-600">Pending Applications</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <Star className="w-8 h-8 text-yellow-500 mb-2" />
          <h3 className="text-2xl font-bold text-gray-800 mb-1">4.8</h3>
          <p className="text-sm text-gray-600">Average Guide Rating</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <Award className="w-8 h-8 text-purple-600 mb-2" />
          <h3 className="text-2xl font-bold text-gray-800 mb-1">23</h3>
          <p className="text-sm text-gray-600">Top Rated (4.9+)</p>
        </div>
      </div>

      {/* Pending Applications */}
      {pending.length > 0 ? (
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="p-6 bg-yellow-500 text-white">
            <h3 className="text-xl font-semibold">Pending Verification Requests ({pending.length})</h3>
          </div>
          <div className="p-6 space-y-4">
            {pending.map((guide) => (
              <div key={guide.id} className="border border-gray-200 rounded-lg p-6 hover:border-[#0B5345] transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-[#0B5345] rounded-full flex items-center justify-center text-white text-2xl">
                      {guide.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-1">{guide.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{guide.specialty}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>Applied: {guide.appliedDate}</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Pending Review</span>
                </div>
                <div className="grid grid-cols-3 gap-6 mb-4 p-4 bg-[#F8F9F9] rounded-lg">
                  <div><p className="text-xs text-gray-500 mb-1">Experience</p><p className="font-semibold text-gray-800">{guide.experience}</p></div>
                  <div><p className="text-xs text-gray-500 mb-1">Languages</p><p className="font-semibold text-gray-800">{guide.languages}</p></div>
                  <div><p className="text-xs text-gray-500 mb-1">Contact</p><p className="font-semibold text-gray-800">{guide.phone}</p></div>
                </div>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {guide.areas.map(area => (
                      <span key={area} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{area}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setViewingGuide(guide)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 text-sm">
                    <Eye className="w-4 h-4" /> View Full Application
                  </button>
                  <button onClick={() => handleReject(guide.id)} className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 text-sm">
                    <XCircle className="w-4 h-4" /> Reject Application
                  </button>
                  <button onClick={() => handleApprove(guide.id)} className="flex-1 bg-[#2ECC71] text-white py-2 rounded-lg hover:bg-[#27AE60] transition-colors flex items-center justify-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4" /> Grant Verified Badge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 mb-8 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <p className="text-green-700 font-semibold">All applications reviewed!</p>
          <p className="text-green-600 text-sm">No pending verification requests at this time.</p>
        </div>
      )}

      {/* Verified Guides List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 bg-[#0B5345] text-white flex items-center justify-between">
          <h3 className="text-xl font-semibold">Currently Verified Guides ({verifiedGuides.length})</h3>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            <span className="text-sm">SylhetGo Verified</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8F9F9]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Guide Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Specialty</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rating</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Total Tours</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Verified Since</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {verifiedGuides.map((guide) => (
                <tr key={guide.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#0B5345] rounded-full flex items-center justify-center text-white">{guide.name.charAt(0)}</div>
                      <span className="font-medium text-gray-800">{guide.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{guide.specialty}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-semibold text-gray-800">{guide.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{guide.tours} tours</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{guide.verified}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:underline text-sm">View Profile</button>
                      <button onClick={() => handleRevoke(guide.id)} className="text-red-600 hover:underline text-sm">Revoke Badge</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
