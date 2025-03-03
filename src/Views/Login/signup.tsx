import React, { useState } from "react";
import "./LoginPage.scss";
import ImgLogin from "../../Assets/Image/ImgLogin.svg";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import NoticeError from "../../Components/Notification/ErrorAlert/NoticeError";
import Loading from "../../Components/AnimationLoading/Loading";
import useLogin from "./Hooks/useLogin";
import { apiService } from "../../AxiosConfig/apiService";
import { useDispatch } from "react-redux";
import { apiResponse, nullData } from "../../AxiosConfig/DataType";
import { useNavigate } from "react-router-dom";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [fullname, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmpassword, setComfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { validUser, validPass, validConfirmPass,validEmail,validFullname, isValidFieldsSignup } = useLogin();
  const [showError, setShowError] = useState(false);

  const handleOnchangeUser = (e: string) => {
    setUserName(e);
  };
  const OnchangeFullName = (e: string) => {
    setFullName(e);
  };
  const OnchangeEmail = (e: string) => {
    setEmail(e);
  };

  const handleOnchangePassword = (e: string) => {
    setPassword(e);
  };
  const OnchangeConfirmPassword = (e: string) => {
    setComfirmPassword(e);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  const data= {
    username: username,
    fullName: fullname,
    email: email,
    password: password,
    confirmPassword: comfirmpassword 
  }
  const handleSignup = async () => {
    if (!isValidFieldsSignup(username, password, fullname,comfirmpassword, email )) {
      
      return;
    }

    
    // if (username.trim() === "") {
    //   setError("Yêu cầu nhập đầy đủ tên tài khoản!");
    //   setShowError(true);
    //   setTimeout(() => {
    //     setError("");
    //     setShowError(false);
    //   }, 5000);
    //   return;
    // }
    try {
          const signup =
            (await apiService.signup(data)) as unknown as apiResponse<nullData>;
          // if (isLogout.code === 200) {
          //   console.log("Đăng xuất thành công!");
          //   sessionStorage.removeItem("token");
          //   sessionStorage.removeItem("refreshToken");
          // } else {
          //   console.log("Token không đúng!");
          // }
          navigate("/login");
        } catch {
          alert("Có lỗi xảy ra!");
        }
    setLoading(false);
  };
  const handleNavigate = () => {
    navigate("/login"); // Điều hướng đến trang "/new-route"
  };
  return (
    <div className="login-container">
      <div className={`Loading-cover ${loading ? "active" : ""}`}>
        {loading && (
          <div className="modal">
            <Loading />
          </div>
        )}
      </div>
      <div className={`notice-error`}>
        <NoticeError
          errorNotice={error}
          onClose={handleCloseError}
          showError={showError}
        />
      </div>
      <div className="form-login">
        <div className="ImgLogin">
        <img src={ImgLogin} alt="logo" />
        </div>
      </div>
      <div className="form-signup">
        <div className="modal-login">
        <div className="logoLogin">
            <span>Sign up and start learning</span>
          </div>
         
          <div className="input-area">
            <div className="input-field">
              <div className="username">
                <p>Full Name</p>
                <Input
                  onChange={OnchangeFullName}
                  placeHolder="Full Name"
                  value={fullname}
                  onEnterPress={handleSignup}
                />
                <div className={`tooltip ${validFullname ? "visible" : "hidden"}`}>
                  {validFullname}
                </div>
              </div>
              <div className="username">
                <p>Username</p>
                <Input
                  onChange={handleOnchangeUser}
                  placeHolder="Username"
                  value={username}
                  onEnterPress={handleSignup}
                />
                <div className={`tooltip ${validUser ? "visible" : "hidden"}`}>
                  {validUser}
                </div>
              </div>
              <div className="username">
                <p>Email</p>
                <Input
                  onChange={OnchangeEmail}
                  placeHolder="Email"
                  value={email}
                  onEnterPress={handleSignup}
                />
                <div className={`tooltip ${validEmail ? "visible" : "hidden"}`}>
                  {validEmail}
                </div>
              </div>
              
              
            </div>
            <div className="password-container">
                  <div className="password" style={{ position: "relative" }}>
                    <p>Password</p>
                    <Input
                      onChange={handleOnchangePassword}
                      placeHolder="Password"
                      value={password}
                      onEnterPress={handleSignup}
                      type="password"
                    />
                    <div className={`tooltip ${validPass ? "visible" : "hidden"}`}>
                      {validPass}
                    </div>
                  </div>
                  <div className="password" style={{ position: "relative" }}>
                    <p>Comfirm Password</p>
                    <Input
                      onChange={OnchangeConfirmPassword}
                      placeHolder="Comfirm Password"
                      value={comfirmpassword}
                      onEnterPress={handleSignup}
                      type="password"
                    />
                    <div className={`tooltip ${validConfirmPass ? "visible" : "hidden"}`}>
                      {validConfirmPass}
                    </div>
                  </div>
              </div>
          </div>
          <div className="btn-container">
            <div className="btn-login">
              <Button
                onClick={handleSignup}
                label={`${loading ? "Waiting..." : "Sign up"}`}
                dis={loading}
              />
            </div>
            <div className="link-btn">
            <p >
            Already have an account? 
              <span onClick={handleNavigate}>
              Log in
              </span>
            </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
