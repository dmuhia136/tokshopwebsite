import ImageUpload from "shared/components/common/ImageUpload";

const Avatar: React.FC<{
  setImg: React.Dispatch<React.SetStateAction<string>>;
  img: any;
}> = ({ setImg, img }) => {

  return (
    <div className="flex flex-col w-full item gap-6">
      <p className="text-black-70  text-xl font-medium">tokshow avatar</p>
      <div className="flex w-full  self-start">
        <ImageUpload setImg={setImg} oldImg={img} />
      </div>
    </div>
  );
};

export default Avatar;
