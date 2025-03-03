import React, { useState, useRef, useEffect } from "react";
import "./DropDown.scss";
import Button from "../../Button/Button";
import useClickOutSide from "./hooks/useClickOutSide";

export interface optionType {
  value: any;
  label: string;
}

interface InputDropdownProps {
  options: optionType[];
  onChange: (selectedOptions: optionType[]) => void; // Hàm để cập nhật tùy chọn đã chọn
  selected: optionType[]; // Mảng các tùy chọn đã chọn
  placeHolder: string; // Placeholder cho dropdown
  disable?: boolean; // Tùy chọn để vô hiệu hóa dropdown
}

const MultiDropDown: React.FC<InputDropdownProps> = ({
  options,
  onChange,
  selected,
  placeHolder,
  disable,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<optionType[]>(
    selected || [],
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

  const toggleOption = (option: optionType) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((o) => o !== option) // Bỏ chọn
      : [...selectedOptions, option]; // Chọn mới
    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions); // Gọi lại hàm onChange
  };

  useClickOutSide(dropdownRef, setIsDropdownOpen);

  return (
    <div className="input-dropdown" ref={dropdownRef}>
      <Button
        className={`input-show ${
          isDropdownOpen ? "input-show-open" : "input-show-close"
        }`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        label={
          <div className="flex-between">
            <div
              className="selected-text"
              style={{ opacity: selectedOptions.length ? "1" : "0.5" }}
            >
              {selectedOptions.length
                ? selectedOptions
                    .slice(0, 2)
                    .map((option) => option.label)
                    .join(", ") + (selectedOptions.length > 2 ? `, ...` : "")
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

      <ul
        className={`dropdown-list ${
          isDropdownOpen ? "dropdown-list-open" : "dropdown-list-close"
        }`}
        style={{ maxHeight: `${dropdownHeight}px`, overflowY: "auto" }} // Áp dụng chiều cao tính toán
      >
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => toggleOption(option)}
            style={{ display: "flex", alignItems: "center", padding: "10px" }} // Căn giữa và thêm khoảng cách
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div
                className="label-text"
                style={{ width: "100%" }}
                onClick={() => toggleOption(option)}
              >
                {option.label}
              </div>
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                style={{ marginLeft: "10px" }} // Khoảng cách giữa nhãn và checkbox
                onChange={() => toggleOption(option)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultiDropDown;
