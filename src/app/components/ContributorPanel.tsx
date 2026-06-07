import { ArrowLeft, Upload, Camera, AlertTriangle, MapPin, Send, Image as ImageIcon, Award, TrendingUp, CheckCircle, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState, useRef } from "react";

type Submission = { type: string; location: string; status: string; color: string };

export function ContributorPanel() {
  const navigate = useNavigate();

  const [photoForm, setPhotoForm] = useState({ location: "", caption: "", tags: "" });
  const [photoFiles, setPhotoFiles] = useState<string[]>([]);
  const [photoSuccess, setPhotoSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [updateForm, setUpdateForm] = useState({ type: "", location: "", content: "" });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [hazardForm, setHazardForm] = useState({ hazardType: "", location: "", details: "", severity: "" });
  const [hazardSuccess, setHazardSuccess] = useState(false);

  const [submissions, setSubmissions] = useState<Submission[]>([
    { type: "Photo", location: "Sreemangal", status: "Approved", color: "green" },
    { type: "Update", location: "Ratargul", status: "Pending Review", color: "yellow" },
    { type: "Hazard", location: "Jaflong", status: "Published", color: "green" },
  ]);

  const [stats, setStats] = useState({ photos: 47, posts: 23, hazards: 3, views: 12840, votes: 487 });

  const handlePhotoSubmit = () => {
    if (!photoForm.location || !photoForm.caption) return;
    setSubmissions(prev => [{ type: "Photo", location: photoForm.location, status: "Pending Review", color: "yellow" }, ...prev]);
    setStats(prev => ({ ...prev, photos: prev.photos + 1 }));
    setPhotoForm({ location: "", caption: "", tags: "" });
    setPhotoFiles([]);
    setPhotoSuccess(true);
    setTimeout(() => setPhotoSuccess(false), 3000);
  };

  const handleUpdateSubmit = () => {
    if (!updateForm.type || !updateForm.location || !updateForm.content) return;
    setSubmissions(prev => [{ type: "Update", location: updateForm.location, status: "Pending Review", color: "yellow" }, ...prev]);
    setStats(prev => ({ ...prev, posts: prev.posts + 1 }));
    setUpdateForm({ type: "", location: "", content: "" });
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 3000);
  };

  const handleHazardSubmit = () => {
    if (!hazardForm.hazardType || !hazardForm.location || !hazardForm.details || !hazardForm.severity) return;
    setSubmissions(prev => [{ type: "Hazard", location: hazardForm.location, status: "Under Review", color: "yellow" }, ...prev]);
    setStats(prev => ({ ...prev, hazards: prev.hazards + 1 }));
    setHazardForm({ hazardType: "", location: "", details: "", severity: "" });
    setHazardSuccess(true);
    setTimeout(() => setHazardSuccess(false), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPhotoFiles(files.map(f => f.name));
  };

  const handleLogout = () => navigate("/contributor");

  return (
    <div className="min-h-screen bg-[#F8F9F9]">
      {/* Header */}
      <nav className="bg-[#0B5345] text-white px-8 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-[#2ECC71] transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold">Community Contributor Portal</h1>
              <p className="text-xs text-white/80">Share your travel experiences with the community</p>
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
              <h2 className="text-3xl font-semibold mb-2">Welcome, TravelExplorer_BD!</h2>
              <p className="text-white/90">Thank you for contributing to the SylhetGo community. Your insights help thousands of travelers.</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 mb-2">
                <Award className="w-8 h-8" />
                <span className="text-2xl font-bold">Level 3</span>
              </div>
              <p className="text-sm text-white/80">Trusted Contributor</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-2 space-y-6">
            {/* Upload Travel Photos */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <Camera className="w-6 h-6 text-[#0B5345]" />
                <h3 className="text-xl font-semibold text-gray-800">Upload Travel Photos</h3>
              </div>
              {photoSuccess && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3 mb-4 text-green-700 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Photos submitted for review! Our team will review them within 24 hours.
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Location *</label>
                  <select
                    value={photoForm.location}
                    onChange={e => setPhotoForm(p => ({ ...p, location: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
                  >
                    <option value="">Select a destination...</option>
                    <option>Sreemangal</option>
                    <option>Ratargul Swamp Forest</option>
                    <option>Jaflong</option>
                    <option>Bholaganj Sada Pathor</option>
                    <option>Shamshernagar</option>
                    <option>Lawachara National Park</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Photo Upload</label>
                  <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#0B5345] transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    {photoFiles.length > 0 ? (
                      <div>
                        <p className="text-[#0B5345] font-medium mb-1">{photoFiles.length} file(s) selected</p>
                        <ul className="text-xs text-gray-500">
                          {photoFiles.slice(0, 3).map((f, i) => <li key={i}>{f}</li>)}
                          {photoFiles.length > 3 && <li>...and {photoFiles.length - 3} more</li>}
                        </ul>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-600 mb-2">Drag and drop photos here or click to browse</p>
                        <p className="text-xs text-gray-500">Maximum 5 photos, up to 10MB each</p>
                      </>
                    )}
                    <button
                      type="button"
                      className="mt-4 bg-[#0B5345] text-white px-6 py-2 rounded-lg hover:bg-[#0a4538] transition-colors"
                      onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}
                    >
                      Choose Files
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Caption / Description *</label>
                  <textarea
                    rows={3}
                    value={photoForm.caption}
                    onChange={e => setPhotoForm(p => ({ ...p, caption: e.target.value }))}
                    placeholder="Describe what makes this moment special..."
                    className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Tags (optional)</label>
                  <input
                    type="text"
                    value={photoForm.tags}
                    onChange={e => setPhotoForm(p => ({ ...p, tags: e.target.value }))}
                    placeholder="e.g., tea garden, sunrise, wildlife..."
                    className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
                  />
                </div>
                <button
                  onClick={handlePhotoSubmit}
                  disabled={!photoForm.location || !photoForm.caption}
                  className="w-full bg-[#2ECC71] text-white py-3 rounded-lg hover:bg-[#27AE60] transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Upload className="w-5 h-5" />
                  Submit Photos for Review
                </button>
              </div>
            </div>

            {/* Post Community Update */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <Send className="w-6 h-6 text-[#0B5345]" />
                <h3 className="text-xl font-semibold text-gray-800">Post Community Update</h3>
              </div>
              {updateSuccess && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3 mb-4 text-green-700 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Update submitted! It will go live after moderation review.
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Update Type *</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Travel Tip", "Current Conditions", "Review"].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setUpdateForm(p => ({ ...p, type }))}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          updateForm.type === type
                            ? "bg-[#0B5345] text-white"
                            : "bg-[#F8F9F9] hover:bg-[#0B5345] hover:text-white"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Location *</label>
                  <input
                    type="text"
                    value={updateForm.location}
                    onChange={e => setUpdateForm(p => ({ ...p, location: e.target.value }))}
                    placeholder="Which destination is this about?"
                    className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Your Update *</label>
                  <textarea
                    rows={4}
                    value={updateForm.content}
                    onChange={e => setUpdateForm(p => ({ ...p, content: e.target.value }))}
                    placeholder="Share helpful information with fellow travelers..."
                    className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
                  />
                </div>
                <button
                  onClick={handleUpdateSubmit}
                  disabled={!updateForm.type || !updateForm.location || !updateForm.content}
                  className="w-full bg-[#2ECC71] text-white py-3 rounded-lg hover:bg-[#27AE60] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Post Update
                </button>
              </div>
            </div>

            {/* Report Hazards */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-semibold text-gray-800">Report Travel Hazard</h3>
              </div>
              {hazardSuccess && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3 mb-4 text-green-700 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Hazard report submitted! Admins will review this within 2 hours.
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Hazard Type *</label>
                  <select
                    value={hazardForm.hazardType}
                    onChange={e => setHazardForm(p => ({ ...p, hazardType: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select hazard type...</option>
                    <option>Flash Flood Warning</option>
                    <option>Road Closure</option>
                    <option>Unsafe Conditions</option>
                    <option>Extreme Weather</option>
                    <option>Other Safety Concern</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Affected Location *</label>
                  <input
                    type="text"
                    value={hazardForm.location}
                    onChange={e => setHazardForm(p => ({ ...p, location: e.target.value }))}
                    placeholder="Which area is affected?"
                    className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Hazard Details *</label>
                  <textarea
                    rows={3}
                    value={hazardForm.details}
                    onChange={e => setHazardForm(p => ({ ...p, details: e.target.value }))}
                    placeholder="Provide specific details to help keep travelers safe..."
                    className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Severity *</label>
                  <div className="flex gap-3">
                    {["Low", "Medium", "High", "Critical"].map((level) => (
                      <label key={level} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="severity"
                          value={level}
                          checked={hazardForm.severity === level}
                          onChange={e => setHazardForm(p => ({ ...p, severity: e.target.value }))}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleHazardSubmit}
                  disabled={!hazardForm.hazardType || !hazardForm.location || !hazardForm.details || !hazardForm.severity}
                  className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Submit Urgent Report
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contribution Stats */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Photos Uploaded</span>
                  <span className="font-semibold text-[#0B5345]">{stats.photos}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Community Posts</span>
                  <span className="font-semibold text-[#0B5345]">{stats.posts}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Hazards Reported</span>
                  <span className="font-semibold text-[#0B5345]">{stats.hazards}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Views</span>
                  <span className="font-semibold text-[#0B5345]">{stats.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Helpful Votes</span>
                  <span className="font-semibold text-[#0B5345]">{stats.votes}</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-[#2ECC71]" />
                  <span className="font-semibold text-gray-800">Level Progress</span>
                </div>
                <div className="bg-gray-200 rounded-full h-3 mb-2">
                  <div className="bg-[#2ECC71] h-3 rounded-full transition-all" style={{ width: "65%" }}></div>
                </div>
                <p className="text-xs text-gray-600">35 points to Level 4 - Expert Contributor</p>
              </div>
            </div>

            {/* Rewards & Badges */}
            <div className="bg-gradient-to-br from-[#2ECC71] to-[#0B5345] text-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Badges Earned</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "First Post", icon: "🎯" },
                  { name: "Photo Pro", icon: "📸" },
                  { name: "Safety Hero", icon: "🦺" },
                  { name: "100 Views", icon: "👁️" },
                ].map((badge) => (
                  <div key={badge.name} className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="text-xs">{badge.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Submissions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Submissions</h3>
              <div className="space-y-3">
                {submissions.slice(0, 5).map((item, idx) => (
                  <div key={idx} className="p-3 bg-[#F8F9F9] rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-800">{item.type}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.color === "green" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Contribution Guidelines</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Upload high-quality, recent photos</li>
                <li>• Be accurate with location information</li>
                <li>• Report hazards immediately</li>
                <li>• Respect local culture and privacy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
