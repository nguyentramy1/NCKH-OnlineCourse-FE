import React, { ReactNode, useState } from "react";
import "./Input.scss";
import { Eye, EyeOff } from "lucide-react"; // Import icon từ Lucide

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

const InputPassword: React.FC<Props> = ({
  onChange,
  onChangeNumber,
  placeHolder,
  value = "",
  require,
  className = "",
  onEnterPress,
  type = "password",
  disable,
  optional,
}) => {
  const [isFocus, setFocus] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const onBlur = () => setFocus(false);
  const onFocus = () => setFocus(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (onChange) {
      onChange(inputValue);
    }

    if (onChangeNumber) {
      const numberValue = Number(inputValue);
      onChangeNumber(!isNaN(numberValue) ? numberValue : 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnterPress) {
      onEnterPress();
    }
  };

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div
      className={`input-container ${disable ? "" : "not-disable"} ${
        isFocus ? "input-focus" : ""
      } ${className ? className : ""}`}
    >
      <input
        type={isVisible ? "text" : "password"}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeHolder}
        onChange={handleChange}
        value={value}
        required={require}
        disabled={disable}
      />
      <span className="visibility-toggle" onClick={toggleVisibility}>
        {isVisible ? (
          <Eye size={20} className="visibility-icon" />
        ) : (
          <EyeOff size={20} className="visibility-icon" />
        )}
      </span>
      {optional ? optional : <></>}
    </div>
  );
};

export default InputPassword;
