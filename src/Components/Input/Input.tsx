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
  const onBlur = () => setFocus(false);
  const onFocus = () => setFocus(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value; // Trim giá trị nhập vào

    // Gọi onChange nếu có
    if (onChange) {
      onChange(inputValue);
    }

    // Gọi onChangeNumber nếu có và nếu có thể chuyển đổi sang số
    if (onChangeNumber) {
      const numberValue = Number(inputValue);
      if (!isNaN(numberValue)) {
        onChangeNumber(numberValue); // Gọi hàm với giá trị số
      } else {
        onChangeNumber(0); // Hoặc một giá trị mặc định nếu không phải số
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
        type={type}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeHolder}
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
