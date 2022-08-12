import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { user } from "shared/recoil/user";
import { emailRegex, sixChars } from "shared/regEx/regEx";
import Swal from "sweetalert2";
import { Axios } from "shared/http/Http";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const [mailError, setMailError] = useState("");
  const [passError, setPassError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [bio, setBio] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState<any>();
  const [load, setLoad] = useState(false);

  const [img, setImg] = useState<any>("");
  // api errors
  const [errors, setErrors] = useState<any>({});
  const setUser = useSetRecoilState(user);
  let navigate = useNavigate();

  const handlePhoneChange = (e: string) => {
    setPhone(e);
  };

  const handleChange = (e: any) => {
    setErrors("");
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
        if (e.target.value !== password)
          setPassError("Password and Confirm passwords don't match");
        else setPassError("");

        break;
      case "confirm":
        if (e.target.value !== password)
          setPassError("Password and Confirm passwords don't match");
        else setPassError("");

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
      case "bio":
        setBio(e.target.value);
        break;
      case "img":
        break;
      default:
        break;
    }
  };

  const upload = async (url: string, obj: any) => {
    try {
      const { data } = await Axios.post("/registerv1", {
        ...obj,
        profilePhoto: url
      });
      const newObj = {
        token: data.accessToken,
        _id: data.data._id,
        userName: data.data.userName,
        profilePhoto: data.data.profilePhoto,
        phoneNumber: data.data.phonenumber,
        email: data.data.email,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        wallet: data.data.wallet,
        roomuid: data.data.roomuid,
      };
      setUser(newObj);
      setLoad(false);
      setErrors("");
      navigate("/",{replace:true});
    } catch (e: any) {
      setErrors(e?.response?.data);
      setLoad(false);
      Swal.fire({
        icon: "error",
        title: e.response?.data?.message || e?.response?.data?.info?.message,
      });
    }
  };

  return {
    mailError,
    passError,
    email,
    password,
    fname,
    lname,
    bio,
    userName,
    handleChange,
    load,
    errors,
    phone,
    handlePhoneChange,
    confirmPassword,
    img,
    setImg,
    upload,
  };
};

export default useRegister;
