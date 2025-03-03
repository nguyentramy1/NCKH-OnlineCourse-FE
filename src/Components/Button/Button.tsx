import React, { ReactNode } from "react";
import "./Button.scss";

type ButtonProps = {
  onClick: () => void;
  label: ReactNode | React.JSX.Element;
  dis?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ onClick, label, dis, className }) => {
  return (
    <button
      className={`custom-btn ${className ? className : ""}`}
      onClick={onClick}
      disabled={dis}
    >
      <div className="label">{label}</div>
    </button>
  );
};

export default Button;
