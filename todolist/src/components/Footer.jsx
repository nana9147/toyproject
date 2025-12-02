export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 px-6 py-6 text-sm text-gray-600">
      <div className="max-w-6xl mx-auto flex justify-between items-start">
        {/* Company Info */}
        <div className="leading-6">
          <p className="font-semibold">Frontend - ToyProject</p>
        </div>

        <div className="mt-2">
          <p className="text-center font-light text-gray-500">
            © {new Date().getFullYear()} To-do List. All rights reserved.
          </p>
        </div>

        {/* Developer Info */}
        <div className="mt-4">
          <p className="font-semibold">Developer - Yuna</p>
        </div>
      </div>
    </footer>
  );
}
