import React, { useState } from "react";
import Button from "../../Components/Button/Button";
import { apiResponse, nullData } from "../../AxiosConfig/DataType";
import { apiService } from "../../AxiosConfig/apiService";
import { setTokenHeader } from "../../AxiosConfig/axiosConfig";
import { useDispatch } from "react-redux";
import { noticeActions } from "../../Reduxs/Notification/Notification";
import "./Form.scss";
import { Input } from "antd";
import useOneCategoryData from "./Hooks/GetOneCategory";
import { loadingActions } from "../../Reduxs/LoadingSlice";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  id: string;
};

const FormUpdateCategory: React.FC<Props> = ({ onClose, isOpen, id }) => {
  const [name, setName] = useState<string>("");
  const { CategoryData, loading } = useOneCategoryData(id);
  const dispatch = useDispatch();

  // Đóng modal và reset giá trị input
  const closeModal = () => {
    setName("");
    onClose();
  };

  // Cập nhật danh mục qua API
  const updateCategory = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      dispatch(noticeActions.setNotification("Token không hợp lệ!"));
      dispatch(noticeActions.setIsShowNotice(true));
      return;
    }

    setTokenHeader(token);
    const data = { Name: name || "" };

    try {
      dispatch(loadingActions.setloading(true));
      const response = (await apiService.editCategory(
        id,
        data
      )) as unknown as apiResponse<nullData>;
      if (!response) {
        throw new Error("Phản hồi mạng không hợp lệ");
      }

      dispatch(
        noticeActions.setNotificationSuccess("Cập nhật danh mục thành công")
      );
      dispatch(noticeActions.setIsShowNoticeSuccess(true));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Có lỗi xảy ra!";
      dispatch(noticeActions.setNotification(message));
      dispatch(noticeActions.setIsShowNotice(true));
    } finally {
      dispatch(loadingActions.setloading(false));
      closeModal();
    }
  };

  // Xử lý sự kiện cập nhật
  const handleUpdate = () => {
    updateCategory();
  };

  return (
    <div className="Add-Expense">
      <div
        className={`overlay ${isOpen ? "open" : "close"}`}
        onClick={closeModal}
      >
        <div
          className={`modal ${isOpen ? "open" : "close"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <h1>Cập nhật danh mục</h1>
          <div className="form-container">
            <div className="form-input">
              <div className="input-colum">
                <div className="item-input">
                  <h2>
                    Tên danh mục<span style={{ color: "red" }}>*</span>
                  </h2>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: "200px" }}
                    placeholder="Nhập tên danh mục"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-btn">
            <Button label="Hủy" onClick={closeModal} className="btn-exit" />
            <Button
              label="Cập nhật"
              onClick={handleUpdate}
              className="btn-delete"
              dis={name === "" || loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormUpdateCategory;
