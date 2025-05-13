import { useState, useEffect } from "react";
import { apiService } from "../../../AxiosConfig/apiService";
import { apiResponse, nullData } from "../../../AxiosConfig/DataType";
import { useDispatch } from "react-redux";
import { noticeActions } from "../../../Reduxs/Notification/Notification";

const useUpdateUserpaymentStatus = (
  transactionId: string,
  trigger: boolean = false
) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    try {
      setLoading(true);
      console.log("edit paymentStatus data: user id", transactionId);
      const response = (await apiService.AdminConfirm(
        transactionId
      )) as unknown as apiResponse<nullData>;
      if (!response) {
        throw new Error("Network response was not ok");
      }

      dispatch(
        noticeActions.setNotificationSuccess(
          "Update user paymentStatus successfully"
        )
      );
      dispatch(noticeActions.setIsShowNoticeSuccess(true));
    } catch (error) {
      console.error("Error message:", error);
      let message = "User paymentStatus update failed!";
      if (error && typeof error === "object" && "message" in error) {
        message = (error as Error).message;
      }
      setError(message);
      dispatch(noticeActions.setNotification(message));
      dispatch(noticeActions.setIsShowNotice(true));
    } finally {
      setLoading(false);
    }
  };

  // Chỉ gọi API khi trigger là true
  useEffect(() => {
    if (trigger) {
      fetch();
    }
  }, []); // Chỉ phụ thuộc vào trigger, không thêm các tham số khác

  return {
    loading,
    error,
    refetch: fetch,
  };
};

export default useUpdateUserpaymentStatus;
