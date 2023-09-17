"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import useAuthModal from "@/hooks/useAuthModal";



const UploadContent = () => {
  const router = useRouter();

  const { isLoading, user, subscription } = useUser();
  const authModal = useAuthModal();


  const subscribeModal = useSubscribeModal();
  const uploadModal = useUploadModal();


  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <div className="p-7">
      <div className="mt-5">
          { user ? (
            <div className="flex gap-x-4 items-center">
              <Button
                disabled={loading || isLoading}
                onClick={onClick}
                className="w-full"
              >
                Create a podcast
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

export default UploadContent;
