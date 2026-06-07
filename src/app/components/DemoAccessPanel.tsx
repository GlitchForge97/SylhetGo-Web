import { useState } from "react";
import { Link } from "react-router";
import { Terminal, UserCheck, Camera, Shield, X } from "lucide-react";

export function DemoAccessPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Demo Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-[#0B5345] to-[#2ECC71] text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all z-50 flex items-center gap-2"
      >
        <Terminal className="w-5 h-5" />
        <span className="text-sm font-semibold">Demo Access</span>
      </button>

      {/* Expanded Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 w-80 z-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Quick Access Panel</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <div className="space-y-3">
            <Link
              to="/guide"
              className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-10 h-10 bg-[#2ECC71] rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Guide Portal</p>
                <p className="text-xs text-gray-600">guide@demo.com</p>
              </div>
            </Link>

            <Link
              to="/contributor"
              className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Contributor Portal</p>
                <p className="text-xs text-gray-600">contributor@demo</p>
              </div>
            </Link>

            <Link
              to="/admin/login"
              className="flex items-center gap-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors border-l-4 border-red-500"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Admin Dashboard</p>
                <p className="text-xs text-gray-600">admin@demo.com</p>
              </div>
            </Link>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Interactive prototype for demonstration
            </p>
          </div>
        </div>
      )}
    </>
  );
}
