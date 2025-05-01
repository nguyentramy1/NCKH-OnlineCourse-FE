import { useEffect, useState } from "react";
import { apiService } from "../../../AxiosConfig/apiService"; // Nhập dịch vụ API
import {
  apiResponse,
  Course,
  ResponeList,
} from "../../../AxiosConfig/DataType";
import { useAppSelector } from "../../../store";
import { useDispatch } from "react-redux";
import { noticeActions } from "../../../Reduxs/Notification/Notification";

const useCourseData = (pageSize?: number) => {
  const dispatch = useDispatch();
  const [CourseData, setCourseData] = useState<Course[]>([]);
  const [TotalCount, setTotalCount] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentPageIndex = useAppSelector(
    (state) => state.searchStore.currentPageIndexST
  );
  const fetchCourseList = async (data?: {
    pageIndex?: number;
    pageSize?: number;
  }) => {
    try {
      setLoading(true);
      // Nếu không có data hoặc data rỗng, vẫn gọi API
      const params = data || {}; // Nếu data undefined thì dùng object rỗng

      const response = (await apiService.getListCourse(
        params
      )) as unknown as apiResponse<ResponeList<Course>>;

      if (response?.statusCode && response.data) {
        setCourseData(response.data.items);
        setTotalCount(response.data.totalCount);
      } else {
        setError(response?.message || "Failed to load Course list");
      }
    } catch (err) {
      setError("Error fetching Courselist");
      let message = "Error fetching Courselist";
      if (error && typeof error === "object" && "message" in error) {
        message = (error as Error).message;
      }
      dispatch(noticeActions.setNotification(message));
      dispatch(noticeActions.setIsShowNotice(true));
    } finally {
      setLoading(false);
    }
  };

  // Gọi fetchCourseList khi mount hoặc khi pageIndex/pageSize thay đổi
  useEffect(() => {
    fetchCourseList({
      pageIndex: currentPageIndex, // Có thể là undefined
      pageSize: pageSize, // Có thể là undefined
    });
  }, [currentPageIndex, pageSize]);

  // Hàm refetch
  const refetch = () =>
    fetchCourseList({
      pageIndex: currentPageIndex,
      pageSize: pageSize,
    });

  return {
    TotalCount,
    CourseData,
    loading,
    error,
    refetch, // Cung cấp hàm refetch
  };
};

export default useCourseData;
