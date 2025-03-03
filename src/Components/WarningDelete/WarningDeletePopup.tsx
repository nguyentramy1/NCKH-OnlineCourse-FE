import React from "react";
import Button from "../../Components/Button/Button";
import "./WarningDeletePopup.scss";

type Props = {
  onClose: () => void;
  confirmDelete: (id: string) => void; // Chỉ nhận ID
  isOpen: boolean;
  dataType?: string;
  idSelected: string;
};

const WarningDeletePopup: React.FC<Props> = ({
  onClose,
  confirmDelete,
  isOpen,
  dataType,
  idSelected,
}) => {
  return (
    <div
      className={`modal-warning-overlay ${isOpen ? "open" : "close"}`}
      onClick={onClose}
    >
      <div
        className={`modal-delete ${isOpen ? "open" : "close"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Cảnh báo!</h1>
        <div className="form-input">
          <h2>Chắc chắn muốn xoá {dataType} ?</h2>
        </div>
        <div className="form-btn">
          <Button label="Huỷ" onClick={onClose} className="btn-exit" />
          <Button
            label="OK"
            onClick={() => confirmDelete(idSelected)}
            className="btn-delete"
          />
        </div>
      </div>
    </div>
  );
};

export default WarningDeletePopup;
