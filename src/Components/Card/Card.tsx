import React, { useState } from "react";
import "./Card.scss";
import imgDefaul from "../../Assets/Image/Logo.svg";
import { Clock, Edit, Trash2 } from "lucide-react";
import { useAppDispatch } from "../../store";
import { FormStateActions } from "../../Reduxs/FormState/FormStateSlice";

interface CardProps {
  data: {
    id: string;
    categoryId: string;
    image: string;
    title: string;
    description: string;
    price: number;
    instructorInfo: string;
    level: number;
    contentVideo: string;
    video: string;
    duration: string;
  };
  onClick?: () => void;
  role?: string;
}

const Card: React.FC<CardProps> = ({ data, onClick, role }) => {
  const [logoError, setLogoError] = useState(false);
  const dispatch = useAppDispatch();
  const handleEdit = () => {
    dispatch(FormStateActions.setEditCourse(true));
    dispatch(FormStateActions.setidEditCourse(data.id));
  };
  const handleDelete = () => {
    dispatch(FormStateActions.setDeleteCourse(true));
    dispatch(FormStateActions.setidDeleteCourse(data.id));
  };
  // console.log(
  //   "edit",
  //   dispatch(FormStateActions.setEditCourse(true)),
  //   ",",
  //   dispatch(FormStateActions.setidEditCourse(data.id))
  // );
  return (
    <div className="card" style={{ cursor: "pointer" }}>
      <div className="card-img" onClick={onClick}>
        {logoError ? (
          <img src={imgDefaul} alt={data.title} />
        ) : (
          <img
            src={data.image}
            alt={data.title}
            onError={() => setLogoError(true)}
          />
        )}
      </div>
      <div className="card-infor">
        <div className="infor-wrap">
          <h3>{data.title || "Null"}</h3>
          <p className="duration">
            <Clock size={14} className="duration-icon" />
            {data.duration || "Null"}
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p className="instructor">{data.instructorInfo || "Null"}</p>
            <p className="price">
              <span className="currency">đ</span>
              {data.price !== undefined && data.price !== null
                ? new Intl.NumberFormat("vi-VN").format(data.price)
                : "0.00"}
            </p>
          </div>
          {role === "admin" && (
            <div className="card-actions">
              <Edit size={24} color="#0166ff" onClick={handleEdit} />

              <Trash2 size={24} color="red" onClick={handleDelete} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
