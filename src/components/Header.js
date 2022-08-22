import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { HiMenuAlt2 } from "react-icons/hi";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="shadow md:shadow-none">
      <nav className="flex items-center justify-between p-3 md:p-6 ">
        <div className="flex items-center gap-8">
          <div className="inline-block sm:hidden">
            <HiMenuAlt2 size={28} />
          </div>
          <div className="font-bold text-xl">
            <Link to="/">Issues</Link>
          </div>
        </div>
        <div>
          <ul>
            <li>
              <ThemeSwitcher />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
