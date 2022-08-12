import { atom } from "recoil";

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: { setSelf: any; onSet: any }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) setSelf(JSON.parse(savedValue));
    onSet((newValue: any, _: any, isReset: any) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export interface storeShape {
  name: string;
  description: string;
  avatar: File;
  productId: string;
}

export const ShowStore = atom({
  key: "tokShow",
  default: {
    title: "",
    description: "",
    avatar: "",
    product: {
      name: "",
      id: "",
      price: "",
      images: [""],
      shopId: "",
    },
    time: "",
    date: "",
    cod: false,
    mpesa: "",
    pay: "",
    roomId: "",
    now: true
  },
  effects_UNSTABLE: [localStorageEffect("TokShow")],
});
