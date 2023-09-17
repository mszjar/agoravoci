import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Input from "./Input";
import Button from "./Button";
import Modal from "./Modal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";


const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    }
  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user ) {
        toast.error("Missing fields.");
        return;
      }

      const uniqueID = uniqid();

      //Upload song
      const {
        data: songData,
        error: songError,
      } = await supabaseClient
        .storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false
        });
        if (songError) {
          setIsLoading(false);
          console.log(songError);
          return toast.error("Failed to upload audio.");
        }

      //Upload image
      const {
        data: imageData,
        error: imageError,
      } = await supabaseClient
        .storage
        .from("images")
        .upload(`image-${values.title}-${uniqueID}`, imageFile, {
          cacheControl: "3600",
          upsert: false
        });
        if (imageError) {
          setIsLoading(false);
          return toast.error("Failed to upload image.");
        }

        const {
          error: supabaseError
        } = await supabaseClient
          .from("songs")
          .insert({
            user_id: user.id,
            title: values.title,
            author: values.author,
            image_path: imageData.path,
            song_path: songData.path
          });

        if (supabaseError) {
          return toast.error(supabaseError.message);
        }

        router.refresh();
        setIsLoading(false);
        toast.success("Podcast created successfully.");
        uploadModal.onClose();

    } catch (error) {
      toast.error("Something went wrong, please try again.")
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title="Add a podcast"
      description="Upload an mp3 file."
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Description"
        />
        <div>
          <div className="pb-1">
            Select an audio file
          </div>
          <Input
          id="song"
          type="file"
          disabled={isLoading}
          accept=".mp3"
          {...register("song", { required: true })}
        />
        </div>
        <div>
          <div className="pb-1">
            Select an image
          </div>
          <Input
          id="image"
          type="file"
          disabled={isLoading}
          accept="image/*"
          {...register("image", { required: true })}
        />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
   );
}

export default UploadModal;
