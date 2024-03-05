import Axios from "axios";
import { useState } from "react";
import Title from "./Title";
import PageBody from "./PageBody";
import SingInBox from "./SingInBox";
import Alert from "./Alert";

const SignUpPage = () => {
  // Axios.post("http://localhost:3000/signup", {
  //   name: "User 13",
  //   username: "user13",
  //   email: "user13@example.com",
  //   password: "user13@example",
  // })
  //   .then((res) => {
  //     console.log(`res`);
  //     console.log(res.data);
  //   })
  //   .catch((err) => {
  //     console.log(`err`);
  //     console.log(err.response.data);
  //   });

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState({ valid: true, msg: "" });
  const [pasword, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState({ valid: true, msg: "" });

  const handelName = (event) => {
    setName(event.target.value);
  };
  const handelUsername = (event) => {
    setUsername(event.target.value);
  };
  const handelEmail = (event) => {
    const enteredEmail = event.target.value;
    setEmail(enteredEmail);

    //email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(enteredEmail);
    if (!isValidEmail) {
      setEmailError({ valid: false, msg: "Not a valid email address" });
    } else {
      setEmailError({ valid: true, msg: "Valid email address" });
    }
  };
  const handelPassword = (event) => {
    const enteredPassword = event.target.value;
    setPassword(enteredPassword);

    //password validation
    const hasUpperCase = /[A-Z]/.test(enteredPassword);
    const hasLowerCase = /[a-z]/.test(enteredPassword);
    const hasNumbers = /\d/.test(enteredPassword);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(enteredPassword);
    const isValidLength = enteredPassword.length >= 8;

    if (!hasUpperCase) {
      setPasswordError({
        valid: false,
        msg: "Must contain Uppercase character",
      });
    } else if (!hasLowerCase) {
      setPasswordError({
        valid: false,
        msg: "Must contain Lowercase characters",
      });
    } else if (!hasNumbers) {
      setPasswordError({
        valid: false,
        msg: "Must contain Number",
      });
    } else if (!hasSpecialChars) {
      setPasswordError({
        valid: false,
        msg: "Must contain Special Character",
      });
    } else if (!isValidLength) {
      setPasswordError({
        valid: false,
        msg: "Must contain at least 8 characters",
      });
    } else {
      setPasswordError({ valid: true, msg: "Valid Password" });
    }
  };

  return (
    <div className="h-screen bg-[#131D3B]">
      <div className=" flex flex-col items-center justify-center">
        <Title />
        <PageBody
          handelName={handelName}
          handelUsername={handelUsername}
          handelEmail={handelEmail}
          handelPassword={handelPassword}
        />
        <SingInBox />
        <Alert emailError={emailError} passwordError={passwordError} />
      </div>
    </div>
  );
};

export default SignUpPage;
