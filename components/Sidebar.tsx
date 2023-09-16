"use client";

import Box from "./Box";
import Library from "./Library";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const player = usePlayer();

  return (
    <div
      className={twMerge(
        `
      flex
      h-full
    `,
        player.activeId && "h-[calc(100%-80px)]" && "py-1"
      )}
    >
      {/* Main Content */}
      <main className="h-full flex-1 overflow-y-auto p-2">{children}</main>
      {/* Right Sidebar */}
      <div
        className="
          hidden
          xl:flex
          flex-col
          gap-y-2
          h-full
          w-[300px]
          py-2
          pr-2
        "
      >
        <Box className="overflow-y-auto h-full rounded-xl">
          <Library songs={songs} />
        </Box>
      </div>
    </div>
  );
};

export default Sidebar;
