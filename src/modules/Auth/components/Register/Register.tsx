import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSpinner from "shared/components/spinner/useSpinner";
import "shared/styles/phoneInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import TextFields from "./TextFields";
import useFetch from "shared/hooks/useFetch";
import { useSetRecoilState } from "recoil";
import { user } from "shared/recoil/user";
import Swal from "sweetalert2";

const Register = (): JSX.Element => {
  const { renderSpinner } = useSpinner();
  const [formvalues, setFormvalues] = useState<any>({});
  const navigate = useNavigate();
  const { getObject, mongoErr, load } = useFetch();
  const setUser = useSetRecoilState(user);

  const handleSubmit = async (evt: any) => {
    evt.preventDefault();
    let data = await getObject("/registerv1", "POST", formvalues);
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
    if (data.success) navigate("/", { replace: true });
    if (mongoErr)
      Swal.fire({
        icon: "error",
        text: mongoErr.info.message,
        timer: 1500,
      });
  };

  return (
    <div className="flex w-full flex-col bg-teal-50 relative px-10 py-16 gap-6 overflow-x-clip">
      <FontAwesomeIcon
        onClick={() => navigate("/")}
        icon={faHome}
        className="top-4 right-4 text-5xl absolute"
      />
      <p className="self-center text-2xl font-semibold my-4">
        Tok<span className="text-blue-40">shop</span>
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        <TextFields setFormValues={setFormvalues} />
        {renderSpinner(load)}
        <button type="submit" className="red-btn w-48 self-center mt-8">
          Submit
        </button>
      </form>
      <p className="text-2xl text-black-80 font-medium tracking-w self-center">
        Already have an account?
        <Link to="/login" className="text-blue-40">
          {" "}
          login
        </Link>
      </p>
    </div>
  );
};

export default Register;
