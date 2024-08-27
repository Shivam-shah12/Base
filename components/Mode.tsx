"use client";

import * as React from "react";
import { Moon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent rendering until mounted on the client
  }

  return (
    <div className="fixed bottom-10 left-24 hidden md:block">
      <div
        className={`w-[76px] h-[40px] bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-between p-[2px]`}
      >
        <div
          className={`p-2 w-[34px] h-[34px] flex items-center justify-center rounded-full transition-colors duration-300 ${
            theme === "fairlight" ? "bg-white text-black" : "bg-gray-300 dark:bg-gray-700 text-gray-400"
          }`}
          onClick={() => {
            setTheme("fairlight");
          }}
        >
          <SunIcon className="w-5 h-5" />
        </div>
        <div
          className={`p-2 w-[34px] h-[34px] flex items-center justify-center rounded-full transition-colors duration-300 ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-300 dark:bg-gray-700 text-gray-400"
          }`}
          onClick={() => {
            setTheme("dark");
          }}
        >
          <Moon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
