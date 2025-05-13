import React, { useState } from "react";
import "./CourseUser.scss";
import { Clock } from "lucide-react"; // Icon đồng hồ cho thời gian
import imgDefaul from "../../Assets/Image/Logo.svg";
import useOneCourseData from "../Course/Hooks/GetOneCourse";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "../Error/error-page";
import { useDispatch } from "react-redux";
import { CurrentActions } from "../../Reduxs/CurrentSlice";
import { useAppSelector } from "../../store";
import { apiResponse, nullData, QR } from "../../AxiosConfig/DataType";
import { apiService } from "../../AxiosConfig/apiService";
import { noticeActions } from "../../Reduxs/Notification/Notification";

const CourseStudy = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const idCourse = useAppSelector((state) => state.CurrentStore.idCourse);
  const [loadingadd, setLoadingadd] = useState(false);
  const { CourseData, loading } = useOneCourseData(idCourse);

  console.log("id", id);
  console.log("Couser", idCourse);

  if (!id) {
    return (
      <div>
        <ErrorPage />
      </div>
    );
  } else {
    dispatch(CurrentActions.setCurrent(id));
  }

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (!CourseData) {
    return <div className="not-found">Khóa học không tồn tại</div>;
  }

  return (
    <div className="course-user-container">
      <div className="course-user">
        {/* Phần tiêu đề khóa học với hiệu ứng lấp lánh */}
        <h1 className="course-title">{CourseData.title}</h1>

        {/* Phần hiển thị video với viền gradient */}
        <div className="course-video">
          {CourseData.video ? (
            <video controls className="video-player">
              <source src={CourseData.video} type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ video.
            </video>
          ) : (
            <div className="video-placeholder">
              <img src={imgDefaul} alt="Video không khả dụng" />
              <p>Video hiện không khả dụng</p>
            </div>
          )}
        </div>

        {/* Phần nội dung mô tả video */}
        <div className="course-content-video">
          <h2>Nội dung video</h2>
          <p>
            {CourseData.contentVideo || "Chưa có nội dung mô tả cho video."}
          </p>
        </div>

        {/* Phần thông tin chi tiết khóa học */}
        <div className="course-info">
          <div className="course-image">
            <img
              src={CourseData.image || imgDefaul}
              alt={CourseData.title}
              className="course-img"
            />
          </div>
          <div className="course-details">
            <p>
              <strong>Mô tả:</strong>{" "}
              {CourseData.description || "Chưa có mô tả."}
            </p>
            <p>
              <strong>Giảng viên:</strong>{" "}
              {CourseData.instructorInfo || "Không xác định"}
            </p>
            <p>
              <strong>Giá:</strong> {CourseData.price.toLocaleString()} VNĐ
            </p>
            <p>
              <strong>Cấp độ:</strong> {CourseData.level || "Không xác định"}
            </p>
            <p className="duration">
              <Clock size={16} /> <strong>Thời lượng:</strong>{" "}
              {CourseData.duration || "Không xác định"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseStudy;
