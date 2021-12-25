import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    const set_focus = document.getElementById("focus_me");
    setTimeout(() => {
      set_focus.focus();
    }, 1);
  };

  const Menu = css => {
    return (
      <ul className={String(css.classes)} role="dialog" id="menu">
        <a id="focus_me" href="/about" onClick={isMenuOpen ? toggleMenu : null}>
          <li className="px-5 py-2 hover:border-b-4 focus:ring-1 focus:ring-sb-dark hover:border-sb-dark hover:border-solid sm:hover:border-sb-light">
            About
          </li>
        </a>
        <a href="/blog" onClick={isMenuOpen ? toggleMenu : null}>
          <li className="px-5 py-2 hover:border-b-4 hover:border-sb-dark hover:border-solid sm:hover:border-sb-light">
            Blog
          </li>
        </a>
        <a href="/projects" onClick={isMenuOpen ? toggleMenu : null}>
          <li className="px-5 py-2 hover:border-b-4 hover:border-sb-dark hover:border-solid sm:hover:border-sb-light">
            Projects
          </li>
        </a>
        <a href="/contact" onClick={isMenuOpen ? toggleMenu : null}>
          <li className="px-5 py-2 hover:border-b-4 hover:border-sb-dark hover:border-solid sm:hover:border-sb-light">
            Contact
          </li>
        </a>
        <li className="cursor-pointer sm:hidden px-5 py-2 hover:border-b-4 hover:border-sb-dark hover:border-solid sm:hover:border-sb-light">
          <button onClick={isMenuOpen ? toggleMenu : null}>Close</button>
        </li>
      </ul>
    );
  };

  return (
    <nav>
      <div
        className="absolute w-full flow-root justify-between mt-3 uppercase font-header tracking-widest border-sb-med border-solid border-b-2 border-opacity-50 pb-4 "
        id="nav-bar">
        <div className="m-auto ml-7 float-left inline-flex">
          <Link href="/">Home</Link>
        </div>
        <div className="sm:hidden float-right px-5">
          <button
            onClick={toggleMenu}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
            aria-controls="menu">
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
        </div>
        {isMenuOpen ? (
          <Menu
            aria-hidden={!isMenuOpen}
            aria-labelledby="menu-btn"
            classes="absolute w-40 bg-sb-light text-sb-dark border-solid border-black border-2 flex flex-col top-5 right-6 items-center py-3 z-10"
          />
        ) : (
          <Menu classes="absolute -top-2 right-0 m-auto mr-5 float-right hidden sm:inline-flex " />
        )}
      </div>
    </nav>
  );
}
