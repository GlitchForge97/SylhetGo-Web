import { Leaf, LogIn, Camera, Award, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

export function ContributorLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const DEMO_USER = "contributor@demo";
  const DEMO_PASS = "demo123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (
        credentials.username.trim() === DEMO_USER &&
        credentials.password === DEMO_PASS
      ) {
        navigate("/contributor/dashboard");
      } else {
        setError("Invalid credentials. Use the demo credentials below.");
        setLoading(false);
      }
    }, 800);
  };

  const fillDemo = () => {
    setCredentials({ username: DEMO_USER, password: DEMO_PASS });
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B5345] to-[#1a7a63] flex items-center justify-center p-8">
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

        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Contributor Login</h2>
              <p className="text-sm text-gray-600">Community Member Portal</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username or Email
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                placeholder="TravelExplorer_BD or email@example.com"
                className="w-full px-4 py-3 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 bg-[#F8F9F9] rounded-lg outline-none focus:ring-2 focus:ring-[#0B5345]"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 text-[#0B5345] rounded" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-[#0B5345] hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2ECC71] text-white py-3 rounded-lg hover:bg-[#27AE60] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <LogIn className="w-5 h-5" />
              )}
              {loading ? "Signing in..." : "Access Contributor Portal"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={fillDemo}
              className="w-full bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4 text-left hover:bg-purple-100 transition-colors"
            >
              <p className="text-xs text-purple-800 font-semibold mb-1">Demo Credentials (click to fill):</p>
              <p className="text-xs text-purple-700">Username: contributor@demo | Password: demo123</p>
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Award className="w-4 h-4 text-purple-600" />
              <span>Join our community of trusted travel contributors</span>
            </div>
            <p className="text-sm text-gray-600 text-center">
              New contributor?{" "}
              <button className="text-[#0B5345] hover:underline font-semibold">
                Register & Start Contributing
              </button>
            </p>
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
