import { Leaf, LogIn, UserCheck, Shield, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

export function GuideLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const DEMO_EMAIL = "guide@demo.com";
  const DEMO_PASSWORD = "demo123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (
        credentials.email.trim() === DEMO_EMAIL &&
        credentials.password === DEMO_PASSWORD
      ) {
        navigate("/guide/dashboard");
      } else {
        setError("Invalid credentials. Use the demo credentials below.");
        setLoading(false);
      }
    }, 800);
  };

  const fillDemo = () => {
    setCredentials({ email: DEMO_EMAIL, password: DEMO_PASSWORD });
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
            <div className="w-12 h-12 bg-[#2ECC71] rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Guide Login</h2>
              <p className="text-sm text-gray-600">Local Service Provider Portal</p>
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
                Email or Phone Number
              </label>
              <input
                type="text"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                placeholder="guide@sylhetgo.bd or +880-XXXX-XXXXXX"
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
              {loading ? "Signing in..." : "Access Guide Portal"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={fillDemo}
              className="w-full bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-left hover:bg-blue-100 transition-colors"
            >
              <p className="text-xs text-blue-800 font-semibold mb-1">Demo Credentials (click to fill):</p>
              <p className="text-xs text-blue-700">Email: guide@demo.com | Password: demo123</p>
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Shield className="w-4 h-4 text-[#0B5345]" />
              <span>Secure login for verified guides only</span>
            </div>
            <p className="text-sm text-gray-600 text-center">
              Not a guide yet?{" "}
              <Link to="/contributor" className="text-[#0B5345] hover:underline font-semibold">
                Apply for Verification
              </Link>
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
