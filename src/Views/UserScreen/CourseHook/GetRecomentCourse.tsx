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

const useRecomentCourseData = (topN: number) => {
  const dispatch = useDispatch();
  const [recomCourseData, setrecomCourseData] = useState<Course[]>([]);
  const [TotalCount, setTotalCount] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = useAppSelector((state) => state.ProfileStore.userId);
  const fetchCourseList = async (data: { userId: string; topN: number }) => {
    try {
      setLoading(true);
      const response = (await apiService.getRecomentCourse(
        data
      )) as unknown as Course[];

      if (response) {
        setrecomCourseData(response);
      } else {
        setError("Failed to load Course list");
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
      userId: userId,
      topN: 4,
    });
  }, [topN, userId]);

  // Hàm refetch
  const refetch = () =>
    fetchCourseList({
      userId: userId,
      topN: 4,
    });

  return {
    recomCourseData,
    loading,
    error,
    refetch, // Cung cấp hàm refetch
  };
};

export default useRecomentCourseData;
