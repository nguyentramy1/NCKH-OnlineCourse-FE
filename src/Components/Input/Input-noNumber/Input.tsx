import React, { useState } from "react";
import "./Input.scss";
import Img from "../../../Assets/Image/search_icon.png";

type Props = {
  placeHolder: string;
  value?: string;
  onChange: (e: any) => void;
  require?: boolean;
  className?: string;
  onEnterPress?: () => void;
  type?: string;
  disable?: boolean;
};

const Input: React.FC<Props> = ({
  onChange,
  placeHolder,
  value,
  require,
  className,
  onEnterPress,
  type,
  disable,
}) => {
  const [isFocus, setFocus] = useState(false);
  const onBlur = () => setFocus(false);
  const onFocus = () => setFocus(true);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnterPress) {
      onEnterPress();
    }
  };

  return (
    <div
      className={`input-my-container ${isFocus ? "input-focus" : ""} ${
        className ? className : ""
      }`}
      style={{ opacity: value ? "1" : "0.7" }}
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
    </div>
  );
};

export default Input;
