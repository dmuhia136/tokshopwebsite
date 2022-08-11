import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import CropDialog from "shared/components/common/CropDialog";
import { getBase64 } from "shared/toBase64/encode";

interface Props {
  setImg: React.Dispatch<any>;
  oldImg: "" | undefined;
}

const ImageUpload: React.FC<Props> = ({ setImg, oldImg }) => {
  const [open, setOpen] = useState(false);
  const [base64, setBase64] = useState<any>("");
  const [key, setkey] = useState(0);
  const ref = useRef<any>(null);

  const handleClick = () => {
    ref.current.click();
  };

  const handleChange = async (evt: any) => {
    let res = await getBase64(evt.target.files[0]);
    setBase64(res);
    setOpen(true);
    setkey((key) => ++key);
  };

  useEffect(() => {
    setImg(base64);
  }, [open, setOpen]);

  return (
    <div className="flex flex-col w-full md:pr-4">
      {open && (
        <CropDialog file={base64} setOpen={setOpen} setAvatar={setBase64} />
      )}
      <input
        key={key}
        onChange={(evt) => handleChange(evt)}
        type="file"
        accept="img/*"
        className="hidden"
        id="img"
        ref={ref}
      />
      <div
        onClick={handleClick}
        className="flex flex-col w-full  h-60 md:w-1/2 lg:w-80 lg:h-60 items-center p-1 border-[1px] border-blue-40  bg-white rounded-xl relative"
      >
        <img
          src={base64 || oldImg}
          alt=""
          className="object-contain h-[80%] max-w-full z-10"
        />
        <FontAwesomeIcon
          icon={faCamera}
          className="w-12 h-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
