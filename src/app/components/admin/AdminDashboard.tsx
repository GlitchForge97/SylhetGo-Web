import { Shield, DollarSign, MapPin, UserCheck, MessageSquare, Users, LogOut } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";

export function AdminDashboard() {
  const location = useLocation();

  const navItems = [
    { path: "/admin", icon: Users, label: "Dashboard Overview" },
    { path: "/admin/fares", icon: DollarSign, label: "Fares & Routes" },
    { path: "/admin/spots", icon: MapPin, label: "Spot Publisher" },
    { path: "/admin/guides", icon: UserCheck, label: "Guide Verification" },
    { path: "/admin/moderation", icon: MessageSquare, label: "Community Moderation" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9F9] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0B5345] text-white flex flex-col">
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-semibold">Admin Control</h1>
              <p className="text-xs text-white/70">Master Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                  isActive
                    ? 'bg-[#2ECC71] text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/20">
          <div className="mb-4">
            <p className="text-xs text-white/60 mb-1">Logged in as</p>
            <p className="font-semibold">Admin User</p>
            <p className="text-xs text-white/70">admin@sylhetgo.bd</p>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
