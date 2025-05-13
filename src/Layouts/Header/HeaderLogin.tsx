import React, { useState } from "react";
import "./Header.scss";
import LogoHeader from "../../Assets/Image/Logo.svg";
import { useAppDispatch, useAppSelector } from "../../store";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import FormShortProfile from "./FormShortProfile";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fullname = useAppSelector((state) => state.ProfileStore.fullname);
  const [showForm, setShowForm] = useState(false);

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleGoHome = () => {
    navigate("/home");
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
            onClick={() => {
              console.log(fullname);
            }}
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

      <div className="account-control">
        <div className="Cart-label" onClick={() => {}}>
          <div className="UserName">
            <div onClick={() => navigate(`/my-course`)}>
              <p style={{ marginRight: "60px" }}>Khóa học của tôi</p>
            </div>
          </div>
          <div className="ImgCart" onClick={() => navigate(`/my-cart`)}></div>
        </div>
        <div className="account-label" onClick={() => setShowForm(true)}>
          <div className="UserName">
            <p>{fullname ? fullname : "No Info"}</p>
          </div>
          <div className="ImgAccount"></div>
        </div>

        <FormShortProfile
          isOpen={showForm}
          onClose={() => setShowForm(false)}
        />
      </div>
    </div>
  );
};

export default Header;
