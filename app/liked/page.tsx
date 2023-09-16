import getLikedSongs from "@/actions/getLikedSongs";
import Image from "next/image"
import LikedContent from "./components/LikedContent";

export const revalidate = 0;

const Liked = async () => {
  const songs = await getLikedSongs();

  return (
    <div className="
    bg-gradient-to-b
    from-gray-100
      rounded-xl
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
