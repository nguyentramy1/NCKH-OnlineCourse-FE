import { Dispatch, SetStateAction } from "react";
import { optionType } from "../DropDownField";

const useOnChange = (
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>,
  onChange: (e: optionType) => void,
  setSelectedOption: any,
) => {
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionSelect = (option: optionType) => {
    setSelectedOption(option.value);
    onChange(option);
    setIsDropdownOpen(false);
  };

  return { toggleDropdown, handleOptionSelect };
};

export default useOnChange;
