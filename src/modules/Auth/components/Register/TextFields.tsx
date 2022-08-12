import useRegister from "../../hooks/useRegister";
import PhoneInput from "react-phone-number-input";
import "shared/styles/phoneInput.css";
import { useEffect } from "react";

const textFields: React.FC<{ setFormValues: React.Dispatch<any> }> = ({
  setFormValues,
}) => {
  const {
    mailError,
    passError,
    email,
    password,
    fname,
    lname,
    userName,
    handleChange,
    errors,
    phone,
    handlePhoneChange,
    confirmPassword,
  } = useRegister();

  useEffect(() => {
    setFormValues({
      email,
      firstName: fname,
      lastName: lname,
      password,
      userName,
      phonenumber: phone,
      profilePhoto: "",
    });
  }, [fname, email, password, lname, userName, phone]);

  return (
    <div className="flex flex-col gap-6 lg:gap-8 w-full items-center">
      <div className="flex flex-col md:flex-row gap-6 lg:gap-10 w-full md:justify-center">
        <input
          onChange={handleChange}
          value={fname}
          required
          type="text"
          id="fname"
          placeholder="First name"
          className="inputs w-full lg:w-1/3"
        />
        <input
          onChange={handleChange}
          value={lname}
          required
          type="text"
          id="lname"
          placeholder="Last name"
          className="inputs w-full lg:w-1/3"
        />
      </div>

      <div
        className="flex flex-col md:flex-row gap-6 lg:gap-10 md:justify-center 
        w-full items-center"
      >
        <div className="flex flex-col w-full lg:w-1/3">
          <input
            onChange={handleChange}
            value={email}
            required
            type="text"
            id="email"
            placeholder="Email address"
            className="inputs w-full"
          />
          <p className="text-red-600 font-bold text-[1rem] text-center">
            {mailError ||
              errors?.email?.message ||
              (errors?.length > 1 && errors.info.message)}
          </p>
        </div>

        <div className="flex flex-col w-full lg:w-1/3">
          {/* Phone */}
          <PhoneInput
            required={true}
            country={"ke"}
            value={phone}
            placeholder="Phone number"
            onChange={handlePhoneChange}
            className="inputs w-full"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 lg:gap-10 md:justify-center w-full">
        <input
          onChange={handleChange}
          value={userName}
          required
          type="text"
          id="userName"
          placeholder="user name"
          className="inputs w-full lg:w-1/3"
        />
        <div className="w-full lg:w-1/3" />
      </div>
      <div className="flex flex-col md:flex-row gap-6 lg:gap-10 md:justify-center w-full">
        <div className="flex flex-col w-full lg:w-1/3">
          <input
            onChange={handleChange}
            value={password}
            type="password"
            id="pass"
            placeholder="Password"
            className="inputs  w-full"
          />
          <p className="text-red-600 font-bold text-[1rem] text-center">
            {passError || errors?.password?.message}
          </p>
        </div>

        <div className="flex flex-col w-full lg:w-1/3">
          <input
            onChange={handleChange}
            value={confirmPassword}
            type="password"
            id="confirm"
            placeholder="Confirm password"
            className="inputs w-full"
          />
          <p className="text-red-600 font-bold text-[1rem] text-center">
            {passError || errors?.password?.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default textFields;
