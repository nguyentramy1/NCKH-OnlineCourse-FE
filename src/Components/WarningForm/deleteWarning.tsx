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
   
      deleteItem();
    
    onClose();
  };
  const datafordelete = {
    data: iditem,
  };
  const deleteItem= async () => {
    
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
