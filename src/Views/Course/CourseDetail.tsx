import React from "react";
import "./CourseDetail.scss";
import { Clock } from "lucide-react"; // Icon đồng hồ cho thời gian
import imgDefaul from "../../Assets/Image/Logo.svg";
import useOneCourseData from "./Hooks/GetOneCourse";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "../Error/error-page";
import { useDispatch } from "react-redux";
import { CurrentCourseActions } from "../../Reduxs/CurrentCourseSlice";
import { useAppSelector } from "../../store";

const Course = () => {
  const { id } = useParams();
  const { CourseData, loading } = useOneCourseData(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const idCourse = useAppSelector((state) => state.CurrentCourseStore.idCourse);
  // Kiểm tra nếu id không tồn tại
  if (!id) {
    return (
      <div>
        <ErrorPage />
      </div>
    );
  } else {
    dispatch(CurrentCourseActions.setCurrentCourse(id));
  }

  console.log("CurrentCourseActions", idCourse);

  // Kiểm tra trạng thái loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Kiểm tra nếu không tìm thấy khóa học
  if (!CourseData) {
    return <div>Khóa học không tồn tại</div>;
  }

  return (
    <div className="course-detail-container">
      <div className="course-detail">
        <div className="course-content">
          <h3 className="course-title">
            {CourseData ? CourseData.title : "Null"}
          </h3>
          <div className="course-meta">
            <span className="course-duration">
              <Clock size={14} className="clock-icon" />
              {CourseData ? CourseData.duration : "Null"}
            </span>
          </div>
          <p className="course-author">
            {CourseData ? CourseData.instructorInfo : "Null"}
          </p>
          <p className="course-description">
            {CourseData ? CourseData.description : "Null"}
          </p>
        </div>
        <div className="course-image">
          <img
            src={CourseData ? CourseData.image : imgDefaul}
            alt="SQL Advanced"
          />
        </div>
        <div className="course-price">
          <span className="currency">đ</span>
          {CourseData?.price !== undefined && CourseData.price !== null
            ? new Intl.NumberFormat("vi-VN").format(CourseData.price)
            : "0.00"}
        </div>
        <div className="course-actions">
          <button
            className="buy-now-btn"
            onClick={() => navigate(`/payment-now`)}
          >
            Mua ngay
          </button>
          <button className="add-to-cart-btn">Thêm vào giỏ</button>
        </div>
      </div>
    </div>
  );
};

export default Course;
