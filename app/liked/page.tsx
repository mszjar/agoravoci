import getLikedSongs from "@/actions/getLikedSongs";
import Image from "next/image"
import LikedContent from "./components/LikedContent";

export const revalidate = 0;

const Liked = async () => {
  const songs = await getLikedSongs();

  return (
    <div className="
      bg-neutral-900
      rounded-lg
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    ">
      <LikedContent songs={songs}/>
    </div>
   );
}

export default Liked;
