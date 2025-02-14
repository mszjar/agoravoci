import Image from "next/image";
import getSong from "@/actions/getSong";


export const revalidate = 0;

interface SongItemProps {
  params: { id: string };
}

const song: React.FC<SongItemProps> = async ({ params }) => {
  const song = await getSong(params.id);

  return (
    <div
      className="
      bg-gradient-to-b
      from-slate-100
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
              <Image fill alt="image" src={"/images/liked.png"} className="rounded-xl"/>
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
                Creators List
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
                {song.title}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default song;
