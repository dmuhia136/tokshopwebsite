import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBase64 } from "shared/toBase64/encode";
import useFirebase from "shared/firebase/useFirebase";
import useSpinner from "shared/components/spinner/useSpinner";
import useFetch from "shared/hooks/useFetch";
import Swal from "sweetalert2";

const Images = () => {
  const [key, setKey] = useState(0);
  const fileRef = useRef<any>(null);
  const [imgs, setImgs] = useState<any>([]);
  const [base64Strs, setBase64] = useState<any>([]);
  const navigate = useNavigate();
  const { uploadToFirebase, uris } = useFirebase();
  const { renderSpinner } = useSpinner();
  const { productId } = useParams();
  const { getObject, load } = useFetch();
  const [fileLoad, setFileLoad] = useState(false);

  const handleChange = async (e: any) => {
    setImgs((prev: any[]) => [...prev, e.target.files[0]]);
    let str: any = await getBase64(e.target.files[0]);
    setBase64((prev: any) => [...prev, str]);
    setKey((key) => ++key);
  };

  const handleSubmit = async () => {
    uploadToFirebase(imgs, "/products/images");
    setFileLoad(true);
  };

  useEffect(() => {
    if (uris.length === imgs.length && imgs.length > 0 && uris.length > 0) {
      getObject(`/products/products/${productId}`, "PUT", {
        images: uris,
      });
      Swal.fire({
        icon: "success",
        timer: 1000,
      });
      setFileLoad(false);
      setImgs([]);
      navigate(`/myAccount/shops/`, { replace: true });
    }

    return () => {};
  }, [uris]);

  return (
    <div className="flex flex-col px-4 py-8 relative items-center">
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
        className="text-blue-30 text-6xl absolute top-28 right-5 md:right-4 lg:right-40 2xl:right-1/3"
      />
      <p className="text-black-70 text-lg md:text-3xl font-medium my-8">
        Click on the plus button to add images
      </p>
      {renderSpinner(load || fileLoad)}
      <div className="flex flex-wrap gap-2 justify-center max-w-md">
        {base64Strs.map((img: any, index: number) => (
          <img
            key={index}
            src={img}
            alt=""
            className="object-contain w-24 h-24 border-[1px] rounded-md"
          />
        ))}
      </div>

      <div className="flex min-h-[20vh]"></div>
      <div className="flex flex-wrap"></div>
      <button
        onClick={() => {
          handleSubmit();
        }}
        disabled={imgs.length < 1 || load || fileLoad}
        className="red-btn w-60"
      >
        Submit
      </button>
    </div>
  );
};

export default Images;
