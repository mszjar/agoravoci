"use client";

import Box from "./Box";
import Library from "./Library";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@/hooks/useUser";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const player = usePlayer();
  const { user } = useUser()

  return (
    <div
      className={twMerge(
        `
      flex
      h-[calc(100%-70px)]
    `,
        player.activeId && "h-[calc(100%-70px)]" && "py-1"
      )}
    >
      {/* Main Content */}
      <main className="h-full flex-1 p-2">{children}</main>
      {/* Right Sidebar */}
      { user ? (
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
          <Box className="h-full rounded-xl ">
            <Library songs={songs} />
          </Box>
        </div>
      ) : (
        null
      )}
    </div>
  );
};

export default Sidebar;
