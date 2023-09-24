"use client";

import Image from "next/image";
import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import useGetSongsByUser from "@/hooks/useGetSongsByUser";
import useLoadImage from "@/hooks/useLoadImage";
import getSongsByUser from "@/actions/getSongsByUser";

export const revalidate = 0;

interface UserItemProps {
  params: { user_id: string };
}

const User: React.FC<UserItemProps> = ({ params }) => {
  const posts = useGetSongsByUser(params.user_id);
  const songs = posts.song;
  const onPlay = useOnPlay(posts.song);
  // const imagePath = useLoadImage(song[0]);

  return (
    <div
      className="
      bg-gradient-to-b
      from-gray-100
      rounded-xl
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    "
    >
      <div>
        <div className="mt-20">
          <div
            className="
            flex
            flex-col
            md:flex-row
            items-center
            gap-x-5
          "
          >
            <div
              className="
              relative
              h-32
              w-32
              lg:h-44
              lg:w-44
            "
            >
              <Image
                fill
                alt="image"
                src={"/images/liked.png"}
                className="rounded-xl"
              />
            </div>
            <div
              className="
              flex
              flex-col
              gap-y-2
              mt-4
              md:mt-0
            "
            >
              <p className="hidden md:block font-semibold text-sm">
                User posts
              </p>
              <h1
                className="
                text-white
                text-4xl
                sm:text-5xl
                lg:text-7xl
                font-bold
              "
              >
                <div
                  className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-8
          gap-4
          mt-4
          mb-32
        "
                >
                  {songs.map((item) => (
                    <SongItem
                      key={item.id}
                      onClick={(id: string) => onPlay(id)}
                      data={item}
                    />
                  ))}
                </div>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
