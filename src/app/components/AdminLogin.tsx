import { Leaf, LogIn, Shield, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

export function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "", tfa: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const DEMO = { email: "admin@demo.com", password: "admin123", tfa: "123456" };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (
        credentials.email.trim() === DEMO.email &&
        credentials.password === DEMO.password &&
        credentials.tfa.trim() === DEMO.tfa
      ) {
        navigate("/admin");
      } else {
        setError("Invalid credentials or 2FA code. Use the demo credentials below.");
        setLoading(false);
      }
    }, 1000);
  };

  const fillDemo = () => {
    setCredentials({ email: DEMO.email, password: DEMO.password, tfa: DEMO.tfa });
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B5345] via-[#1a7a63] to-[#0B5345] flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 text-white mb-4">
            <Leaf className="w-10 h-10" />
            <div className="text-left">
              <h1 className="text-2xl font-bold">SylhetGo</h1>
              <p className="text-sm text-white/80">Smart Tourism Portal</p>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8 border-t-4 border-red-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Master Admin</h2>
              <p className="text-sm text-gray-600">System Control Panel</p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-red-800">
              <Lock className="w-4 h-4" />
              <p className="text-sm font-semibold">Restricted Access - Authorized Personnel Only</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Email</label>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                placeholder="admin@sylhetgo.bd"
                className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="Enter master admin password"
                  className="w-full px-4 py-3 pr-12 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Two-Factor Authentication Code</label>
              <input
                type="text"
                value={credentials.tfa}
                onChange={(e) => setCredentials({ ...credentials, tfa: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                placeholder="Enter 6-digit code"
                className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-red-500 text-center tracking-widest text-xl"
                maxLength={6}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <LogIn className="w-5 h-5" />
              )}
              {loading ? "Authenticating..." : "Access Admin Dashboard"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={fillDemo}
              className="w-full bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-left hover:bg-red-100 transition-colors"
            >
              <p className="text-xs text-red-800 font-semibold mb-1">Demo Admin Access (click to fill):</p>
              <p className="text-xs text-red-700">Email: admin@demo.com | Password: admin123 | 2FA: 123456</p>
            </button>
            <div className="space-y-2 text-xs text-gray-600">
              <p className="flex items-center gap-2">
                <Shield className="w-3 h-3 text-red-500" />
                All admin activities are logged and monitored
              </p>
              <p className="flex items-center gap-2">
                <Lock className="w-3 h-3 text-red-500" />
                SSL encrypted connection required
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-white hover:text-[#2ECC71] transition-colors text-sm">
            ← Back to Tourist Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
