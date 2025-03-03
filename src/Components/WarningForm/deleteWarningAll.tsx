import React, { useState } from "react";
import Button from "../../Components/Button/Button";
import "./DeleteForm.scss";
import Notification from "../NotifiicationForm";
import { useDispatch } from "react-redux";
import { setTokenHeader } from "../../AxiosConfig/axiosConfig";
import { apiService } from "../../AxiosConfig/apiService";
import { apiResponse, nullData } from "../../AxiosConfig/DataType";

import { noticeActions } from "../../Reduxs/Notification/Notification";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  dataType?: string;
  selectedIds: number[]; // Danh sách ID đã chọn
  object: string;
  id?: number;
};

const DeleteWarningALL: React.FC<Props> = ({
  onClose,
  isOpen,
  dataType,
  selectedIds,
  id,
}) => {
  const dispatch = useDispatch();
  const [isNotiVisible, setIsNotiVisible] = useState(false);
  const [Noti, setNoti] = useState<string>("");
  const handleDeleteConfirmed = () => {
    // console.log("Dữ liệu được chọn để xóa:", selectedIds);
    if (dataType === "bảng lương") {
      deleteSalary();
    } else if (id && dataType !== "bảng lương") {
      DeleteEmployee(id);
    }
    onClose();
  };
  const dataforSalary = {
    salaryIds: selectedIds,
  };
  const dataforDetail = {
    employeeIds: selectedIds,
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
      dispatch(noticeActions.setNotification("Xoá  nhân viên thành công"));
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

      dispatch(noticeActions.setNotification(String(error)));
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
          <h1>Thông báo!</h1>
          <div className="form-input">
            <h2>
              Bạn có chắc chắn muốn xoá toàn bộ{" "}
              {dataType ? dataType : "thông tin đã chọn"} không?
            </h2>
          </div>
          <div className="form-btn">
            <Button label="Thoát" onClick={onClose} className="btn-exit" />
            <Button
              label="OK"
              onClick={handleDeleteConfirmed} // Gọi hàm xóa khi nhấn OK
              className="btn-delete"
            />
            <Notification
              isOpen={isNotiVisible}
              onClose={() => setIsNotiVisible(false)}
              Notification={Noti}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteWarningALL;
