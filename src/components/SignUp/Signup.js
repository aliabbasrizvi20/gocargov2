import { useState } from "react";
import Button from "../Button";
import cross from "../../assets/cross.png";
import check from "../../assets/check.png";

import InputField from "../InputField";
import { API } from "../../helpers/requests";
import Popup from "../Popup";
import { useNavigate } from "react-router";
export default function Signup() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const onNameChange = (e) => {
    console.log(e);

    setName(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPass(e.target.value);
  };
  const onClick = (e) => {
    if (email === "" || pass === "") {
      setShowPopup(true);
      return;
    }

    API.post(
      "/users/save",
      {
        name: name,
        email: email,
        password: pass,
        profile_pic: null,
      },
      {
        withCredentials: true,
      },
    )
      .then((response) => {
        console.log(response);
        setSuccessPopup(true);
        setTimeout(() => {
          nav("/login");
        }, 2000);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  return (
    <div className="holder">
      <div className="login-form">
        <div className="text-data"></div>
        <div className="data-field">
          <h1>Register</h1>
          <InputField
            type="text"
            placeholder="Enter Name"
            onChange={onNameChange}
          />
          <InputField
            type="email"
            placeholder="Enter Email"
            onChange={onEmailChange}
          />
          <InputField
            type="password"
            placeholder="Enter Password"
            onChange={onPasswordChange}
          />
          {showPopup && (
            <Popup
              image={cross}
              heading="Sorry"
              subHeading="Please enter a valid email"
              className="red-btn"
              buttonText="OK"
              onClose={() => setShowPopup(false)}
            />
          )}
          {successPopup && (
            <Popup
              image={check}
              heading="Success"
              subHeading="You Have Successfully Created Your Account"
              buttonText="LogIn To Continue"
              className="green-btn"
              onClose={() => setSuccessPopup(false)}
            />
          )}

          <Button onClick={onClick}>SignUp</Button>
        </div>
      </div>
    </div>
  );
}
