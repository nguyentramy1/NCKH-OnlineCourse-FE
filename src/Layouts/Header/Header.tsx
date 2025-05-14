import React, { useState } from "react";
import "./Header.scss";
import LogoHeader from "../../Assets/Image/Logo.svg";
import { useAppDispatch, useAppSelector } from "../../store";
import { authActions } from "../../Reduxs/Auth/AuthSlice";
import { apiService } from "../../AxiosConfig/apiService";
import Loading from "../../Components/AnimationLoading/Loading";
import { useNavigate } from "react-router-dom";
import { setTokenHeader } from "../../AxiosConfig/axiosConfig";
import { apiResponse, nullData } from "../../AxiosConfig/DataType";
import ReactDOM from "react-dom";
import ConfirmForm from "../../Components/Notification/ModalNotice/ConfirmForm";
import Button from "../../Components/Button/Button";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fullname = useAppSelector((state) => state.ProfileStore.fullname);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleGoHome = () => {
    navigate("/Home");
  };

  const confirmPopup = () => {
    setConfirmLogout(true);
  };

  const handleLogout = async () => {
    setConfirmLogout(false);
    setLoading(true);
    try {
      const isLogout =
        (await apiService.logout()) as unknown as apiResponse<nullData>;
      setTokenHeader(null);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("refreshToken");
    } catch {
      alert("Có lỗi xảy ra!");
    }
    setLoading(false);
    dispatch(authActions.setAuth(false));
  };

  return (
    <div className="header-container">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "10px",
        }}
      >
        <img
          className="LogoWeb"
          src={LogoHeader}
          alt="Logo_"
          onClick={handleGoHome}
        />
        <span style={{ fontWeight: "600", fontSize: "32px" }}> Course AI</span>
      </div>
      {/* <div className="btn-control">
        <div className="btn">
          <Button
            onClick={() => {}}
            label={"Home"}
            className="btn-login"
          ></Button>
          <Button
            onClick={() => {}}
            label={"About us"}
            className="btn-login"
          ></Button>
          <Button
            onClick={() => {}}
            label={"Courses"}
            className="btn-login"
          ></Button>
          <Button
            onClick={() => {}}
            label={"Instructors"}
            className="btn-login"
          ></Button>
          <Button
            onClick={() => {}}
            label={"Events"}
            className="btn-login"
          ></Button>
          <Button
            onClick={() => {}}
            label={"Contact Us"}
            className="btn-login"
          ></Button>
        </div>
      </div> */}
      <div className="btn-control">
        <div className="btn" onClick={handleProfile}>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            label={"Đăng nhập"}
            className="btn-login"
          ></Button>
          <Button
            onClick={() => {
              navigate("/signup");
            }}
            label={"Đăng ký"}
            className="btn-signup"
          ></Button>
        </div>

        {isLoading && (
          <div className={`Loading-cover ${isLoading ? "active" : ""}`}>
            {isLoading && (
              <div className="modal">
                <Loading />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
