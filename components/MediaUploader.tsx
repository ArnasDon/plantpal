"use client";

import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { toast } from "sonner";

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<React.SetStateAction<CloudinaryImage | null>>;
  image: CloudinaryImage | null;
};

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
}: MediaUploaderProps) => {
  const onUploadSuccessHandler = (result: CloudinaryUploadWidgetResults) => {
    const imageData = result?.info as CloudinaryUploadWidgetInfo;
    setImage({
      publicId: imageData?.public_id,
      width: imageData?.width,
      height: imageData?.height,
      secureURL: imageData?.secure_url,
      originalFilename: imageData?.original_filename,
      format: imageData?.format,
    });
    onValueChange(imageData?.secure_url);

    toast.custom(() => (
      <div className="toast-success">
        <h3 className="font-semibold">Image added successfully</h3>
      </div>
    ));
  };

  const onUploadErrorHandler = () => {
    toast.custom(() => (
      <div className="toast-error">
        <h3 className="font-semibold">Something went wrong while uploading</h3>
        <p className="text-sm">Please try again</p>
      </div>
    ));
  };

  return (
    <CldUploadWidget
      uploadPreset="plantpal"
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <div className="media-uploader" onClick={() => open()}>
            {image ? (
              <div className="flex items-center justify-center gap-2">
                <CldImage
                  src={image.secureURL}
                  alt="image"
                  width={24}
                  height={24}
                  removeBackground
                  className="size-6 object-contain"
                />
                <p className="text-sm">
                  {image.originalFilename}.{image.format}
                </p>
              </div>
            ) : (
              <p className="text-sm">Click here to upload image</p>
            )}
          </div>
        </div>
      )}
    </CldUploadWidget>
  );
};

export default MediaUploader;
