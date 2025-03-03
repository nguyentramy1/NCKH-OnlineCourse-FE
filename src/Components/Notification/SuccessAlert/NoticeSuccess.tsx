import React from "react";
import { TiTickOutline } from "react-icons/ti";
import "./NoticeSuccess.scss";

type prop = {
  successNotice: string;
  showError: boolean;
  onClose: () => void;
};

const NoticeSuccess: React.FC<prop> = ({
  successNotice,
  showError,
  onClose,
}) => {
  return (
    <div className={`success ${showError ? "open" : "close"}`}>
      <div className="success__icon">
        <TiTickOutline size="24px" />
      </div>
      <div className="success__title">{successNotice}</div>
      <div className="success__close" onClick={onClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          viewBox="0 0 20 20"
          height="20"
        >
          <path
            fill="#393a37"
            d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default NoticeSuccess;
