import React, { useEffect, useState } from "react";
import "./LoginPage.scss";
import ImgLogin from "../../Assets/Image/ImgLogin.svg";
import Input from "../../Components/Input/Input";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import NoticeError from "../../Components/Notification/ErrorAlert/NoticeError";
import Loading from "../../Components/AnimationLoading/Loading";
import useLogin from "./Hooks/useLogin";
import { setTokenHeader } from "../../AxiosConfig/axiosConfig";
import { apiService } from "../../AxiosConfig/apiService";
import { authActions } from "../../Reduxs/Auth/AuthSlice";
import { profileActions } from "../../Reduxs/UserInfor/ProfileSlice";
import { useDispatch } from "react-redux";
import { apiResponse, DataLoginType } from "../../AxiosConfig/DataType";
import { jwtDecode } from "jwt-decode";
import { useAppSelector } from "../../store";
import { noticeActions } from "../../Reduxs/Notification/Notification";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { validUser, validPass, isValidFields } = useLogin();
  const [showError, setShowError] = useState(false);

  const handleOnchangeUser = (e: string) => {
    setUserName(e);
  };

  const handleOnchangePassword = (e: string) => {
    setPassword(e);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      isValidFields(username, password);
      return;
    }
    if (username.trim() === "") {
      setError("Yêu cầu nhập đầy đủ tên tài khoản!");
      setShowError(true);
      setTimeout(() => {
        setError("");
        setShowError(false);
      }, 5000);
      return;
    }
    try {
      setLoading(true);
      const response = (await apiService.login({
        username: username,
        password: password,
      })) as unknown as apiResponse<DataLoginType>;

      const info = response.data;
      const token = response.data.accessToken;
      const decodedToken = jwtDecode<{ unique_name: string; userId: string }>(
        token
      );
      console.log("mã giải ", decodedToken.userId);

      setTokenHeader(token ? token : "");
      dispatch(authActions.setRole(response.data.role));
      dispatch(profileActions.setUnique_name(decodedToken.unique_name));
      dispatch(profileActions.setUserId(decodedToken.userId));
      console.log("userId", decodedToken.userId);

      sessionStorage.setItem("refreshToken", response.data.refreshToken);
      dispatch(authActions.setAuth(true));
      dispatch(authActions.setInfo(info));
      dispatch(noticeActions.setNotificationSuccess("Login successful"));
      dispatch(noticeActions.setIsShowNoticeSuccess(true));
    } catch (error: unknown | string) {
      // Kiểm tra kiểu dữ liệu của error
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(error ? (error as unknown as string) : "Something went wrong");
      }
      setShowError(true);
      setTimeout(() => {
        setError("");
        setShowError(false);
      }, 5000);
      console.log(error);
    }
    setLoading(false);
  };
  const success = useAppSelector(
    (state) => state.noticeStore.notifiactionSuccess
  );
  const isShowNoticeSuccess = useAppSelector(
    (state) => state.noticeStore.isShowNoticeSuccess
  );
  const handleCloseNotice = () => {
    dispatch(noticeActions.setIsShowNotice(false));
    dispatch(noticeActions.setIsShowNoticeSuccess(false));
  };
  useEffect(() => {
    if (showError || isShowNoticeSuccess) {
      setTimeout(() => {
        handleCloseNotice();
      }, 3000);
    }
  }, [showError, isShowNoticeSuccess]);
  const handleNavigate = () => {
    navigate("/signup"); // Điều hướng đến trang "/new-route"
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
      <div className="form-login">
        <div className="modal-login">
          <div className="logoLogin">
            <span>Log in to continue your learning journey</span>
          </div>

          <div className="input-area">
            <div className="input-field">
              <div className="username">
                <p>Username</p>
                <Input
                  onChange={handleOnchangeUser}
                  placeHolder="Username"
                  value={username}
                  onEnterPress={handleLogin}
                />
                <div className={`tooltip ${validUser ? "visible" : "hidden"}`}>
                  {validUser}
                </div>
              </div>
              <div className="password" style={{ position: "relative" }}>
                <p>Password</p>
                <Input
                  onChange={handleOnchangePassword}
                  placeHolder="Password"
                  value={password}
                  onEnterPress={handleLogin}
                  type="password"
                />
                <div className={`tooltip ${validPass ? "visible" : "hidden"}`}>
                  {validPass}
                </div>
              </div>
            </div>
          </div>
          <div className="btn-container">
            <div className="btn-login">
              <Button
                onClick={handleLogin}
                label={`${loading ? "Waiting..." : "Login"}`}
                dis={loading}
              />
            </div>
            <div className="link-btn">
              <p>
                Create a new account?
                <span onClick={handleNavigate}>Sign up</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
