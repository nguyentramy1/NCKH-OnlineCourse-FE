import React, { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import { apiResponse, nullData } from "../../AxiosConfig/DataType";
import { apiService } from "../../AxiosConfig/apiService";
import { setTokenHeader } from "../../AxiosConfig/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { noticeActions } from "../../Reduxs/Notification/Notification";
import "./DeleteForm.scss";
type Props = {
  onClose: () => void;
  isOpen: boolean;
  dataType?: string; //bảng lương || khác
  iditem: number[];
  id?: number;
};

const Warning: React.FC<Props> = ({
  onClose,
  isOpen,
  dataType,
  iditem,
  id,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Sử dụng useDispatch để gọi action

  const handleOnchange = () => {
    console.log(iditem);
    if (dataType === "bảng lương") {
      deleteSalary();
    } else if (id && dataType !== "bảng lương") {
      DeleteEmployee(id);
    }
    onClose();
  };
  const dataforSalary = {
    salaryIds: iditem,
  };
  const dataforDetail = {
    employeeIds: iditem,
  };
  const deleteSalary = async () => {
    setTokenHeader(sessionStorage.getItem("token"));
    try {
      const response = (await apiService.deleteSalary(
        dataforSalary,
      )) as unknown as apiResponse<nullData>;
      if (!response) {
        throw new Error("Network response was not ok");
      }
      onClose();

      // Gọi action để hiển thị thông báo
      dispatch(
        noticeActions.setNotificationSuccess("Xoá bảng lương thành công"),
      );
      dispatch(noticeActions.setIsShowNoticeSuccess(true));
      // dispatch(setMessage("Xoá bảng lương thành công"));
      // dispatch(setIsVisible(true));
    } catch (error) {
      console.error("Lỗi delete bảng lương:", error);
      // Sử dụng type assertion cho error
      dispatch(
        noticeActions.setNotification("Xoá bảng lương không thành công"),
      );
      dispatch(noticeActions.setIsShowNotice(true));
    } finally {
    }
  };

  const DeleteEmployee = async (id: number) => {
    setTokenHeader(sessionStorage.getItem("token"));
    try {
      const response = (await apiService.deleteSalaryDetail(
        id,
        dataforDetail,
      )) as unknown as apiResponse<nullData>;

      if (!response) {
        throw new Error("Network response was not ok");
      }
      onClose();

      dispatch(
        noticeActions.setNotificationSuccess("Xoá  nhân viên thành công"),
      );
      dispatch(noticeActions.setIsShowNoticeSuccess(true));
      // dispatch(setMessage("Xoá  nhân viên thành công"));
      // dispatch(setIsVisible(true));
    } catch (error) {
      console.error("Lỗi delete nhân viên trong chi tiết bảng lương:", error);
      // Sử dụng type assertion cho error

      dispatch(
        noticeActions.setNotification("Xoá  nhân viên không thành công"),
      );
      dispatch(noticeActions.setIsShowNotice(true));
      // dispatch(setIsVisible(true));
    } finally {
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
