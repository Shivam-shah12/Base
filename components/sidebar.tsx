import Link from "next/link";
import Image from "next/image";
import { useState,useEffect } from "react";
import { ModeToggle } from "./Mode";
import { SidebarClose, Menu, X } from "lucide-react"; // Importing icons
import {
  LayoutDashboardIcon,
  ChartNoAxesColumn,
  Bell,
  SettingsIcon,
  CalendarDaysIcon,
  NotepadText,
  ReceiptIcon,
} from "lucide-react";
import useStore from "../lib/store";
import { UserButton } from "@clerk/nextjs";
import { showToast } from "./toastHelper";
import Router from "next/router";
const navLinks = [
  { name: "Dashboard", icon: LayoutDashboardIcon, link: "/feature/dashboard" },
  { name: "Upload", icon: ChartNoAxesColumn, link: "/feature/upload" },
  { name: "Invoice", icon: ReceiptIcon, link: "/feature/invoice" },
  { name: "Schedule", icon: NotepadText, link: "/feature/schedule" },
  { name: "Calendar", icon: CalendarDaysIcon, link: "/feature/calendar" },
  { name: "Notification", icon: Bell, link: "/feature/notify" },
  { name: "Settings", icon: SettingsIcon, link: "/feature/settings" },
];

const defaultLink = "dashboard"

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { close, setClose } = useStore();
  const [activeLink, setActiveLink] = useState<string>("");


  useEffect(() => {
    // Load the active link from local storage or set to default
    const savedLink = localStorage.getItem("activeLink");
    setActiveLink(savedLink || defaultLink);
    localStorage.setItem("activeLink",defaultLink)
    console.log(activeLink)
    
  }, [activeLink]);

  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
    localStorage.setItem("activeLink", linkName);
  };

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleBell = () => {
    showToast("info", " notification off")
  }

  return (
    <div
      className={`relative md:py-4 px-4 h-[100vh] flex flex-col shadow md:shadow-none   transition-all w-[100vw]  duration-300 ease-in-out ${isCollapsed ? "md:w-16" : "md:w-72"
        } ${close === false ? "h-[100vh]" : "h-full"}`}
    >

      <div className="py-4 px-2 flex flex-row justify-between items-center">
        {/* Base Icon and Title (for desktop) */}
        {!isCollapsed && (
          <div className=" w-full hidden md:flex justify-between space-x-3">
            <div className=" flex space-x-3">
              <Image
                src="/baseIcon.png"
                alt="Base Icon"
                color="black"
                width={30}
                height={30}
              />
              <h1 className="text-left font-semibold text-[24px] leading-[32.26px]">
                Base
              </h1>
            </div>
            <div className="hidden md:flex items-center">
              <SidebarClose
                className="w-5 h-5 cursor-pointer"
                onClick={handleToggle}
              />
            </div>
          </div>

        )}

        {/* Desktop SidebarClose Icon */}
        {(isCollapsed) && (
          <div className="hidden md:flex items-center">
            <SidebarClose
              className="w-5 h-5 cursor-pointer"
              onClick={handleToggle}
            />
          </div>
        )}

        {/* Icon logic for mobile and desktop */}
        <div className="md:hidden w-full flex items-center ">
          {/* Mobile view (hamburger or close icon) */}
          <div className=" w-[100vw] md:hidden flex items-center space-x-4 px-6">
            {close ? (
              <div className="w-full flex justify-between">
                <div className="flex space-x-2 items-center ">

                  <Menu
                    className="w-6 h-6 cursor-pointer  left-4 top-4"
                    onClick={() => setClose(!close)}
                  />
                  <Image
                    src="/baseIcon.png"
                    alt="Base Icon"
                    color="black"
                    width={25}
                    height={25}
                  />
                  <h1 className="text-left font-semibold text-xl leading-[32.26px]">
                    Base
                  </h1>
                </div>


                <div className="relative flex items-center space-x-6 cursor-pointer">
                  <Bell onClick={handleBell} />
                  <UserButton />
                </div>
              </div>
            ) : (
              <X className="w-6 h-6 cursor-pointer shadow absolute right-4 top-4" onClick={() => setClose(!close)} />
            )}
          </div>
        </div>
      </div>




      {/* Navigation Links */}
      <div
        className={`py-8 lg:py-4  flex flex-col gap-6   w-full ${isCollapsed ? "items-center" : ""
          } ${close === true ? "hidden md:flex" : ""}`}
      >
        {navLinks.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            onClick={() => handleLinkClick(item.name)}
            className={`w-full no-underline rounded-md  ${isCollapsed
              ? "flex justify-center"
              : "hover:bg-gradient-to-r hover:from-[#ccc9c9] hover:to-transparent"
              }`}
          >
            <div
              className={`flex items-center p-2 w-full transition-colors duration-300 ease-in-out ${isCollapsed ? "justify-center" : ""
                } ${activeLink === item.name
                  ? "text-[#836FFF]"
                  : "text-gray-500"
                } hover:text-[#836FFF]`}
            >
              <div className={`w-5 h-5 ${isCollapsed ? "mr-0" : "mr-4"}`}>
                <item.icon
                  width={20}
                  height={20}
                  className={`${activeLink === item.name
                    ? "text-[#836FFF]"
                    : "text-gray-700"
                    } hover:text-[#836FFF]`}
                />
              </div>
              {!isCollapsed && (
                <div className="md:flex">
                  <span
                    className={`font-bold text-[16px] leading-[21px] ${activeLink === item.name ? "text-[#836FFF]" : ""
                      } hover:text-[#836FFF]`}
                  >
                    {item.name}
                  </span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
      {/* ModeToggle */}
      <div className={`${isCollapsed ? "hidden" : ""}`}>
        <ModeToggle />
      </div>


    </div>



  );
};

export default Sidebar;
