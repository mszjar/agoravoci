import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

const useGetSongsByUser = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song[]>([]);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchSong = async (user: string) => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("user_id", `${user}`)
        .order("created_at", { ascending: false });

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setSong(data as Song[]);
      setIsLoading(false);
    };

    fetchSong(id);
  }, [id, supabaseClient]);

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
};

export default useGetSongsByUser;
