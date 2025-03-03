import React, { useState, useRef, useEffect } from "react";
import "./DropDown.scss";
import Button from "../../Button/Button";
import useOnChange from "./hooks/useOnChange";
import useClickOutSide from "./hooks/useClickOutSide";

export interface optionType {
  value: any;
  label: string;
}

interface InputDropdownProps {
  options: optionType[];
  onChange: (e: optionType) => void;
  selected: string | undefined;
  placeHolder: string;
  disable?: boolean;
}

const DropDownField: React.FC<InputDropdownProps> = ({
  options,
  onChange,
  selected,
  placeHolder,
  disable,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    selected,
  );

  // Tính toán chiều cao của dropdown
  const [dropdownHeight, setDropdownHeight] = useState<number>(0);
  const optionHeight = 45; // Chiều cao trung bình của mỗi option
  const maxVisibleOptions = 3; // Số option tối đa hiển thị
  const totalOptions = options.length;

  useEffect(() => {
    if (isDropdownOpen) {
      const height = Math.min(totalOptions, maxVisibleOptions) * optionHeight;
      setDropdownHeight(height);
    }
  }, [isDropdownOpen, options]);

  const { handleOptionSelect, toggleDropdown } = useOnChange(
    setIsDropdownOpen,
    onChange,
    setSelectedOption,
  );
  useClickOutSide(dropdownRef, setIsDropdownOpen);

  return (
    <div className="input-dropdown" ref={dropdownRef}>
      <Button
        className={`input-show ${
          isDropdownOpen ? "input-show-open" : "input-show-close"
        }`}
        onClick={toggleDropdown}
        label={
          <div className="flex-between">
            <div
              className="selected-text"
              style={{ opacity: selected ? "1" : "0.5" }}
            >
              {selected ? selected : placeHolder}
            </div>
            <div className="dropdown">
              <div className={isDropdownOpen ? "icon-open" : "icon-close"}>
                <div className="drop-icon" />
              </div>
            </div>
          </div>
        }
        dis={disable}
      />

      <ul
        className={`dropdown-list ${
          isDropdownOpen ? "dropdown-list-open" : "dropdown-list-close"
        }`}
        style={{ maxHeight: `${dropdownHeight}px`, overflowY: "auto" }} // Áp dụng chiều cao tính toán
      >
        {options?.map((option, index) => (
          <li
            key={index}
            onClick={() => handleOptionSelect(option)}
            className={selectedOption === option.value ? "selected-option" : ""}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDownField;
