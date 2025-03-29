import React, { useRef, useState, ChangeEvent } from "react";

interface PictureProps {
  readablePicture: string;
setPicture: React.Dispatch<React.SetStateAction<File | null>>;
  setReadablePicture: (readablePicture: string) => void;
}

export default function Picture({
  readablePicture,
  setPicture,
  setReadablePicture,
}: PictureProps) {
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const pic = e.target.files?.[0];
    if (!pic) {
      setError("No file selected!");
      return;
    }
    if (
      pic.type !== "image/jpg" &&
      pic.type !== "image/jpeg" &&
      pic.type !== "image/png" &&
      pic.type !== "image/webp"
    ) {
      setError(`${pic.name} format is not supported`);
      return;
    } else if (pic.size > 1024 * 1024 * 7) {
      setError(`${pic.name} is too large, Max allowed size is 7 MB`);
      return;
    } else {
      setError("");
      setPicture(pic);

      // Reading picture
      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = (e) => {
        if (e.target?.result) {
          setReadablePicture(e.target.result as string);
        }
      };
    }
  };

  const handleChangePic = () => {
    setPicture(null);
    setReadablePicture("");
    inputRef.current?.click();
  };

  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor="picture" className="text-sm font-bold tracking-wide">
        Picture (Optional)
      </label>
      {readablePicture ? (
        <div>
          <img
            src={readablePicture}
            alt="Profile_Photo"
            className="w-20 h-20 object-cover rounded-full"
          />
          <div
            className="w-20 py-1 mt-2 dark:bg-dark_bg_3 rounded-md text-xs font-bold flex items-center justify-center cursor-pointer"
            onClick={handleChangePic}
          >
            Change
          </div>
        </div>
      ) : (
        <div
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
          onClick={() => inputRef.current?.click()}
        >
          Upload Picture
        </div>
      )}

      <input
        type="file"
        name="picture"
        id="picture"
        hidden
        ref={inputRef}
        accept="image/png,image/jpg,image/jpeg,image/webp"
        onChange={handleImage}
      />
      {/* Errors */}
      {error && (
        <div>
          <p className="mt-2 text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}
