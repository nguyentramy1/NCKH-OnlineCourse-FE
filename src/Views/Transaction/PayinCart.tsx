import React from "react";
import { useAppSelector } from "../../store";
import useOneListCourse from "../Course/Hooks/GetOneCourse";
import "./Payment.scss";
import Cardlong from "../../Components/Card/NhapCard";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import useListCourse from "../UserScreen/CourseHook/GetAllCourse";
import useListCourseInCart from "./GetCourseCart";
import { apiService } from "../../AxiosConfig/apiService";
import { apiResponse, nullData } from "../../AxiosConfig/DataType";
import { loadingActions } from "../../Reduxs/LoadingSlice";
import { noticeActions } from "../../Reduxs/Notification/Notification";
import { useDispatch } from "react-redux";

const PaymentCart = () => {
  const idCourse = useAppSelector((state) => state.CurrentStore.idCourse);
  const {
    ListCourse,
    loading,
    error: projectsError,
    refetch,
  } = useListCourseInCart();
  const dispatch = useDispatch(); // Sử dụng useDispatch để gọi action
  const role = useAppSelector((state) => state.authStore.role);
  const navigate = useNavigate();

  // Xử lý khi đang tải dữ liệu
  if (loading) return <div>Loading...</div>;

  // Xử lý khi không có dữ liệu
  if (!ListCourse) return <div>Không tìm thấy khóa học</div>;

  // Hàm xử lý khi nhấn nút xóa
  const handleRemove = () => {
    console.log("Xóa khóa học:", ListCourse);
    // Thêm logic xóa nếu cần
  };
  const totalPrice = ListCourse.reduce((sum, course) => {
    return sum + (course.price && course.price > 0 ? course.price : 0);
  }, 0);
  return (
    <div className="payment-container">
      <h2>Đơn mua</h2>
      <p>{ListCourse.length} khóa</p>
      <hr />

      <div className="payment-layout">
        {/* Danh sách khóa học bên trái */}
        <div className="course-list">
          {ListCourse.map((ListCourse) => (
            <Cardlong
              key={ListCourse.courseId}
              data={ListCourse}
              onClick={() => {}}
              role={role}
              needDelete
            />
          ))}
        </div>

        {/* Tổng tiền và QR bên phải */}
        <div className="payment-summary">
          <div className="total-section">
            <p>Tổng tiền:</p>
            <span className="total-amount">
              {totalPrice
                ? `đ${new Intl.NumberFormat("vi-VN").format(totalPrice)}`
                : "đ0.00"}
            </span>
          </div>

          <div className="qr-code">
            <img
              src="https://qrcode-gen.com/images/qrcode-default.png" // Thay bằng mã QR thực tế
              alt="QR Code"
            />
          </div>

          <Button
            className="cancel-btn"
            onClick={() =>
              navigate(`/course/${idCourse}`, {
                state: { id: idCourse },
              })
            }
            label="Hủy"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentCart;
