import { DollarSign, Edit2, Save, Plus, Trash2, MapPin, X, CheckCircle } from "lucide-react";
import { useState } from "react";

type Route = {
  id: number;
  from: string;
  to: string;
  distance: string;
  cngFare: string;
  boatFare: string;
  duration: string;
  active: boolean;
};

const defaultRoutes: Route[] = [
  { id: 1, from: "Sylhet", to: "Ratargul", distance: "26 km", cngFare: "350-400", boatFare: "500/boat", duration: "45 min", active: true },
  { id: 2, from: "Sylhet", to: "Jaflong", distance: "62 km", cngFare: "800-900", boatFare: "N/A", duration: "1.5 hr", active: true },
  { id: 3, from: "Sylhet", to: "Sreemangal", distance: "85 km", cngFare: "1100-1200", boatFare: "N/A", duration: "2 hr", active: true },
  { id: 4, from: "Sylhet", to: "Bholaganj", distance: "38 km", cngFare: "500-600", boatFare: "N/A", duration: "1 hr", active: true },
  { id: 5, from: "Sylhet", to: "Shamshernagar", distance: "92 km", cngFare: "1200-1300", boatFare: "N/A", duration: "2.2 hr", active: true },
];

export function FareManager() {
  const [routes, setRoutes] = useState<Route[]>(defaultRoutes);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Partial<Route>>({});
  const [toast, setToast] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRoute, setNewRoute] = useState({ from: "Sylhet", to: "", distance: "", cngFare: "", boatFare: "N/A", duration: "" });
  const [saved, setSaved] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const startEdit = (route: Route) => {
    setEditingId(route.id);
    setEditValues({ ...route });
  };

  const saveEdit = (id: number) => {
    setRoutes(prev => prev.map(r => r.id === id ? { ...r, ...editValues } as Route : r));
    setEditingId(null);
    setEditValues({});
    showToast("✓ Route updated successfully.");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

  const deleteRoute = (id: number) => {
    const route = routes.find(r => r.id === id);
    setRoutes(prev => prev.filter(r => r.id !== id));
    if (route) showToast(`✗ Route "${route.from} → ${route.to}" deleted.`);
  };

  const toggleActive = (id: number) => {
    setRoutes(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const addRoute = () => {
    if (!newRoute.to || !newRoute.distance || !newRoute.cngFare || !newRoute.duration) return;
    const id = Math.max(...routes.map(r => r.id)) + 1;
    setRoutes(prev => [...prev, { ...newRoute, id, active: true } as Route]);
    setNewRoute({ from: "Sylhet", to: "", distance: "", cngFare: "", boatFare: "N/A", duration: "" });
    setShowAddForm(false);
    showToast(`✓ New route "${newRoute.from} → ${newRoute.to}" added.`);
  };

  const saveAll = () => {
    setSaved(true);
    showToast("✓ All fare changes saved successfully.");
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8 relative">
      {toast && (
        <div className="fixed top-6 right-6 bg-[#0B5345] text-white px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3">
          <span className="text-sm">{toast}</span>
          <button onClick={() => setToast("")}><X className="w-4 h-4" /></button>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">Fare & Route Management</h2>
        <p className="text-gray-600">Manage transport fares and routes to ensure transparent pricing for tourists</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <DollarSign className="w-8 h-8 text-[#0B5345] mb-2" />
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{routes.filter(r => r.active).length}</h3>
          <p className="text-sm text-gray-600">Active Routes</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <MapPin className="w-8 h-8 text-blue-600 mb-2" />
          <h3 className="text-2xl font-bold text-gray-800 mb-1">23</h3>
          <p className="text-sm text-gray-600">CNG Operators</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <span className="text-3xl mb-2 block">🚤</span>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">15</h3>
          <p className="text-sm text-gray-600">Boat Services</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 bg-gradient-to-br from-[#0B5345] to-[#2ECC71] text-white">
          <p className="text-sm mb-2">Last Updated</p>
          <h3 className="text-lg font-bold">Today</h3>
        </div>
      </div>

      {/* Add New Route */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#2ECC71] text-white px-6 py-3 rounded-lg hover:bg-[#27AE60] transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {showAddForm ? "Cancel" : "Add New Route"}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-[#2ECC71]">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">New Route Details</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">From</label>
              <input
                type="text"
                value={newRoute.from}
                onChange={e => setNewRoute(p => ({ ...p, from: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0B5345]"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">To *</label>
              <input
                type="text"
                value={newRoute.to}
                onChange={e => setNewRoute(p => ({ ...p, to: e.target.value }))}
                placeholder="e.g., Jaflong"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0B5345]"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Distance *</label>
              <input
                type="text"
                value={newRoute.distance}
                onChange={e => setNewRoute(p => ({ ...p, distance: e.target.value }))}
                placeholder="e.g., 62 km"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0B5345]"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">CNG Fare (৳) *</label>
              <input
                type="text"
                value={newRoute.cngFare}
                onChange={e => setNewRoute(p => ({ ...p, cngFare: e.target.value }))}
                placeholder="e.g., 800-900"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0B5345]"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Boat Fare (৳)</label>
              <input
                type="text"
                value={newRoute.boatFare}
                onChange={e => setNewRoute(p => ({ ...p, boatFare: e.target.value }))}
                placeholder="N/A or 500/boat"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0B5345]"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Duration *</label>
              <input
                type="text"
                value={newRoute.duration}
                onChange={e => setNewRoute(p => ({ ...p, duration: e.target.value }))}
                placeholder="e.g., 1.5 hr"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#0B5345]"
              />
            </div>
          </div>
          <button
            onClick={addRoute}
            disabled={!newRoute.to || !newRoute.distance || !newRoute.cngFare || !newRoute.duration}
            className="bg-[#0B5345] text-white px-6 py-2 rounded-lg hover:bg-[#0a4538] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Route
          </button>
        </div>
      )}

      {/* Routes Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 bg-[#0B5345] text-white">
          <h3 className="text-xl font-semibold">Active Transport Routes</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8F9F9]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Route</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Distance</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">CNG Fare (৳)</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Boat Fare (৳)</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {routes.map((route) => (
                <tr key={route.id} className={`hover:bg-gray-50 ${!route.active ? "opacity-50" : ""}`}>
                  <td className="px-6 py-4">
                    {editingId === route.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editValues.from || ""}
                          onChange={e => setEditValues(v => ({ ...v, from: e.target.value }))}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <span>→</span>
                        <input
                          type="text"
                          value={editValues.to || ""}
                          onChange={e => setEditValues(v => ({ ...v, to: e.target.value }))}
                          className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    ) : (
                      <span className="font-medium text-gray-800">{route.from} → {route.to}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === route.id ? (
                      <input
                        type="text"
                        value={editValues.distance || ""}
                        onChange={e => setEditValues(v => ({ ...v, distance: e.target.value }))}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    ) : (
                      <span className="text-gray-600">{route.distance}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === route.id ? (
                      <input
                        type="text"
                        value={editValues.cngFare || ""}
                        onChange={e => setEditValues(v => ({ ...v, cngFare: e.target.value }))}
                        className="w-28 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    ) : (
                      <span className="font-semibold text-[#0B5345]">৳{route.cngFare}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === route.id ? (
                      <input
                        type="text"
                        value={editValues.boatFare || ""}
                        onChange={e => setEditValues(v => ({ ...v, boatFare: e.target.value }))}
                        className="w-28 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    ) : (
                      <span className={`font-semibold ${route.boatFare === "N/A" ? "text-gray-400" : "text-[#0B5345]"}`}>
                        {route.boatFare === "N/A" ? "N/A" : `৳${route.boatFare}`}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === route.id ? (
                      <input
                        type="text"
                        value={editValues.duration || ""}
                        onChange={e => setEditValues(v => ({ ...v, duration: e.target.value }))}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    ) : (
                      <span className="text-gray-600">{route.duration}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleActive(route.id)}
                      className={`px-3 py-1 rounded-full text-xs cursor-pointer transition-colors ${
                        route.active ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {route.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {editingId === route.id ? (
                        <>
                          <button
                            onClick={() => saveEdit(route.id)}
                            className="p-2 bg-[#2ECC71] text-white rounded-lg hover:bg-[#27AE60] transition-colors"
                            title="Save"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => startEdit(route)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteRoute(route.id)}
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

        <div className="p-6 bg-[#F8F9F9] border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {routes.length} routes ({routes.filter(r => r.active).length} active)
            </p>
            <button
              onClick={saveAll}
              className="bg-[#0B5345] text-white px-6 py-2 rounded-lg hover:bg-[#0a4538] transition-colors flex items-center gap-2"
            >
              {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : "Save All Changes"}
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Guidelines */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Fare Update Guidelines</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• Fares should be updated quarterly or when significant market changes occur</li>
          <li>• CNG fares typically range ৳12-15 per kilometer</li>
          <li>• Boat fares are per boat (capacity 4-6 passengers) for Ratargul and similar destinations</li>
          <li>• Always verify fares with at least 3 operators before updating</li>
          <li>• Document the source and date of fare verification in the system notes</li>
        </ul>
      </div>
    </div>
  );
}
