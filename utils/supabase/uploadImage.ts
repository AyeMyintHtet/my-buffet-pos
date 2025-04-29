import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { createClient } from "@/utils/supabase/server";

export async function  useUploadImage(bucket: string) {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const supabase = await createClient();
  const uploadImage = async (file: File) => {
    setUploading(true);
    setError(null);

    try {
      const compressedFile = await imageCompression(file, {
        maxWidthOrHeight: 2000,
        maxSizeMB: 1, // (optional) force target max size
        useWebWorker: true,
      });

      const fileName = `${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, compressedFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: 'image/jpeg',
        });

      if (uploadError) throw new Error(uploadError.message);

      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
      setImageUrl(data.publicUrl);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    }

    setUploading(false);
  };

  return { uploadImage, uploading, imageUrl, error };
}