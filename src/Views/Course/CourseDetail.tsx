import React, { useState } from "react";
import "./CourseDetail.scss";
import { Clock } from "lucide-react"; // Icon đồng hồ cho thời gian
import imgDefaul from "../../Assets/Image/Logo.svg";
import useOneCourseData from "./Hooks/GetOneCourse";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "../Error/error-page";
import { useDispatch } from "react-redux";
import { CurrentActions } from "../../Reduxs/CurrentSlice";
import { useAppSelector } from "../../store";
import { apiResponse, nullData, QR } from "../../AxiosConfig/DataType";
import { apiService } from "../../AxiosConfig/apiService";
import { noticeActions } from "../../Reduxs/Notification/Notification";
import Intropersonal from "../../Layouts/Introduce/IntroPersonal";
import useRecomentCourseData from "../UserScreen/CourseHook/GetRecomentCourse";
import IntroSimilar from "../../Layouts/Introduce/IntroSimilar";
import useSimilarourseData from "./Hooks/GetSimilarCourse";

const Course = () => {
  const { id } = useParams();
  const { CourseData, loading } = useOneCourseData(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const idCourse = useAppSelector((state) => state.CurrentStore.idCourse);
  const [loadingadd, setLoadingadd] = useState(false);
  const {
    recomCourseData,
    loading: recomLoading,
    error: recomError,
  } = useSimilarourseData(idCourse, 3);
  console.log("couser id", id);
  const AddToCart = async () => {
    const data = {
      courseId: id,
    };
    try {
      setLoadingadd(true);
      console.log("loadingadd ", loadingadd);
      const response = (await apiService.addToCart(
        id ?? ""
      )) as unknown as apiResponse<nullData>;
      if (!response) {
        throw new Error("Network response was not ok");
      }
      dispatch(noticeActions.setNotificationSuccess("Add Course successfully"));
      dispatch(noticeActions.setIsShowNoticeSuccess(true));
    } catch (error) {
      console.error("Error message:", error);
      let message = "Add Course failed";
      if (error && typeof error === "object" && "message" in error) {
        message = (error as Error).message;
      }
      dispatch(noticeActions.setNotification(message));
      dispatch(noticeActions.setIsShowNotice(true));
    } finally {
      console.log("loading ", loading);
    }
  };
  const BuyNow = async () => {
    try {
      setLoadingadd(true);
      console.log("loadingadd ", loadingadd);
      const response = (await apiService.BuyCourse(
        id ?? ""
      )) as unknown as apiResponse<QR>;
      if (!response) {
        throw new Error("Network response was not ok");
      } else {
        dispatch(CurrentActions.setCurrentQR(response.data));
      }
      dispatch(noticeActions.setNotificationSuccess("Add Course successfully"));
      dispatch(noticeActions.setIsShowNoticeSuccess(true));
    } catch (error) {
      console.error("Error message:", error);
      let message = "Add Course failed";
      if (error && typeof error === "object" && "message" in error) {
        message = (error as Error).message;
      }
      dispatch(noticeActions.setNotification(message));
      dispatch(noticeActions.setIsShowNotice(true));
    } finally {
      console.log("loading ", loading);
    }
  };
  const handleBuyNow = () => {
    BuyNow();
    navigate(`/payment-now`);
  };
  // Kiểm tra nếu id không tồn tại
  if (!id) {
    return (
      <div>
        <ErrorPage />
      </div>
    );
  } else {
    dispatch(CurrentActions.setCurrent(id));
  }

  console.log("CurrentActions", idCourse);

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
          <button className="buy-now-btn" onClick={handleBuyNow}>
            Mua ngay
          </button>
          <button onClick={() => AddToCart()} className="add-to-cart-btn">
            Thêm vào giỏ
          </button>
        </div>
      </div>
      <IntroSimilar
        Course={recomCourseData}
        projectsError={recomError}
        projectsLoading={recomLoading}
      />
    </div>
  );
};

export default Course;
