"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { User } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface SongItemProps {
  data: User;
}

const UserItem: React.FC<SongItemProps> = ({ data }) => {
  //const imagePath = useLoadImage(data);

  return (
    <div
      className="
        relative
        group
        flex
        flex-col
        items-center
        justify-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-400/5
        cursor-pointer
        hover:bg-neutral-400/10
        transition
        p-3
      "
    >
      <div
        className="
        relative
        aspect-square
        w-full
        h-full
        rounded-md
        overflow-hidden
      "
      >
        <Link href={`/${data.id}`}>
          <Image
            src={data.avatar_url ?? "/images/liked.png"}
            alt="user"
            fill
            className="object-cover"
            >
          </Image>
        </Link>
      </div>

      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <Link href={`/${data.id}`}>
          <p className="font-semibold truncate w-full">{data.full_name}</p>
        </Link>
      </div>
    </div>
  );
};

export default UserItem;
