import React, { useState } from "react";
import Input from "../Input/Input";
import DropDownField, { optionType } from "../FieldDropDown/DropDownField";
import Button from "../Button/Button";
import "./FormDropDown.scss";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

const FormDropDown: React.FC<Props> = ({ onClose, isOpen }) => {
  const [selected1, setSelected1] = useState<optionType | null>(null);

  const handleOnchange = () => {
    console.log("a");
  };

  const newArr = new Array(10).fill(null);
  const fakeOptions1 = newArr.map((_, index) => ({
    value: `option${index}`,
    label: `Lựa chọn số ${index}`,
  }));

  return (
    <div
      className={`modal-overlay ${isOpen ? "open" : "close"}`}
      onClick={onClose}
    >
      <div
        className={`modal-content ${isOpen ? "open" : "close"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Thêm mới bảng lương</h1>
        <div className="form-input">
          <div className="enter-text">
            <h2>
              Tên bảng lương <p>*</p>
            </h2>
            <Input
              placeHolder="Nhập tên bảng lương"
              onChange={handleOnchange}
              className="custom-input"
            />
          </div>
          <div className="drop-option">
            <h2>
              Kỳ lương<p>*</p>
            </h2>
            <div className="drop-field-salary">
              <DropDownField
                options={fakeOptions1}
                onChange={setSelected1}
                selected={selected1?.label}
                placeHolder="Chọn Option"
              />
            </div>
          </div>
        </div>
        <div className="form-btn">
          <Button label="Thoát" onClick={onClose} className="btn-exit" />
          <Button label="Lưu" onClick={handleOnchange} className="btn-save" />
        </div>
      </div>
    </div>
  );
};

export default FormDropDown;
