import React, { ReactNode, useState } from "react";
import "./Input.scss";
import Img from "../../Assets/Image/search_icon.png";

type Props = {
  placeHolder: string;
  value?: string;
  onChange?: (e: string) => void;
  onChangeNumber?: (e: number) => void;
  require?: boolean;
  className?: string;
  optional?: ReactNode;
  onEnterPress?: () => void;
  type?: string;
  disable?: boolean;
};

const Input: React.FC<Props> = ({
  onChange,
  onChangeNumber,
  placeHolder,
  value = "",
  require,
  className = "",
  onEnterPress,
  type,
  disable,
  optional,
}) => {
  const [isFocus, setFocus] = useState(false);
  const isDateInput = type === "date";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (onChange) {
      onChange(inputValue);
    }

    if (onChangeNumber) {
      const numberValue = Number(inputValue);
      if (!isNaN(numberValue)) {
        onChangeNumber(numberValue);
      } else {
        onChangeNumber(0);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnterPress) {
      onEnterPress();
    }
  };

  return (
    <div
      className={`input-container ${disable ? "" : "not-disable"} ${
        isFocus ? "input-focus" : ""
      } ${className ? className : ""}`}
    >
      <img src={Img} alt="icon" />
      <input
        type={isDateInput && !value ? "text" : type} // Chuyển đổi type khi rỗng
        onFocus={(e) => {
          setFocus(true);
          if (isDateInput) e.target.type = "date"; // Khi focus, hiển thị dạng date
        }}
        onBlur={(e) => {
          setFocus(false);
          if (isDateInput && !value) e.target.type = "text"; // Khi blur, nếu rỗng, trở về dạng text
        }}
        onKeyDown={handleKeyDown}
        placeholder={isDateInput && !value ? placeHolder : ""} // Chỉ hiển thị placeholder nếu chưa nhập giá trị
        onChange={handleChange}
        value={value}
        required={require}
        disabled={disable}
      />
      {optional ? optional : <></>}
    </div>
  );
};

export default Input;
