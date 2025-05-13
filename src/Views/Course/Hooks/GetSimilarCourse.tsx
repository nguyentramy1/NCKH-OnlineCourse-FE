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

const useSimilarourseData = (courseId: string, topN: number) => {
  const dispatch = useDispatch();
  const [recomCourseData, setrecomCourseData] = useState<Course[]>([]);
  const [TotalCount, setTotalCount] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = useAppSelector((state) => state.ProfileStore.userId);
  const fetchCourseList = async (data: { courseId: string; topN: number }) => {
    try {
      setLoading(true);
      const response = (await apiService.getSimilarCourse(
        data
      )) as unknown as Course[];

      setrecomCourseData(response);
    } catch (err) {
      console.log("datat", err);
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
      courseId: courseId,
      topN: 4,
    });
  }, [topN, courseId]);

  // Hàm refetch
  const refetch = () =>
    fetchCourseList({
      courseId: courseId,
      topN: 4,
    });

  return {
    recomCourseData,
    loading,
    error,
    refetch, // Cung cấp hàm refetch
  };
};

export default useSimilarourseData;
