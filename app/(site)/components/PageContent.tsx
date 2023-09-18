"use client";

import { Song } from "@/types";
import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import Button from "@/components/Button";
import useAuthModal from "@/hooks/useAuthModal";
import Footer from "@/components/Footer";
import LandingContent from "./LandingContent";


interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({
  songs
}) => {
  const onPlay = useOnPlay(songs);
  const { user } = useUser();
  const authModal = useAuthModal();

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
          <div className="text-center w-full">
            <h1 className="mt-24 sm:text-3xl text-3xl mb-4 font-medium text-gray-900">
              Monetize your content everywhere in a secure way
            </h1>

            <Button
              onClick={authModal.onOpen}
              className="mt-24 lg:w-[500px]"
            >
              Sign up
            </Button>
          </div>

          <LandingContent/>
          
          <div className="text-center w-full">
            <h1 className="mt-36 sm:text-3xl mb-4 text-2xl font-medium text-gray-900">
              Explore the new world of creators
            </h1>
          </div>
          <div className="
            grid
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-8
            gap-4
            mb-32
          ">
            {songs.slice(0, 8).map((item) => (
              <SongItem
                key={item.id}
                onClick={(id: string) => onPlay(id)}
                data={item}
              />
            ))}
          </div>
          <Footer/>
        </div>
      )}
    </>
   );
}

export default PageContent;
