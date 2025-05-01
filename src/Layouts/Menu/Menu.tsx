import React, { useState } from "react";
import ToggleMenu from "../../Assets/Image/toggleMenu.svg";
import { useNavigate } from "react-router-dom";
import "./Menu.scss";
import { filterMenuItemsByRole, useMenuItems } from "./Hooks/useMenuItems";
import Arrow from "../../Assets/Image/ArrowDown.svg";
import { useDispatch } from "react-redux";
import { menuActions } from "../../Reduxs/OptionsMenu/OptionsMenuSlice";
import { useAppSelector } from "../../store";
import { ArrowLeft, ChevronDown, ChevronRight, ChevronUp } from "lucide-react";

// Định nghĩa interface cho props của Menu
interface MenuProps {
  className?: string; // className là tùy chọn
}

const Menu: React.FC<MenuProps> = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const [selectedSubItemIndexes, setSelectedSubItemIndexes] = useState<
    number[]
  >([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const currentMenuOption = useAppSelector(
    (state) => state.menuStore.indexOption
  );
  const userRole = useAppSelector((state) => state.authStore.role);

  const menuItems = useMenuItems();
  const filteredMenuItems = filterMenuItemsByRole(menuItems, userRole);

  const handleMenuOptions = (index: number) => {
    const item = filteredMenuItems[index];
    setIsOpen(true);
    if (item.subItems && item.subItems.length > 0) {
      setOpenIndexes((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else if (item.path) {
      console.log("Điều hướng đến:", item.path);
      navigate(item.path);
      dispatch(menuActions.setIndexOption(index));
    } else {
      console.log("Lỗi: Không có đường dẫn để điều hướng!");
    }
  };

  const handleSubItemClick = (
    path: string,
    index: number,
    subIndex: number
  ) => {
    navigate(path);
    dispatch(menuActions.setIndexOption(index));
    setSelectedSubItemIndexes((prev) => {
      const newSelectedIndexes = Array(filteredMenuItems.length).fill(null);
      newSelectedIndexes[index] = subIndex;
      return newSelectedIndexes;
    });
  };

  const toggleMenuBottom = () => {
    if (isOpen) {
      setOpenIndexes([]);
    }
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setOpenIndexes([currentMenuOption ? currentMenuOption : 0]);
    }
  };

  return (
    <div
      className={`menu-container-${isOpen ? "open" : "closed"} ${
        className || ""
      }`}
    >
      <div className={`menu-${isOpen ? "open" : "closed"}`}>
        {filteredMenuItems.map((item, index) => (
          <div key={index} className="menu-item">
            <div
              className="menu-title"
              onClick={() => handleMenuOptions(index)}
            >
              <div className="title">
                <span className="menu-icon">{item.icon}</span>
                <span className="label">{item.title}</span>
              </div>
              <span
                className={`arrow-${
                  openIndexes.includes(index) ? "icon-open" : "icon-close"
                }`}
              >
                {item.arrow === true && (
                  <div style={{ paddingRight: "3px" }}>
                    <ChevronUp size={18} className="arrow-icon" />
                  </div>
                )}
              </span>
            </div>

            <div
              className={`submenu-container-${
                openIndexes.includes(index) && item.subItems ? "open" : "closed"
              }`}
            >
              {item.subItems && (
                <div
                  className={`submenu-${
                    openIndexes.includes(index) && item.subItems
                      ? "open"
                      : "close"
                  }`}
                >
                  {item.subItems.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className={`submenu-item-${
                        openIndexes.includes(index) && item.subItems
                          ? "open"
                          : "close"
                      }`}
                    >
                      {subIndex < item.subItems?.length! - 1 && (
                        <div className="overlay" />
                      )}
                      <div
                        className={`title-text-${
                          openIndexes.includes(index) && item.subItems
                            ? "open"
                            : "close"
                        }`}
                        onClick={() =>
                          handleSubItemClick(subItem.path, index, subIndex)
                        }
                      >
                        <p
                          className={`text ${
                            selectedSubItemIndexes[index] === subIndex
                              ? "selected"
                              : ""
                          }`}
                        >
                          {subItem.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="icon-bottom-menu">
        <ArrowLeft
          size={24}
          className="icon"
          onClick={toggleMenuBottom}
          color="#0166FF"
        />
      </div>
    </div>
  );
};

export default Menu;
