import React, { useState, useRef } from "react";
import "./DropDownField.scss";
import Button from "../Button/Button";
import useOnChange from "./hooks/useOnChange";
import useClickOutSide from "./hooks/useClickOutSide";

import Input from "../Input/Input";

export interface optionType {
  value: any;
  label: string;
}

interface InputDropdownProps {
  className?: string;
  options: optionType[];
  onChange: (e: optionType | null) => void;
  selected: string | undefined;
  placeHolder: string;
  disable?: boolean;
  unSelect?: boolean;
  search?: boolean;
}

const DropDownField: React.FC<InputDropdownProps> = ({
  className = "",
  options,
  onChange,
  selected,
  placeHolder,
  disable,
  unSelect,
  search,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    selected
  );
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu giá trị tìm kiếm
  const { handleOptionSelect, toggleDropdown } = useOnChange(
    setIsDropdownOpen,
    onChange,
    setSelectedOption
  );
  useClickOutSide(dropdownRef, setIsDropdownOpen);

  const handleRemoveSelected = () => {
    setSelectedOption(undefined);
    onChange(null);
  };

  // Lọc các tùy chọn dựa trên giá trị tìm kiếm
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={`input-dropdown ${className}`} ref={dropdownRef}>
        <div className="container-dropfield">
          <Button
            className={`input-show ${
              isDropdownOpen ? "input-show-open" : "input-show-close"
            } ${!disable ? "no-disable" : ""}`}
            onClick={toggleDropdown}
            label={
              <div className="flex-between">
                <div
                  className="selected-text"
                  style={{ opacity: disable ? "0.6" : selected ? "1" : "0.6" }}
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
        </div>

        <ul
          className={`dropdown-list ${
            isDropdownOpen ? "dropdown-list-open" : "dropdown-list-close"
          }`}
        >
          {/* Input tìm kiếm */}
          {search && (
            <Input
              className="search-in-drop"
              placeHolder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e)}
            />
          )}
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={
                selectedOption === option.value ? "selected-option" : ""
              }
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
      {/* {unSelect && (
        <img
          src={Remove}
          alt="remove"
          className={`icon-remove ${selected ? "selected" : "unselect"}`}
          onClick={handleRemoveSelected}
        />
      )} */}
    </>
  );
};

export default DropDownField;
