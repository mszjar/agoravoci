import getSongsByTitle from "@/actions/getSongsByTitle";
import SearchContent from "@/components/SearchContent";
import SeatchInput from "@/components/SearchInput";

interface SearchProps {
  searchParams: {
    title: string;
  }
};

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <div className="
      bg-gray-100
      rounded-xl
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    ">
      <div className="p-4 from-bg-gray-100">
        <div className="mb-2 flex flex-col gap-y-6">
          <SeatchInput/>
        </div>
      </div>
      <SearchContent songs={songs}/>
    </div>
  )
}

export default Search;
