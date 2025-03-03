import React, { useState, useRef } from "react";
import "./DropDownField.scss";
import Button from "../Button/Button";
import useClickOutSide from "./hooks/useClickOutSide";
import Remove from "../../Assets/Svg/remove.svg";
import Input from "../Input/Input";
import { optionType } from "./DropDownField";

interface InputDropdownProps {
  className?: string;
  options: optionType[];
  onChange: (e: optionType[]) => void; // Thay đổi kiểu dữ liệu cho onChange
  selected: optionType[]; // Thay đổi từ string sang mảng optionType
  placeHolder: string;
  disable?: boolean;
  unSelect?: boolean;
  search?: boolean;
}

const MultiSelectDrop: React.FC<InputDropdownProps> = ({
  className,
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
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu giá trị tìm kiếm

  useClickOutSide(dropdownRef, setIsDropdownOpen);

  const handleOptionSelect = (option: optionType) => {
    const isSelected = selected.some(
      (selectedOption) => selectedOption.value === option.value,
    );
    let newSelectedOptions;

    if (isSelected) {
      // Nếu đã chọn, loại bỏ tùy chọn
      newSelectedOptions = selected.filter(
        (selectedOption) => selectedOption.value !== option.value,
      );
    } else {
      // Nếu chưa chọn, thêm tùy chọn
      newSelectedOptions = [...selected, option];
    }

    onChange(newSelectedOptions); // Cập nhật giá trị cho parent component
  };

  // Lọc các tùy chọn dựa trên giá trị tìm kiếm
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <div
        className={`input-dropdown ${disable ? "disable" : ""} ${className}`}
        ref={dropdownRef}
      >
        <div className="container-dropfield">
          <Button
            className={`input-show ${
              isDropdownOpen ? "input-show-open" : "input-show-close"
            } ${!disable ? "no-disable" : ""}`}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            label={
              <div className="flex-between">
                <div
                  className="selected-text"
                  style={{
                    opacity: disable ? "0.6" : selected.length ? "1" : "0.6",
                    overflow: "hidden",
                    maxHeight: "38px",
                    maxWidth: "250px",
                  }}
                >
                  {selected.length
                    ? selected.map((option) => option.label).join(", ")
                    : placeHolder}
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
              onChange={(e) => setSearchTerm(e)} // Sửa lại cách gọi onChange
            />
          )}
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={
                selected.some(
                  (selectedOption) => selectedOption.value === option.value,
                )
                  ? "selected-option"
                  : ""
              }
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
      {unSelect && (
        <img
          src={Remove}
          alt="remove"
          className={`icon-remove ${selected.length ? "selected" : "unselect"}`}
          onClick={() => onChange([])} // Xóa tất cả tùy chọn
        />
      )}
    </>
  );
};

export default MultiSelectDrop;
