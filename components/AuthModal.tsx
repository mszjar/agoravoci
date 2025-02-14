"use client";

import Modal from "@/components/Modal";
import useAuthModal from "@/hooks/useAuthModal";
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const {session} = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };


  return (
    <Modal
      title="Agoravoci"
      description="Log in to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="light"
        providers={['github']}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '404040',
                brandAccent: '#0094FF'
              }
            }
          }
        }}
      />
    </Modal>
   );
}

export default AuthModal;
