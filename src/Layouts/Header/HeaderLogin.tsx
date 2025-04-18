import React, { useState } from "react";
import "./Header.scss";
import LogoHeader from "../../Assets/Image/LogoText.svg";
import { useAppDispatch, useAppSelector } from "../../store";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import FormShortProfile from "./FormShortProfile";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fullname = useAppSelector((state) => state.ProfileStore.fullname);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleGoHome = () => {
    navigate("/list");
  };

  return (
    <div className="header-container">
      <img
        className="LogoWeb"
        src={LogoHeader}
        alt="Logo_"
        onClick={handleGoHome}
      />
      <div className="btn-control">
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
      </div>

      <div className="account-control">
        <div className="Cart-label" onClick={() => {}}>
          <div className="UserName">
            <p>My learning</p>
          </div>
          <div className="ImgCart"></div>
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
