import { MapPin, Upload, Image as ImageIcon, Plus, Eye, Edit2, Trash2, CheckCircle, X } from "lucide-react";
import { useState, useRef } from "react";

type Spot = {
  id: number;
  name: string;
  location: string;
  status: "Published" | "Draft";
  photos: number;
  views: number;
};

export function SpotPublisher() {
  const [spots, setSpots] = useState<Spot[]>([
    { id: 1, name: "Ratargul Swamp Forest", location: "Gowainghat, Sylhet", status: "Published", photos: 12, views: 8420 },
    { id: 2, name: "Jaflong", location: "Gowainghat, Sylhet", status: "Published", photos: 18, views: 15230 },
    { id: 3, name: "Sreemangal Tea Estates", location: "Sreemangal, Moulvibazar", status: "Published", photos: 24, views: 12840 },
    { id: 4, name: "Bholaganj Sada Pathor", location: "Companiganj, Sylhet", status: "Published", photos: 9, views: 6720 },
    { id: 5, name: "Shamshernagar Heritage Site", location: "Shamshernagar, Moulvibazar", status: "Draft", photos: 5, views: 0 },
  ]);

  const [form, setForm] = useState({
    name: "", location: "", lat: "", lng: "", category: "", bestTime: "", description: "",
  });
  const [formFiles, setFormFiles] = useState<string[]>([]);
  const [toast, setToast] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFiles(Array.from(e.target.files || []).map(f => f.name));
  };

  const handlePublish = (asDraft = false) => {
    if (!form.name || !form.location || !form.description) return;
    const newSpot: Spot = {
      id: Math.max(...spots.map(s => s.id)) + 1,
      name: form.name,
      location: form.location,
      status: asDraft ? "Draft" : "Published",
      photos: formFiles.length || 0,
      views: 0,
    };
    setSpots(prev => [newSpot, ...prev]);
    setForm({ name: "", location: "", lat: "", lng: "", category: "", bestTime: "", description: "" });
    setFormFiles([]);
    setFormSuccess(asDraft ? "Spot saved as draft." : "Spot published successfully!");
    showToast(asDraft ? "📝 Saved as draft." : `✓ "${newSpot.name}" is now live!`);
    setTimeout(() => setFormSuccess(""), 4000);
  };

  const handleDelete = (id: number) => {
    const spot = spots.find(s => s.id === id);
    setSpots(prev => prev.filter(s => s.id !== id));
    if (spot) showToast(`✗ "${spot.name}" deleted.`);
  };

  const handleToggleStatus = (id: number) => {
    setSpots(prev => prev.map(s =>
      s.id === id
        ? { ...s, status: s.status === "Published" ? "Draft" : "Published" }
        : s
    ));
  };

  const totalViews = spots.reduce((sum, s) => sum + s.views, 0);
  const totalPhotos = spots.reduce((sum, s) => sum + s.photos, 0);

  return (
    <div className="p-8 relative">
      {toast && (
        <div className="fixed top-6 right-6 bg-[#0B5345] text-white px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3">
          <span className="text-sm">{toast}</span>
          <button onClick={() => setToast("")}><X className="w-4 h-4" /></button>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">Spot & Content Publisher</h2>
        <p className="text-gray-600">Add and manage destination listings with high-quality imagery</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <MapPin className="w-8 h-8 text-[#0B5345] mb-2" />
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{spots.filter(s => s.status === "Published").length}</h3>
          <p className="text-sm text-gray-600">Published Spots</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <ImageIcon className="w-8 h-8 text-blue-600 mb-2" />
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{totalPhotos}</h3>
          <p className="text-sm text-gray-600">Total Photos</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <Eye className="w-8 h-8 text-purple-600 mb-2" />
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{totalViews >= 1000 ? `${(totalViews / 1000).toFixed(0)}K` : totalViews}</h3>
          <p className="text-sm text-gray-600">Total Views</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <span className="text-3xl mb-2 block">📝</span>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{spots.filter(s => s.status === "Draft").length}</h3>
          <p className="text-sm text-gray-600">Draft Spots</p>
        </div>
      </div>

      {/* Add New Spot Form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Plus className="w-6 h-6 text-[#0B5345]" />
            <h3 className="text-xl font-semibold text-gray-800">Add New Destination</h3>
          </div>
          {formSuccess && (
            <div className="flex items-center gap-2 text-green-700 text-sm">
              <CheckCircle className="w-4 h-4" />
              {formSuccess}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Spot Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g., Sreemangal Tea Estates"
                className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
              <input
                type="text"
                value={form.location}
                onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                placeholder="e.g., Sreemangal, Moulvibazar"
                className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">GPS Coordinates</label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={form.lat}
                  onChange={e => setForm(p => ({ ...p, lat: e.target.value }))}
                  placeholder="Latitude"
                  className="px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
                />
                <input
                  type="text"
                  value={form.lng}
                  onChange={e => setForm(p => ({ ...p, lng: e.target.value }))}
                  placeholder="Longitude"
                  className="px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
              <select
                value={form.category}
                onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
              >
                <option value="">Select category...</option>
                <option>Nature & Wildlife</option>
                <option>Spiritual & Heritage</option>
                <option>Adventure & Trekking</option>
                <option>Cultural Experience</option>
                <option>Tea Tourism</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Best Time to Visit</label>
              <input
                type="text"
                value={form.bestTime}
                onChange={e => setForm(p => ({ ...p, bestTime: e.target.value }))}
                placeholder="e.g., October to April"
                className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
              <textarea
                rows={6}
                value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                placeholder="Provide a detailed, engaging description of the destination..."
                className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Photographs</label>
              <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#0B5345] transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                {formFiles.length > 0 ? (
                  <div>
                    <p className="text-[#0B5345] font-medium">{formFiles.length} file(s) selected</p>
                    <p className="text-xs text-gray-500 mt-1">{formFiles.slice(0, 2).join(", ")}{formFiles.length > 2 ? ` +${formFiles.length - 2} more` : ""}</p>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 mb-2">Drag realistic local photography here</p>
                    <p className="text-xs text-gray-500 mb-3">Minimum 3 photos, maximum 20. Each up to 15MB.</p>
                  </>
                )}
                <button
                  type="button"
                  className="mt-2 bg-[#0B5345] text-white px-6 py-2 rounded-lg hover:bg-[#0a4538] transition-colors flex items-center gap-2 mx-auto"
                  onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}
                >
                  <Upload className="w-4 h-4" />
                  Choose Files
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handlePublish(true)}
                disabled={!form.name || !form.location || !form.description}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Save as Draft
              </button>
              <button
                onClick={() => handlePublish(false)}
                disabled={!form.name || !form.location || !form.description}
                className="flex-1 bg-[#2ECC71] text-white py-3 rounded-lg hover:bg-[#27AE60] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Publish Spot
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Existing Spots Management */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 bg-[#0B5345] text-white">
          <h3 className="text-xl font-semibold">Manage Existing Spots ({spots.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8F9F9]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Spot Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Photos</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Total Views</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {spots.map((spot) => (
                <tr key={spot.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-[#0B5345]" />
                      <span className="font-medium text-gray-800">{spot.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{spot.location}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{spot.photos} photos</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{spot.views.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleStatus(spot.id)}
                      className={`px-3 py-1 rounded-full text-xs cursor-pointer transition-colors ${
                        spot.status === "Published"
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      }`}
                    >
                      {spot.status}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors" title="Preview">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(spot.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Content Guidelines */}
      <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-3">Content Quality Guidelines</h3>
        <ul className="text-sm text-green-800 space-y-2">
          <li>• Use realistic, high-resolution photography from actual locations</li>
          <li>• Avoid generic stock images — prioritize authentic local photography</li>
          <li>• Provide accurate GPS coordinates for navigation purposes</li>
          <li>• Include seasonal accessibility information (especially for Haor areas)</li>
          <li>• Highlight unique local features and indigenous cultural aspects</li>
        </ul>
      </div>
    </div>
  );
}
