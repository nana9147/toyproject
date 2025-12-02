import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-xl font-semibold">
        <Link to="/">LOGO</Link>
      </h1>

      {/* Auth Buttons */}
      <div className="flex gap-3">
        <Link to="/signin" className="px-4 py-2 text-sm border rounded-md">
          Login
        </Link>

        <Link
          to="/signup"
          className="px-4 py-2 text-sm border rounded-md bg-black text-white"
        >
          sign up
        </Link>
      </div>
    </header>
  );
}
