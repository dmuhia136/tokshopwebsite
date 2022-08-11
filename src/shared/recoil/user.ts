import { atom } from "recoil";

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: { setSelf: any; onSet: any }) => {
    const savedValue: any = localStorage.getItem(key);
    if (savedValue?.length > 0) setSelf(JSON.parse(savedValue));
    onSet((newValue: any, _: any, isReset: any) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const user = atom({
  key: "userObj",
  default: {
    token: "",
    _id: "",
    userName: "",
    profilePhoto: "",
    phoneNumber: "",
    email: "",
    firstName: "",
    lastName: "",
    wallet: "",
    roomuid: "",
  },
  effects_UNSTABLE: [localStorageEffect("tokshop-user")],
});
