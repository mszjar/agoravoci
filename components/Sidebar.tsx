"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const pathname = usePathname();
  const player = usePlayer();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
      {
        icon: AiFillHeart,
        label: "Liked",
        active: pathname === "/liked",
        href: "/liked",
      },
    ],
    [pathname]
  );

  return (
    <div
      className={twMerge(
        `
      flex
      h-full
    `,
        player.activeId && "h-[calc(100%-80px)]"
      )}
    >
      {/* Left Sidebar */}
      <div
        className="
          hidden
          md:flex
          flex-col
          gap-y-2
          bg-black
          h-full
          w-[300px]
          p-2
        "
      >
        <Box className="overflow-y-auto h-full">
          <div
            className="
              flex
              flex-col
              gap-y-4
              px-5
              py-4
            "
          >
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
      </div>
      {/* Main Content */}
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
      {/* Right Sidebar */}
      <div
        className="
          hidden
          md:flex
          flex-col
          gap-y-2
          bg-black
          h-full
          w-[300px]
          p-2
        "
      >
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
    </div>
  );
};

export default Sidebar;
