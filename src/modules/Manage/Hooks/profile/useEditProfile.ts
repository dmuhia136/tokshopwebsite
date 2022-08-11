import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { emailRegex, sixChars } from "shared/regEx/regEx";
import Swal from "sweetalert2";
import { user } from "shared/recoil/user";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "shared/firebase";
import { dataURLtoFile } from "shared/helpers/dataUrlToFile";
import useFetch from "shared/hooks/useFetch";

const useEditProfile = () => {
  const [userObj, setUser] = useRecoilState(user);
  const [mailError, setMailError] = useState("");
  const [passError, setPassError] = useState("");
  const [email, setEmail] = useState(userObj?.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fname, setFname] = useState(userObj?.firstName);
  const [lname, setLname] = useState(userObj?.lastName);
  const [userName, setUserName] = useState(userObj?.userName);
  const [phone, setPhone] = useState(userObj?.phoneNumber);
  const [load, setLoad] = useState(false);
  const [img, setImg] = useState<any>(userObj?.profilePhoto);

  const { getObject, data } = useFetch();

  const handlePhoneChange = (e: string) => {
    setPhone(e);
  };

  const handleChange = (e: any) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        let mail = e.target.value.toLowerCase();
        if (mail.match(emailRegex)) setMailError("");
        else {
          setMailError("Invalid email");
        }
        break;
      case "pass":
        setPassword(e.target.value);
        if (!e.target.value.match(sixChars)) {
          setPassError("Password should be atleast six characters long");
        } else {
          setPassError("");
        }
        break;
      case "confirm":
        setConfirmPassword(e.target.value);
        break;
      case "fname":
        setFname(e.target.value);
        break;
      case "lname":
        setLname(e.target.value);
        break;
      case "userName":
        setUserName(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (img?.length > 250) {
      setLoad(true);
   

      const storageRef = ref(storage, `/rooms/avatar`);
      let file: any = img?.length > 0 && dataURLtoFile(img, "profilePic");
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          Swal.fire({
            icon: "error",
            text: "Storage error",
          });
        },
        async () => {
          let uri = await getDownloadURL(uploadTask.snapshot.ref);
          let data = await getObject(`/users/${userObj?._id}`, "PUT", {
            firstName: fname,
            lastName: lname,
            email: email,
            userName: userName,
            profilePhoto: uri,
            phonenumber: phone,
          });
          updateStore(data);
          if (data.success) setLoad(false);
        }
      );
    } else if (img.length > 0 && img.length < 250) {
      setLoad(true);

      let data = await getObject(`/users/${userObj?._id}`, "PUT", {
        firstName: fname,
        lastName: lname,
        email: email,
        userName: userName,
        phonenumber: phone,
      });
      if (data.success) setLoad(false);

      updateStore(data);
    }
  };

  const updateStore = (data: any) => {
    let newObj = {
      token: data?.token,
      _id: data.user._id,
      userName: data.user.userName,
      profilePhoto: data.user.profilePhoto,
      phoneNumber: data.user.phonenumber,
      email: data.user.email,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      wallet: data.user.wallet,
      roomuid: data.user.roomuid,
    };
    setUser(newObj);
    setLoad(false);
  };

  return {
    mailError,
    passError,
    email,
    password,
    fname,
    lname,
    userName,
    handleChange,
    load,
    phone,
    handlePhoneChange,
    handleSubmit,
    confirmPassword,
    img,
    setImg,
    setPhone,
  };
};

export default useEditProfile;
