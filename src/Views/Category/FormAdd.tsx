import React, { useState } from "react";
import Button from "../../Components/Button/Button";
import { apiResponse, nullData } from "../../AxiosConfig/DataType";
import { apiService } from "../../AxiosConfig/apiService";
import { setTokenHeader } from "../../AxiosConfig/axiosConfig";
import { useDispatch } from "react-redux";
import { noticeActions } from "../../Reduxs/Notification/Notification";
import "./Form.scss";
import { Input } from "antd";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  refetch: () => void;
};

const FormAddCategory: React.FC<Props> = ({ onClose, isOpen, refetch }) => {
  const [Name, setName] = useState<string>("");

  const dispatch = useDispatch(); // Sử dụng useDispatch để gọi action

  const handleOnchange = () => {
    AddCategory();
    console.log("addCategorydta ", data);
  };
  const ClosedModal = () => {
    setName(""); // Reset Name
    onClose();
  };

  const data = {
    Name: Name,
  };

  const AddCategory = async () => {
    setTokenHeader(sessionStorage.getItem("token"));

    try {
      console.log("adddta ", data);
      const response = (await apiService.addCategory(
        data
      )) as unknown as apiResponse<nullData>;
      if (!response) {
        throw new Error("Network response was not ok");
      }

      // Gọi action để hiển thị thông báo
      dispatch(
        noticeActions.setNotificationSuccess("Add Category successfully")
      );
      dispatch(noticeActions.setIsShowNoticeSuccess(true));
    } catch (error) {
      console.error("Erorr message:", error);
      let message = "Có lỗi xảy ra!";
      if (error && typeof error === "object" && "message" in error) {
        message = (error as Error).message;
      }
      dispatch(noticeActions.setNotification(message));
      dispatch(noticeActions.setIsShowNotice(true));
    } finally {
      refetch();
      ClosedModal();
    }
  };

  return (
    <div className="Add-Expense">
      <div
        className={`overlay ${isOpen ? "open" : "close"}`}
        onClick={ClosedModal}
      >
        <div
          className={`modal ${isOpen ? "open" : "close"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <h1>Tạo danh mục</h1>
          <div className="form-container">
            <div className="form-input">
              <div className="input-colum">
                <div className="item-input">
                  <h2>
                    Tên danh mục<span style={{ color: "red" }}>*</span>
                  </h2>
                  <Input
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: "200px" }}
                    placeholder="Nhập tên danh mục"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-btn">
            <Button label="Hủy" onClick={ClosedModal} className="btn-exit" />
            <Button
              label="Tạo"
              onClick={handleOnchange}
              className="btn-delete"
              dis={Name === ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddCategory;
