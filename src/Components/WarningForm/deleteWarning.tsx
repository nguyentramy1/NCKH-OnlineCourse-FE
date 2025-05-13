import React, { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import { apiResponse, nullData } from "../../AxiosConfig/DataType";
import { apiService } from "../../AxiosConfig/apiService";
import { setTokenHeader } from "../../AxiosConfig/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { noticeActions } from "../../Reduxs/Notification/Notification";
import "./DeleteForm.scss";
import { loadingActions } from "../../Reduxs/LoadingSlice";
type Props = {
  onClose: () => void;
  isOpen: boolean;
  dataType?: string; //bảng lương || khác
  id: string;
};

const Warning: React.FC<Props> = ({ onClose, isOpen, dataType, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Sử dụng useDispatch để gọi action

  const handleOnchange = () => {
    if (dataType === "danh mục") {
      DeleteCategory();
    } else if (dataType === "Khóa học") {
      DeleteCourse();
    }
  };

  const DeleteCategory = async () => {
    try {
      dispatch(loadingActions.setloading(true));
      const response = (await apiService.DeleteCategory(
        id
      )) as unknown as apiResponse<nullData>;
      if (!response) {
        throw new Error("Network response was not ok");
      }
      onClose();
      // Gọi action để hiển thị thông báo
      dispatch(
        noticeActions.setNotificationSuccess("Xóa danh mục thành công !")
      );
      dispatch(noticeActions.setIsShowNoticeSuccess(true));
    } catch (error) {
      console.error("Error:", error);
      // Sử dụng type assertion cho error
      dispatch(noticeActions.setNotification("Xóa danh mục thất bại"));
      dispatch(noticeActions.setIsShowNotice(true));
    } finally {
      dispatch(loadingActions.setloading(false));
      onClose();
    }
  };

  const DeleteCourse = async () => {
    try {
      dispatch(loadingActions.setloading(true));
      const response = (await apiService.DeleteCourse(
        id
      )) as unknown as apiResponse<nullData>;
      if (!response) {
        throw new Error("Network response was not ok");
      }
      onClose();
      // Gọi action để hiển thị thông báo
      dispatch(
        noticeActions.setNotificationSuccess("Xóa danh mục thành công !")
      );
      dispatch(noticeActions.setIsShowNoticeSuccess(true));
    } catch (error) {
      console.error("Error:", error);
      // Sử dụng type assertion cho error
      dispatch(noticeActions.setNotification("Xóa danh mục thất bại"));
      dispatch(noticeActions.setIsShowNotice(true));
    } finally {
      dispatch(loadingActions.setloading(false));
      onClose();
    }
  };

  return (
    <div className="Noti">
      <div className={`overlay ${isOpen ? "open" : "close"}`} onClick={onClose}>
        <div
          className={`modal ${isOpen ? "open" : "close"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <h1>Thông báo !</h1>
          <div className="form-input">
            <h2>
              Bạn có chắc chắn muốn xoá {dataType ? dataType : "thông tin"} này
              không?
            </h2>
          </div>
          <div className="form-btn">
            <Button label="Thoát" onClick={onClose} className="btn-exit" />
            <Button
              label="OK"
              onClick={handleOnchange}
              className="btn-delete"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Warning;
