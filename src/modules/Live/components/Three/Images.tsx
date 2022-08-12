import { faL, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBase64 } from "shared/toBase64/encode";
import useFirebase from "shared/firebase/useFirebase";
import useSpinner from "shared/components/spinner/useSpinner";
import { useSetRecoilState } from "recoil";
import { ShowStore } from "modules/Live/store/ShowStore";

const Images: React.FC<{
  setDone: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setDone }) => {
  const [key, setKey] = useState(0);
  const fileRef = useRef<any>(null);
  const [imgs, setImgs] = useState<any>([]);
  const [base64Strs, setBase64] = useState<any>([]);
  const { uploadToFirebase, uris } = useFirebase();
  const { renderSpinner } = useSpinner();
  const setStore = useSetRecoilState(ShowStore);
  const [fileLoad, setFileLoad] = useState(false);

  const handleChange = async (e: any) => {
    setImgs((prev: any[]) => [...prev, e.target.files[0]]);
    let str: any = await getBase64(e.target.files[0]);
    setBase64((prev: any) => [...prev, str]);
    setKey((key) => ++key);
  };

  const handleSubmit = () => {
    uploadToFirebase(imgs, "rooms");
    setFileLoad(false);
  };

  useEffect(() => {
    if (imgs.length > 0) {
      setDone(true);
    } else {
      setDone(false);
    }
    return () => {
      handleSubmit();
    };
  }, []);

  useEffect(() => {
    if (uris.length > 0 && uris.length >= imgs.length) {
      setStore((prev) => {
        return {
          title: prev.title,
          description: prev.description,
          avatar: prev.avatar,
          product: {
            name: prev.product.name,
            id: prev.product.id,
            price: prev.product.price,
            shopId: prev.product.shopId,
            images: uris,
          },
          time: prev.time,
          date: prev.date,
          cod: prev.cod,
          mpesa: prev.mpesa,
          pay: prev.pay,
          roomId: prev.roomId,
          now: prev.now,
        };
      });
      setFileLoad(false);
    }
  }, [uris]);

  return (
    <div className="flex flex-col w-full relative gap-6">
      <input
        key={key}
        type="file"
        onChange={(e) => handleChange(e)}
        id=""
        className="hidden"
        ref={fileRef}
      />
      <FontAwesomeIcon
        icon={faSquarePlus}
        onClick={() => fileRef.current.click()}
        className="text-blue-30 text-6xl absolute top-0 right-0 h-10 w-10"
      />
      <p className="text-black-70 text-xl font-medium">
        Click on the plus button to add images
      </p>
      {renderSpinner(fileLoad)}
      <div className="flex flex-wrap gap-2 justify-center max-w-md max-h-[200px] overflow-y-auto">
        {base64Strs.map((img: any, index: number) => (
          <img
            key={index}
            src={img}
            alt=""
            className="object-contain w-24 h-24 border-[1px] rounded-md"
          />
        ))}
      </div>
    </div>
  );
};

export default Images;
