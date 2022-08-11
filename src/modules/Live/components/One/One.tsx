import { ShowStore } from "modules/Live/store/ShowStore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useSpinner from "shared/components/spinner/useSpinner";
import Stepper from "shared/components/Stepper";
import { dataURLtoFile } from "shared/helpers/dataUrlToFile";
import Avatar from "./Avatar";
import Name from "./Name";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "shared/firebase";
import Swal from "sweetalert2";

const One = () => {
  let steps = ["Tokshow", "Product", "Get paid"];
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>("");
  const [fileLoad, setFileLoad] = useState(false);
  const setStore = useSetRecoilState(ShowStore);
  const navigate = useNavigate();
  const { renderSpinner } = useSpinner();
  const { title, description, avatar } = useRecoilValue(ShowStore);

  const handleSubmit = () => {
    const storageRef = ref(storage, `/rooms/avatar`);
    if (img.length > 250) {
      setFileLoad(true);
      let file: any = img?.length > 0 && dataURLtoFile(img, "roomavatar");
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          Swal.fire({
            icon: "error",
            text: "Storage error",
          });
        },
        async () => {
          let uri = await getDownloadURL(uploadTask.snapshot.ref);
          setFileLoad(false);
          setStore((prev) => {
            return {
              title: name,
              description: desc,
              avatar: uri,
              product: prev.product,
              time: prev.time,
              date: prev.date,
              cod: prev.cod,
              mpesa: prev.mpesa,
              pay: prev.pay,
              roomId: prev.roomId,
              now: prev.now,
            };
          });
          navigate("/live/two");
        }
      );
    } else if (img.length > 0 && img.length < 250) {
      setStore((prev) => {
        return {
          title: name,
          description: desc,
          avatar: prev.avatar,
          product: prev.product,
          time: prev.time,
          date: prev.date,
          cod: prev.cod,
          mpesa: prev.mpesa,
          pay: prev.pay,
          roomId: prev.roomId,
          now: prev.now,
        };
      });
      navigate("/live/two");
    }
  };

  useEffect(() => {
    setDesc(description);
    setName(title);
    setImg(avatar);
    return () => {};
  }, []);

  return (
    <div className="flex flex-col w-full items-center  mt-10 px-10 py-8">
      <Stepper number={0} steps={steps} />
      <div className="flex flex-col w-full lg:w-2/3 gap-10 py-10 ">
        <Name setName={setName} setDesc={setDesc} name={name} desc={desc} />
        <Avatar setImg={setImg} img={img} />
      </div>
      {renderSpinner(fileLoad)}
      <button
        onClick={handleSubmit}
        disabled={
          name.length < 1 || desc.length < 1 || img.length < 1 || fileLoad
        }
        className="blue-btn w-44"
      >
        Next
      </button>
    </div>
  );
};

export default One;
