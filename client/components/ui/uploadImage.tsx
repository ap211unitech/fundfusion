"use client";

import { useDropzone } from "react-dropzone";
import classNames from "classnames";
import { useState } from "react";

import { ImageComponent } from "./imageComponent";

type Props = {
  formField: object;
  onDrop: (acceptedFiles: File[]) => void;
};

export const UploadImage = ({ formField, onDrop: onDropCallback }: Props) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const onDrop = (acceptedFiles: File[]) => {
    setImagePreviewUrl(URL.createObjectURL(acceptedFiles.at(0) as File));
    onDropCallback(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps({
        className: `relative overflow-hidden border-2 h-[400px] border-dashed rounded-xl cursor-pointer transition duration-300 ${
          isDragActive ? "border-blue-500" : "border-input"
        } ${!imagePreviewUrl && "border-primary"}`,
      })}
      {...formField}
    >
      <input {...getInputProps()} />

      {!!imagePreviewUrl && (
        <div className="absolute inset-0 -z-10 h-full w-full scale-105">
          <ImageComponent src={imagePreviewUrl} alt="Uploaded image" fill />
        </div>
      )}

      <div
        className={classNames(
          "absolute left-[50%] top-[50%] flex max-h-full flex-col items-center gap-1 self-center rounded-lg p-4 text-center",
          imagePreviewUrl &&
            "bg-muted/90 dark:bg-background/90 dark:text-white",
        )}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <p className="text-lg text-primary">Upload Image</p>
        <p className="text-xs">
          {isDragActive
            ? "Drop the files here ..."
            : "Drag and drop images here, or click to select files."}
        </p>
      </div>
    </div>
  );
};
