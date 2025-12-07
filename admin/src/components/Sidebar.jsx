import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();
  const links = [
    { path: "/projects", label: "Projects" },
    { path: "/technologies", label: "Technologies" },
    { path: "/freelancing", label: "Freelancing" },
    { path: "/contact", label: "Contact Messages" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen fixed p-5">
      <h2 className="text-2xl font-bold mb-8">Ashish Dashboard</h2>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`block p-2 rounded ${
                pathname === link.path ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
