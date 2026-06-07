import { Users, UserCheck, Camera, Activity, TrendingUp, Eye, X, Shield } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

type SessionUser = {
  id: string;
  type: "Tourist" | "Guide" | "Contributor";
  activity: string;
  location: string;
  duration: string;
  ip: string;
  device: string;
  pagesViewed: number;
};

const sessions: SessionUser[] = [
  { id: "TOU_8472", type: "Tourist", activity: "Browsing Sreemangal tours", location: "Sylhet City", duration: "12m 34s", ip: "103.26.XX.XX", device: "Chrome / Android", pagesViewed: 8 },
  { id: "GUD_2193", type: "Guide", activity: "Managing bookings", location: "Sreemangal", duration: "47m 12s", ip: "203.190.XX.XX", device: "Firefox / Windows", pagesViewed: 14 },
  { id: "CON_5621", type: "Contributor", activity: "Uploading photos", location: "Ratargul", duration: "8m 43s", ip: "103.26.XX.XX", device: "Safari / iOS", pagesViewed: 5 },
  { id: "TOU_3847", type: "Tourist", activity: "Viewing fare calculator", location: "Jaflong", duration: "3m 18s", ip: "117.58.XX.XX", device: "Chrome / Windows", pagesViewed: 3 },
  { id: "GUD_1742", type: "Guide", activity: "Updating profile", location: "Shamshernagar", duration: "21m 05s", ip: "202.134.XX.XX", device: "Chrome / MacOS", pagesViewed: 11 },
];

const typeColor = {
  Tourist: "bg-blue-100 text-blue-700",
  Guide: "bg-green-100 text-green-700",
  Contributor: "bg-purple-100 text-purple-700",
};

export function UserStatusMatrix() {
  const [viewingUser, setViewingUser] = useState<SessionUser | null>(null);

  return (
    <div className="p-8">
      {viewingUser && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setViewingUser(null)}>
          <div className="bg-white rounded-xl max-w-lg w-full p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Session Detail — {viewingUser.id}</h3>
                <span className={`px-3 py-1 rounded-full text-xs ${typeColor[viewingUser.type]}`}>{viewingUser.type}</span>
              </div>
              <button onClick={() => setViewingUser(null)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4 bg-[#F8F9F9] rounded-lg mb-4">
              <div><p className="text-xs text-gray-500 mb-1">Current Activity</p><p className="font-semibold text-gray-800 text-sm">{viewingUser.activity}</p></div>
              <div><p className="text-xs text-gray-500 mb-1">Location</p><p className="font-semibold text-gray-800 text-sm">{viewingUser.location}</p></div>
              <div><p className="text-xs text-gray-500 mb-1">Session Duration</p><p className="font-semibold text-gray-800 text-sm">{viewingUser.duration}</p></div>
              <div><p className="text-xs text-gray-500 mb-1">Pages Viewed</p><p className="font-semibold text-gray-800 text-sm">{viewingUser.pagesViewed} pages</p></div>
              <div><p className="text-xs text-gray-500 mb-1">IP Address</p><p className="font-semibold text-gray-800 text-sm">{viewingUser.ip}</p></div>
              <div><p className="text-xs text-gray-500 mb-1">Device</p><p className="font-semibold text-gray-800 text-sm">{viewingUser.device}</p></div>
            </div>
            <div className="flex items-center gap-2 text-green-600 mb-6 text-sm">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
              Session Active Now
            </div>
            <div className="flex gap-3">
              <button onClick={() => setViewingUser(null)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                Close
              </button>
              <button
                onClick={() => { setViewingUser(null); }}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
              >
                Terminate Session
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">System Overview</h2>
        <p className="text-gray-600">Real-time monitoring of all user panels and system activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">+12% today</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">2,847</h3>
          <p className="text-sm text-gray-600">Active Tourists</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">42 online</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">127</h3>
          <p className="text-sm text-gray-600">Verified Guides</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Camera className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">18 active</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">384</h3>
          <p className="text-sm text-gray-600">Contributors</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">7 pending</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">23</h3>
          <p className="text-sm text-gray-600">Moderation Queue</p>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <Link to="/admin/guides" className="bg-[#0B5345] text-white p-4 rounded-xl hover:bg-[#0a4538] transition-colors text-center">
          <UserCheck className="w-6 h-6 mx-auto mb-2" />
          <p className="text-sm font-semibold">3 Pending</p>
          <p className="text-xs text-white/80">Guide Applications</p>
        </Link>
        <Link to="/admin/moderation" className="bg-yellow-500 text-white p-4 rounded-xl hover:bg-yellow-600 transition-colors text-center">
          <Activity className="w-6 h-6 mx-auto mb-2" />
          <p className="text-sm font-semibold">4 Pending</p>
          <p className="text-xs text-white/80">Content Reviews</p>
        </Link>
        <Link to="/admin/fares" className="bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition-colors text-center">
          <Shield className="w-6 h-6 mx-auto mb-2" />
          <p className="text-sm font-semibold">5 Routes</p>
          <p className="text-xs text-white/80">Manage Fares</p>
        </Link>
        <Link to="/admin/spots" className="bg-purple-600 text-white p-4 rounded-xl hover:bg-purple-700 transition-colors text-center">
          <Eye className="w-6 h-6 mx-auto mb-2" />
          <p className="text-sm font-semibold">5 Spots</p>
          <p className="text-xs text-white/80">Manage Spots</p>
        </Link>
      </div>

      {/* Active Sessions Table */}
      <div className="bg-white rounded-xl shadow-md mb-8">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Active User Sessions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8F9F9]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Current Activity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Session Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sessions.map((session) => (
                <tr key={session.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800 font-mono">{session.id}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${typeColor[session.type]}`}>{session.type}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{session.activity}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{session.location}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{session.duration}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2 text-green-600 text-sm">
                      <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setViewingUser(session)}
                      className="text-[#0B5345] hover:underline text-sm"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-[#F8F9F9] border-t border-gray-200">
          <p className="text-sm text-gray-600">Showing 5 of 127 active sessions</p>
        </div>
      </div>

      {/* System Analytics */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-[#0B5345]" />
            <h3 className="text-xl font-semibold text-gray-800">User Growth (Last 30 Days)</h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Tourists</span>
                <span className="text-sm font-semibold text-gray-800">+347 new</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "78%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Guides</span>
                <span className="text-sm font-semibold text-gray-800">+12 new</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "42%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Contributors</span>
                <span className="text-sm font-semibold text-gray-800">+28 new</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "56%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-6 h-6 text-[#0B5345]" />
            <h3 className="text-xl font-semibold text-gray-800">Panel Activity Today</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-800">Tourist Panel</p>
                <p className="text-sm text-gray-600">2,847 active users</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">84%</p>
                <p className="text-xs text-gray-600">Engagement</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-800">Guide Panel</p>
                <p className="text-sm text-gray-600">42 active users</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">92%</p>
                <p className="text-xs text-gray-600">Engagement</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-800">Contributor Panel</p>
                <p className="text-sm text-gray-600">18 active users</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-600">67%</p>
                <p className="text-xs text-gray-600">Engagement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
