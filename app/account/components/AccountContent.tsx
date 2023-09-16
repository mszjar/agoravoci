"use client";

import Button from "@/components/Button";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { postData } from "@/libs/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import usePlayer from "@/hooks/usePlayer";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";



const AccountContent = () => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();

  const player = usePlayer();
  const authModal = useAuthModal();

  const supabaseClient = useSupabaseClient();
  const { isLoading, subscription, user } = useUser();


  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({
        url: "/api/create-portal-link"
      });
      window.location.assign(url);
    } catch (error) {
      if (error) {
        toast.error((error as Error).message);
      }
    }
    setLoading(false);
  }

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
      {!subscription && (
        <div className="flex flex-col gap-y-4">
          <p>No active plan.</p>
            <Button
              onClick={subscribeModal.onOpen}
              className="w-[300px]"
            >
              Subscribe
            </Button>

        </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p>
            You are currently on the <b>{subscription?.prices?.products?.name}</b> plan.
          </p>
          <Button
            disabled={loading || isLoading}
            onClick={redirectToCustomerPortal}
            className="w-full"
          >
            Open customer portal
          </Button>
        </div>
      )}
      <div className="mt-5">
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

export default AccountContent;
