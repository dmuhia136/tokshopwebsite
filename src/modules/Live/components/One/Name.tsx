import React from "react";

const Name: React.FC<{
  setName: React.Dispatch<React.SetStateAction<string>>;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  desc: string;
}> = ({ setName, setDesc, name, desc }) => {
  return (
    <div className="flex flex-col w-full gap-6">
      <p className="text-black-70 text-xl font-medium">Setup your TokShow</p>
      <form className="w-full flex flex-col justify-center items-center gap-4 md:gap-16">
        <div className="flex flex-col w-full gap-3">
          <input
            required
            value={name}
            onChange={(evt) => setName(evt.target.value)}
            type="text"
            placeholder="Name"
            className="inputs w-full"
          />
          <p className="text-xs text-black-40">
            Your unique brand name that will distinguish your shows and
            products. It will be public-facing and used as a way for your
            customers to identify you.
          </p>
        </div>

        <textarea
          required
          value={desc}
          onChange={(evt) => setDesc(evt.target.value)}
          placeholder="Description"
          className="textarea w-full"
          name=""
          id=""
          cols={30}
          rows={6}
        />
      </form>
    </div>
  );
};

export default Name;
