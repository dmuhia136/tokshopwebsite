import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { generateDownload } from "../../helpers/cropImage";

interface Area {
  x: number; // x/y are the coordinates of the top/left corner of the cropped area
  y: number;
  width: number; // width of the cropped area
  height: number; // height of the cropped area
}

const CropDialog: React.FC<{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  file: any;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setOpen, file, setAvatar }) => {
  const [crop, setCrop] = useState({ x: 20, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area>();

  const onCropComplete = (
    croppedAreaPercentage: Area,
    croppedAreaPixels: Area
  ) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onDownload = async () => {
    let data: any = await generateDownload(file, croppedArea);
    setAvatar(data);
    setOpen(false);
  };

  return (
    <div className="dialog-wrapper">
      <div
        className="flex flex-col relative bg-white w-[90vw] max-w-md lg:max-w-[600px] m-auto
         shadow-lg min-h-[75vh] items-center overflow-y-auto"
      >
        <div
          className="flex bg-blue-40 w-full justify-between items-center text-white 
          px-4 py-4"
        >
          <p className="text-white text-xl">Crop Image</p>
          <FontAwesomeIcon onClick={() => setOpen(false)} icon={faTimes} />
        </div>
        <div className="flex flex-col w-full mt-8 p-4">
          <p className="text-black-70 text-sm text-center">
            Drag the crop area until satisfied then click "upload" to save
          </p>
          <div className="flex w-full relative h-[400px]  mt-4 rounded-md p-5 border-[1px] border-gray-400">
            <Cropper
              image={file}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <img src="" alt="" />

          <button
            type="button"
            onClick={onDownload}
            className="bg-blue-40 px-4 py-1 rounded-md text-white font-semibold
            text-lg tracking-wider max-w-sm self-center mt-4 hover:rounded-xl transition-all ease-in-out duration-75 delay-75"
          >
            upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropDialog;
