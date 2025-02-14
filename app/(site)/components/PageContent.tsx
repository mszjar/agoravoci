"use client";

import { Song } from "@/types";
import { User } from "@/types";
import SongItem from "@/components/SongItem";
import UserItem from "@/components/UserItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import Button from "@/components/Button";
import useAuthModal from "@/hooks/useAuthModal";
import Footer from "@/components/Footer";
import LandingContent from "./LandingContent";
import Image from "next/image";

interface PageContentProps {
  songs: Song[];
  users: User[];
}

const PageContent: React.FC<PageContentProps> = ({ songs, users }) => {
  const onPlay = useOnPlay(songs);
  const { user } = useUser();
  const authModal = useAuthModal();

  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400">No posts available.</div>;
  }
  return (
    <>
      {user ? (
        <div>
          <div className="inline-flex items-center gap-x-2 px-5 pt-4">
            <p className="text-neutral-400 font-medium text-md">
              Recent posts
            </p>
          </div>
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
          mb-8
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
          <div className="inline-flex items-center gap-x-2 px-5 pt-4">
            <p className="text-neutral-400 font-medium text-md">
              Connected accounts
            </p>
          </div>
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
        mb-8
      "
          >
            {users.map((user) => (
              <UserItem key={user.id} data={user} />
            ))}
          </div>
        </div>
      ) : (
        <div className="gap-x-4 items-center">
          <div className="text-center w-full">
            <div className="sm:flex sm:m-20 m-4">
              <h1 className="sm:text-7xl text-5xl font-bold">
                Connect. <br className="sm:hidden" />
              </h1>
              <h1 className="sm:text-7xl text-5xl font-bold">
                Manage. <br className="sm:hidden" />
              </h1>
              <h1 className="sm:text-7xl text-5xl font-bold">
                Earn. <br className="sm:hidden" />
              </h1>
            </div>
            <p className="text-gray-800">Connect your online profiles & manage them with AI agents.</p>

            <Button onClick={authModal.onOpen} className="mt-12 lg:w-[300px]">
              Get started
            </Button>

          </div>
          <div className="mt-24 flex justify-center">
              <Image
                width={1300}
                height={1300}
                alt="image"
                src={"/images/dashboard_preview.png"}
                className="mt-8 rounded-xl shadow-xl"
                unoptimized={true}
              />
            </div>

          {/* Landing page content */}
          <LandingContent />

          <div className="text-center w-full">
            <h1 className="mt-4 sm:text-3xl mb-5 text-2xl font-medium text-gray-900">
              Explore the new world of creators
            </h1>
          </div>
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
            sm:px-32
          "
          >
            {users.map((user) => (
              <UserItem key={user.id} data={user} />
            ))}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default PageContent;
