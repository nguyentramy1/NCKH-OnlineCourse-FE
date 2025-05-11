import React from "react";
import { useAppSelector } from "../../store";
import useOneCourseData from "../Course/Hooks/GetOneCourse";
import "./Payment.scss";
import Cardlong from "../../Components/Card/LongCard";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";

const PaymentNow = () => {
  const idCourse = useAppSelector((state) => state.CurrentCourseStore.idCourse);
  const { CourseData, loading } = useOneCourseData(idCourse);
  const role = useAppSelector((state) => state.authStore.role);
  const navigate = useNavigate();
  // Xử lý khi đang tải dữ liệu
  if (loading) return <div>Loading...</div>;

  // Xử lý khi không có dữ liệu
  if (!CourseData) return <div>Không tìm thấy khóa học</div>;

  // Hàm xử lý khi nhấn nút xóa
  const handleRemove = () => {
    console.log("Xóa khóa học:", CourseData.id);
    // Thêm logic xóa nếu cần
  };

  return (
    <div className="payment-container">
      <h2>Đơn mua</h2>
      <p>1 khóa</p>
      <hr />

      <div className="payment-layout">
        {/* Danh sách khóa học bên trái */}
        <div className="course-list">
          <Cardlong
            key={CourseData.id}
            data={CourseData}
            onClick={() => {}}
            role={role}
          />
        </div>

        {/* Tổng tiền và QR bên phải */}
        <div className="payment-summary">
          <div className="total-section">
            <p>Tổng tiền:</p>
            <span className="total-amount">
              {CourseData.price !== undefined && CourseData.price !== null
                ? `đ${new Intl.NumberFormat("vi-VN").format(CourseData.price)}`
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

export default PaymentNow;
