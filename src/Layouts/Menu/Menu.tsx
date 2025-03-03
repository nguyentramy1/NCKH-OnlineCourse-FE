import React, { useState } from "react";
import ToggleMenu from "../../Assets/Image/toggleMenu.svg";
import { useNavigate } from "react-router-dom";
import "./Menu.scss";
import { filterMenuItemsByRole, useMenuItems } from "./Hooks/useMenuItems";
import Arrow from "../../Assets/Image/ArrowDown.svg";
import { useDispatch } from "react-redux";
import { menuActions } from "../../Reduxs/OptionsMenu/OptionsMenuSlice";
import { useAppSelector } from "../../store";

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const [selectedSubItemIndexes, setSelectedSubItemIndexes] = useState<
    number[]
  >([]); // Mảng để lưu chỉ số subItem được chọn cho từng menu
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const currentMenuOption = useAppSelector(
    (state) => state.menuStore.indexOption,
  );

  const userRole = useAppSelector((state) => state.authStore.role); 
  

  const menuItems = useMenuItems();
  const filteredMenuItems = filterMenuItemsByRole(
    menuItems,
    userRole ,
  );

  const handleMenuOptions = (index: number) => {
    const item = filteredMenuItems[index];
    setIsOpen(true);
    if (item.subItems && item.subItems.length > 0) {
      // Nếu có subItems thì toggle mở/đóng
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else if (item.path) {
      // Nếu không có subItems, điều hướng trực tiếp
      console.log("Điều hướng đến:", item.path);
      navigate(item.path);
      dispatch(menuActions.setIndexOption(index));
    } else {
      console.log("Lỗi: Không có đường dẫn để điều hướng!");
    }
  };
  
  //  const toggleMenuOptions = (index: number) => {
  //     if (openIndexes.includes(index)) {
  //       setOpenIndexes(openIndexes.filter((i) => i !== index));
  //     } else {
  //       setOpenIndexes([...openIndexes, index]);
  //       setIsOpen(true);
  //     }
  //   };
 

  const handleSubItemClick = (
    path: string,
    index: number,
    subIndex: number,
  ) => {
    navigate(path);
    dispatch(menuActions.setIndexOption(index));

    // Cập nhật chỉ số của subItem được chọn cho menu cụ thể
    setSelectedSubItemIndexes((prev) => {
      // Tạo một mảng mới với tất cả giá trị là null
      const newSelectedIndexes = Array(filteredMenuItems.length).fill(null);
      newSelectedIndexes[index] = subIndex; // Lưu chỉ số subItem cho menu chính tương ứng
      return newSelectedIndexes;
    });
  };

  const toggleMenuBottom = () => {
    if (isOpen) {
      setOpenIndexes([]); 
      // setSelectedSubItemIndexes([]); // Reset khi đóng menu
    }
    setIsOpen((prev) => !prev);
    
    if (!isOpen) {
      setOpenIndexes([currentMenuOption ? currentMenuOption : 0]);
    }
  };

  return (
    <div className={`menu-container-${isOpen ? "open" : "closed"}`}>
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
             {item.arrow === true && <img src={Arrow} alt="arrow" />}
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
                  } `}
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
        <img src={ToggleMenu} alt="Menu" onClick={toggleMenuBottom} />
      </div>
    </div>
  );
};

export default Menu;
