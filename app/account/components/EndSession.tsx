"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@/hooks/useUser";



const EndSession = () => {
  const router = useRouter();

  const player = usePlayer();

  const supabaseClient = useSupabaseClient();
  const { isLoading, user } = useUser();


  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);


  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  }

  return (
    <div className="p-7">
      <div className="mb-5">
          { user ? (
            <div className="flex gap-x-4 items-center">
              <Button
                disabled={loading || isLoading}
                onClick={handleLogout}
                className="bg-gray-200 w-full"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex gap-x-4 items-center">
            </div>
          )}
        </div>
    </div>
   );
}

export default EndSession;
