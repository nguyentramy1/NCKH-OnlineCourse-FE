import { useState } from "react";

const useLogin = () => {
  const [validUser, setValidUser] = useState("");
  const [validPass, setValidPass] = useState("");
  const [validFullname, setValidFullname] = useState("");
  const [validConfirmPass, setValidConfirmPass] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const isValidFields = (username: string, password: string) => {
    if (!username) {
      setValidUser("Please enter account name!");
      setTimeout(() => setValidUser(""), 3000);
      return;
    }
    if (!password) {
      setValidPass("Please enter password!");
      setTimeout(() => setValidPass(""), 3000);
      return;
    }
  };
  const isValidFieldsSignup = (
    username: string,
    password: string,
    fullName: string,
    confirmpassword: string,
    email: string
  ): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#%])[A-Za-z\d@$!%*?&#%]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Kiểm tra định dạng email
  
    if (!fullName) {
      setValidFullname("Please enter full name!");
      setTimeout(() => setValidFullname(""), 3000);
      return false;
    }
  
    if (!username) {
      setValidUser("Please enter account name!");
      setTimeout(() => setValidUser(""), 3000);
      return false;
    }
  
    if (!email) {
      setValidEmail("Please enter email!");
      setTimeout(() => setValidEmail(""), 3000);
      return false;
    }
  
    if (!emailRegex.test(email)) {
      setValidEmail("Invalid email format!");
      setTimeout(() => setValidEmail(""), 3000);
      return false;
    }
  
    if (!password) {
      setValidPass("Please enter password!");
      setTimeout(() => setValidPass(""), 3000);
      return false;
    }
  
    if (!passwordRegex.test(password)) {
      setValidPass("Required 8+ chars, 1 upper, 1 lower, 1 number, 1 special.");
      setTimeout(() => setValidPass(""), 3000);
      return false;
    }
  
    if (!confirmpassword) {
      setValidConfirmPass("Please enter confirm password!");
      setTimeout(() => setValidConfirmPass(""), 3000);
      return false;
    }
  
    if (confirmpassword !== password) {
      setValidConfirmPass("Confirmed passwords do not match! Please check again.");
      setTimeout(() => setValidConfirmPass(""), 3000);
      return false;
    }
  
    return true;
  };
  


  return {
    validUser,
    validPass,
    validEmail,
    validConfirmPass,
    validFullname,
    isValidFields,
    isValidFieldsSignup
  };
};

export default useLogin;
