import { Outlet, NavLink } from "react-router";
import { Home, Smile, Archive, User } from "lucide-react";

export function Layout() {
  return (
    <div className="flex justify-center bg-[#f4f1ea] min-h-screen font-sans text-gray-900">
      <div className="w-full max-w-[480px] bg-white flex flex-col min-h-[100dvh] relative shadow-2xl overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden pb-[70px]">
          <Outlet />
        </div>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 left-0 w-full h-[70px] bg-white border-t border-orange-100 flex items-center justify-around px-2 z-50 shadow-[0_-4px_20px_rgba(251,146,60,0.05)] rounded-t-3xl">
          <NavItem to="/" icon={<Home size={24} />} label="시소" />
          <NavItem to="/playground" icon={<Smile size={24} />} label="놀이터" />
          <NavItem to="/archive" icon={<Archive size={24} />} label="지난시소" />
          <NavItem to="/profile" icon={<User size={24} />} label="내정보" />
        </nav>
      </div>
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center w-16 h-full gap-1 transition-all duration-300 ${
          isActive ? "text-orange-500 font-extrabold -translate-y-1" : "text-gray-400 hover:text-orange-300"
        }`
      }
    >
      {icon}
      <span className="text-[11px]">{label}</span>
    </NavLink>
  );
}
