import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../home-assets/logo.png";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

// underline colors
const underlinecolor = (index: number) => {
    const colors = ["#4285F4", "#34A853", "#F9AB00", "#EA4335"];
    return colors[index % colors.length];
};

// pastel highlight for active item
const pastel = (index: number) => {
    const colors = ["#C3ECF6", "#CCF6C5", "#FFE7A5", "#F8D8D8"];
    return colors[index % colors.length];
};

const menuItems = [
    { name: "Home", path: "/" },
    { name: "OrgChart", path: "/orgchart" },
    { name: "Blogs", path: "/blogs" },
    { name: "Events", path: "/events" },
    { name: "Practice", path: "/practice" },
    { name: "Join Us", path: "/https://gdg.community.dev/gdg-on-campus-vallurupalli-nageswara-rao-vignana-jyothi-institute-of-engineering-and-technology-hyderabad-india/" }
];

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleNavClick = () => {
        if (isOpen) setIsOpen(false);
    };

    return (
        <nav className="sticky top-0 backdrop-blur-lg bg-white/70 shadow-md z-50">
            {/* Mobile Header */}
            <div className="flex items-center md:hidden p-4">
                <NavLink to="/">
                    <img
                        src={logo}
                        width="50"
                        height="50"
                        alt="Logo"
                        className="transition-transform duration-300 hover:scale-110"
                    />
                </NavLink>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="ml-auto px-3 py-2"
                >
                    <svg
                        className={`h-6 w-6 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
                        viewBox="0 0 20 20"
                    >
                        <path
                            d={
                                isOpen
                                    ? "M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
                                    : "M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
                            }
                        />
                    </svg>
                </button>
            </div>

            {/* Desktop Menu */}
            <div className={`w-full ${isOpen ? "block" : "hidden md:block"}`}>
                <div className="flex items-center px-6 py-3 w-full">
                    {/* Left Logo */}
                    <div className="flex-shrink-0">
                        <NavLink to="/">
                            <img
                                src={logo}
                                width="50"
                                height="50"
                                alt="Logo"
                                className="transition-transform duration-300 hover:scale-110"
                            />
                        </NavLink>
                    </div>

                    {/* Center Menu */}
                    <div className="flex-1 flex justify-center items-center space-x-6">
                        {menuItems.map((item, index) => (
                            <NavLink key={item.name} to={item.path} onClick={handleNavClick}>
                                {({ isActive }) => (
                                    <div
                                        className="relative px-4 py-2 rounded-t-lg font-medium transition-colors duration-300 group"
                                        style={{
                                            backgroundColor: isActive ? pastel(index) : "transparent",
                                        }}
                                    >
                                        <span className="relative z-10 text-slate-700">
                                            {item.name}
                                        </span>

                                        {/* Hover underline */}
                                        <span
                                            className="absolute left-0 bottom-0 h-[3px] w-0 rounded-full transition-all duration-300 group-hover:w-full"
                                            style={{ backgroundColor: underlinecolor(index) }}
                                        />

                                        {/* Active underline */}
                                        {isActive && (
                                            <span
                                                className="absolute left-0 bottom-0 h-[3px] w-full rounded-full"
                                                style={{ backgroundColor: underlinecolor(index) }}
                                            />
                                        )}
                                    </div>
                                )}
                            </NavLink>
                        ))}

                        {/* Explore Dropdown */}
                        <Popover className="relative">
                            <PopoverButton className="inline-flex items-center gap-x-1 px-4 py-2 font-medium rounded-lg hover:bg-slate-100">
                                <span>Explore</span>
                                <ChevronDownIcon aria-hidden="true" className="w-4 h-4" />
                            </PopoverButton>
                            <PopoverPanel className="absolute left-1/2 z-10 mt-2 bg-white rounded-md shadow-md -translate-x-1/2 px-4 py-2">
                                <div className="my-2">
                                    <NavLink onClick={handleNavClick} to="/gen-ai-leaderboard">LeaderBoard</NavLink>
                                </div>
                                <div className="my-2">
                                    <NavLink onClick={handleNavClick} to="/Forum">Forum</NavLink>
                                </div>
                                <div className="my-2">
                                    <NavLink onClick={handleNavClick} to="/contact-us">Contact Us</NavLink>
                                </div>
                            </PopoverPanel>
                        </Popover>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;