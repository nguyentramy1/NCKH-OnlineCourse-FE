import React, { useState } from "react";
import "./Card.scss";
import imgDefaul from "../../Assets/Image/Logo.svg";
import { Clock, Edit, Trash2 } from "lucide-react";
import { useAppDispatch } from "../../store";
import { FormStateActions } from "../../Reduxs/FormState/FormStateSlice";
import { apiService } from "../../AxiosConfig/apiService";
import { apiResponse, nullData } from "../../AxiosConfig/DataType";
import { loadingActions } from "../../Reduxs/LoadingSlice";
import { noticeActions } from "../../Reduxs/Notification/Notification";

interface CardProps {
  data: {
    userId: string;
    courseId: string;
    addedAt: string;
    price: number;
  };
  onClick?: () => void;
  role?: string;
  needDelete?: boolean;
}

const Cardlong: React.FC<CardProps> = ({ data, onClick, role, needDelete }) => {
  const [logoError, setLogoError] = useState(false);
  const dispatch = useAppDispatch();
  const handleEdit = () => {
    dispatch(FormStateActions.setEditCourse(true));
    dispatch(FormStateActions.setidEditCourse(data.courseId));
  };
  const Delete = async () => {
    try {
      dispatch(loadingActions.setloading(true));
      const response = (await apiService.DeleteCategory(
        data.courseId
      )) as unknown as apiResponse<nullData>;
      if (!response) {
        throw new Error("Network response was not ok");
      }

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
    }
  };
  return (
    <div
      className="card-long"
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className="card-long-layout">
        {/* Phần ảnh bên trái */}
        <div className="card-long-img" onClick={onClick}>
          {logoError ? (
            // <img src={imgDefaul} alt={data.title} />
            <img src={imgDefaul} />
          ) : (
            // <img
            //   src={data.image}
            //   alt={data.title}
            //   onError={() => setLogoError(true)}
            // />
            <img src={imgDefaul} onError={() => setLogoError(true)} />
          )}
        </div>

        {/* Phần thông tin bên phải */}
        <div className="card-long-infor">
          <div className="infor-wrap">
            <h3>{data.courseId || "Null"}</h3>
            <p className="duration">
              <Clock size={14} className="duration-icon" />
              {data.addedAt || "Null"}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: "20px",
                gap: "50px",
              }}
            >
              <p className="instructor">{data.courseId || "Null"}</p>
              <p className="price">
                <span className="currency">đ</span>
                {data.price !== undefined && data.price !== null
                  ? new Intl.NumberFormat("vi-VN").format(data.price)
                  : "0.00"}
              </p>
            </div>
            {needDelete && (
              <div className="card-long-actions">
                <Trash2 onClick={Delete} size={24} color="red" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cardlong;
