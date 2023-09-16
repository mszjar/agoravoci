"use client";

import Image from "next/image";

interface NewItemProps {
  onClick: () => void;
}

const NewItem: React.FC<NewItemProps> = ({
  onClick
}) => {

  return (
    <div
      onClick={onClick}
      className="
        flex
        items-center
        gap-x-3
        cursor-pointer
        hover:bg-gray-100
        w-full
        p-2
        rounded-md
      "
    >
      <div className="
        relative
        rounded-md
        min-h-[48px]
        min-w-[48px]
        overflow-hidden
      ">
        <Image
          fill
          src={'/images/liked.png'}
          alt="New Item"
          className="object-cover"
        />
      </div>
      <div className="
        flex
        flex-col
        gap-y-1
        overflow-hidden
      ">
        <p className="text-black truncate">
          New Title
        </p>
        <p className="text-neutral-400 text-sm truncate">
          New author
        </p>
      </div>
    </div>
   );
}

export default NewItem;
