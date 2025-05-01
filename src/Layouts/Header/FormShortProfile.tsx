import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Header.scss";
import { useDispatch } from "react-redux";
import Button from "../../Components/Button/Button";
import { apiService } from "../../AxiosConfig/apiService";
import { setTokenHeader } from "../../AxiosConfig/axiosConfig";
import { apiResponse, nullData } from "../../AxiosConfig/DataType";
import Loading from "../../Components/AnimationLoading/Loading";
import ConfirmForm from "../../Components/Notification/ModalNotice/ConfirmForm";
import { authActions } from "../../Reduxs/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkSquareAlt } from "@fortawesome/free-solid-svg-icons"; // Icon giống trong ảnh

interface FormProps {
  onClose: () => void;
  isOpen: boolean;
}

const FormShortProfile: React.FC<FormProps> = ({ onClose, isOpen }) => {
  const [isFormUpload, setIsFormUpload] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleOnchange = async (id: number) => {};
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
  const navigate = useNavigate();
  const OpenProfile = () => {
    navigate(`/ProfileMember`);
  };

  return (
    <div className={`wrap ${isOpen ? "open" : "close"}`} onClick={onClose}>
      <div className={`form-container ${isOpen ? "open" : "close"}`}>
        <div className="form">
          <div className="delete" onClick={OpenProfile}>
            <div
              className="profile-button-container"
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={OpenProfile}
                label={"Profile short view"}
                className="btn"
              />
              <FontAwesomeIcon
                icon={faExternalLinkSquareAlt}
                className="expand-icon"
              />
            </div>
          </div>
          <div className={`logout-btn ${isLoading ? "loading" : ""}`}>
            <div
              onClick={confirmPopup}
              style={{ display: "flex", flexDirection: "row", gap: "10px" }}
            >
              <span>Logout</span>

              <div className="logoutIcon" />
            </div>
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
          {ReactDOM.createPortal(
            <ConfirmForm
              isOpen={confirmLogout}
              onClose={() => setConfirmLogout(false)}
              confirm={handleLogout}
              dataType="logout"
            />,
            document.body
          )}
        </div>
      </div>
    </div>
  );
};

export default FormShortProfile;
