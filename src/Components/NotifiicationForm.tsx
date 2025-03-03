import React from "react";
import Button from "../Components/Button/Button";
import "./WarningForm/DeleteForm.scss";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  Notification: string;
};

const Notification: React.FC<Props> = ({ onClose, isOpen, Notification }) => {
  return (
    <div className="Noti">
      <div className={`overlay ${isOpen ? "open" : "close"}`} onClick={onClose}>
        <div
          className={`modal ${isOpen ? "open" : "close"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <h1>Thông báo!</h1>
          <div className="form-input">
            <h2>{Notification}</h2>
          </div>
          <div className="form-btn">
            <Button
              label="OK"
              onClick={onClose} // Gọi hàm xóa khi nhấn OK
              className="btn-delete"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
