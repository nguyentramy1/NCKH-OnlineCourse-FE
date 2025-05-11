import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { headerType } from "../../../Components/Table/OtherType/TableCheckbox-delete";
import "../ListOrder.scss";
import { Order, OrderDatail } from "../../../AxiosConfig/DataType";

export const useCustomHeaders = () => {
  const navigate = useNavigate();
  const getIframeUrl = (avatar?: string) => {
    if (!avatar) return "https://via.placeholder.com/200"; // URL mặc định nếu không có avatar
    if (avatar.includes("drive.google.com")) {
      const id = avatar.match(/id=([^&]+)/)?.[1];
      return id ? `https://drive.google.com/file/d/${id}/preview` : avatar;
    }
    return avatar;
  };
  const handleNavigation = (id: string) => {
    navigate(`/order-detail/${id}`, { state: { id } });
  };
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(0);
  const headersCustom: headerType<Order>[] = [
    {
      label: "ID đơn hàng",
      value: "id",
      render: (e: Order) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              width: "253px",
              display: "block",
              color: "#038E54",
              cursor: "pointer",
              fontWeight: "600",
              whiteSpace: "nowrap", // Ngăn không cho tên xuống dòng
              overflow: "hidden", // Ẩn phần thừa
              textOverflow: "ellipsis",
              padding: "5px",
            }}
            onClick={() => handleNavigation(e.id)}
          >
            {e.id}
          </span>
        </div>
      ),
    },
    {
      label: "ID người dùng",
      value: "userId",
      render: (e: Order) => (
        <span
          style={{
            width: "139px",
            display: "block",
          }}
        >
          {e.userId}
        </span>
      ),
    },
    {
      label: "Đơn giá",
      value: "priceSum",
      render: (e: Order) => (
        <span
          style={{
            width: "139px",
            display: "block",
          }}
        >
          {e.priceSum}
        </span>
      ),
    },

    {
      label: "Trạng thái đơn hàng",
      value: "paymentStatus",
      render: (e: Order) => (
        <span
          style={{
            width: "150px",
            display: "block",
          }}
        >
          {e.paymentStatus}
        </span>
      ),
    },
  ];
  const headersCustomDetail: headerType<OrderDatail>[] = [
    {
      label: "ID đơn hàng",
      value: "id",
      render: (e: OrderDatail) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              width: "253px",
              display: "block",
              color: "#038E54",
              cursor: "pointer",
              fontWeight: "600",
              whiteSpace: "nowrap", // Ngăn không cho tên xuống dòng
              overflow: "hidden", // Ẩn phần thừa
              textOverflow: "ellipsis",
              padding: "5px",
            }}
          >
            {e.id}
          </span>
        </div>
      ),
    },
    {
      label: "ID khóa học",
      value: "courseId",
      render: (e: OrderDatail) => (
        <span
          style={{
            width: "139px",
            display: "block",
          }}
        >
          {e.courseId}
        </span>
      ),
    },
    {
      label: "Đơn giá",
      value: "price",
      render: (e: OrderDatail) => (
        <span
          style={{
            width: "139px",
            display: "block",
          }}
        >
          {e.price}
        </span>
      ),
    },
  ];

  return { headersCustom, headersCustomDetail };
};
