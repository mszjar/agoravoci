"use client";

import { Song } from "@/types";
import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";


interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({
  songs
}) => {
  const onPlay = useOnPlay(songs);
  const { user } = useUser();

  if (songs.length === 0) {
    return (
      <div className="mt-4 text-neutral-400">
        No posts available.
      </div>
    )
  }
  return (
    <>
    	{ user ? (
        <div className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-8
          gap-4
          mt-4
          mb-32
        ">
          {songs.map((item) => (
            <SongItem
              key={item.id}
              onClick={(id: string) => onPlay(id)}
              data={item}
            />
          ))}
        </div>
      ) : (
        <div className="gap-x-4 items-center">
          <p>Not connected</p>
          <div className="
            grid
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-8
            gap-4
            mt-4
            mb-32
          ">
            {songs.slice(0, 2).map((item) => (
              <SongItem
                key={item.id}
                onClick={(id: string) => onPlay(id)}
                data={item}
              />
            ))}
          </div>
        </div>
      )}
    </>
   );
}

export default PageContent;
