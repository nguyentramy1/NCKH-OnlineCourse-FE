import React, { ReactNode, useState } from "react";
import "./Input.scss";
import { Search } from "lucide-react";

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
  as?: "input" | "textarea";
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
  as = "input", // Mặc định là input
}) => {
  const [isFocus, setFocus] = useState(false);
  const onBlur = () => setFocus(false);
  const onFocus = () => setFocus(true);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      <Search className="search-icon" size={20} />
      {as === "textarea" ? (
        <textarea
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeHolder}
          onChange={handleChange}
          value={value}
          required={require}
          disabled={disable}
          className="custom-textarea"
        />
      ) : (
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
      )}
      {optional ? optional : <></>}
    </div>
  );
};

export default Input;
