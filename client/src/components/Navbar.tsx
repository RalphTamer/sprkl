import { Link } from "react-router-dom";

const Navbar = () => {
  const navItems: Array<{ title: string; to: string }> = [
    {
      title: "Home",
      to: "/",
    },
    {
      title: "Add User",
      to: "/user/add",
    },
  ];
  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h3 className="text-2xl font-bold tracking-wider">SPRKL</h3>
        <div className="flex items-center gap-6">
          {navItems.map((navItem) => {
            return (
              <Link
                key={navItem.title}
                to={navItem.to}
                className="relative group text-lg font-medium"
              >
                {navItem.title}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
