import { useEffect, useState } from "react";
import { apiService } from "../../../AxiosConfig/apiService"; // Nhập dịch vụ API
import {
  apiResponse,
  apiResponseListData,
  Order,
  OrderDatail,
  ResponeList,
} from "../../../AxiosConfig/DataType";
import { useAppSelector } from "../../../store";
import { noticeActions } from "../../../Reduxs/Notification/Notification";
import { useDispatch } from "react-redux";

const useOrderData = (pageSize?: number, pageIndex?: number) => {
  const [ListOrder, setListOrder] = useState<Order[]>([]);
  const [TotalCount, setTotalCount] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const fetchOrderList = async (data?: {
    pageIndex?: number; // Không bắt buộc
    pageSize?: number; // Không bắt buộc
  }) => {
    try {
      // Nếu không có data hoặc data rỗng, vẫn gọi API
      const params = data || {}; // Nếu data undefined thì dùng object rỗng

      const response = (await apiService.getListOrder(
        params
      )) as unknown as apiResponse<ResponeList<Order>>;

      if (response?.statusCode && response.data) {
        setListOrder(response.data.items);
        setTotalCount(response.data.totalCount);
      } else {
        setError(response?.message || "Failed to load Order list");
      }
    } catch (err) {
      dispatch(noticeActions.setNotification("Failed to load Order list"));
      dispatch(noticeActions.setIsShowNotice(true));
    } finally {
      setLoading(false);
    }
  };

  // Gọi fetchProjectList khi mount hoặc khi pageIndex/pageSize thay đổi
  useEffect(() => {
    fetchOrderList({
      pageIndex: pageIndex, // Có thể là undefined
      pageSize: pageSize, // Có thể là undefined
    });
  }, [pageIndex, pageSize]);

  // Hàm refetch
  const refetch = () =>
    fetchOrderList({
      pageIndex: pageIndex,
      pageSize: pageSize,
    });
  return {
    TotalCount,
    ListOrder,
    loading,
    error,
    refetch, // Cung cấp hàm refetch
  };
};

const useOrderDetailData = (
  id: string,
  pageSize?: number,
  pageIndex?: number
) => {
  const userId = useAppSelector((state) => state.ProfileStore.userId);
  const dispatch = useDispatch();
  const [listOrderDetail, setlistOrderDetail] = useState<OrderDatail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [TotalCount, setTotalCount] = useState<number>();
  const currentPageIndex = useAppSelector(
    (state) => state.searchStore.currentPageIndexST
  );

  const fetchProjectList = async (data?: {
    pageIndex?: number; // Không bắt buộc
    pageSize?: number; // Không bắt buộc
  }) => {
    try {
      const params = data || {}; // Nếu data undefined thì dùng object rỗng
      const response = (await apiService.getAllOrderDetail(
        params
      )) as unknown as apiResponse<ResponeList<OrderDatail>>;
      if (response?.statusCode === "Success" && response.data) {
        setTotalCount(response.data.totalCount);
        const courses = response.data.items.filter(
          (course) => course.orderId === id
        );
        if (courses.length > 0) {
          setlistOrderDetail(courses);
        } else {
          setError("No courses found for this user");
        }
      } else {
        setError(response?.message || "Failed to load Course list");
      }
    } catch (err) {
      setError("Error fetching Course list");
      dispatch(noticeActions.setNotification("Error fetching Course list"));
      dispatch(noticeActions.setIsShowNotice(true));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectList({
      pageIndex: pageIndex,
      pageSize: pageSize,
    });
  }, [currentPageIndex, userId]);

  const refetch = () =>
    fetchProjectList({ pageIndex: pageIndex, pageSize: pageSize });

  return {
    listOrderDetail,
    loading,
    TotalCount,
    error,
    refetch,
  };
};

export { useOrderData, useOrderDetailData };
