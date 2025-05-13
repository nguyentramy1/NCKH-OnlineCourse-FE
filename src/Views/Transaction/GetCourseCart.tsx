import { useEffect, useState } from "react";
import { apiService } from "../../AxiosConfig/apiService";
import {
  CourseUser,
  apiResponse,
  Course,
  ResponeList,
  CourseCart,
} from "../../AxiosConfig/DataType";
import { useAppSelector } from "../../store";
import { useDispatch } from "react-redux";
import { noticeActions } from "../../Reduxs/Notification/Notification";

const useListCourseInCart = (pagesize?: number) => {
  const userId = useAppSelector((state) => state.ProfileStore.userId);
  const dispatch = useDispatch();
  const [ListCourse, setListCourse] = useState<CourseCart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [TotalCount, setTotalCount] = useState<number>();
  const currentPageIndex = useAppSelector(
    (state) => state.searchStore.currentPageIndexST
  );

  const fetchCourseList = async (data: {
    pageIndex?: number;
    pageSize?: number;
  }) => {
    try {
      const response = (await apiService.getListCart(
        data
      )) as unknown as apiResponse<ResponeList<CourseCart>>;
      if (response?.statusCode === "Success" && response.data) {
        const courses = response.data.items.filter(
          (course) => course.userId === userId
        );
        if (courses.length > 0) {
          setListCourse(courses);
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
    fetchCourseList({
      pageIndex: currentPageIndex ? currentPageIndex : 1,
      pageSize: pagesize,
    });
  }, [currentPageIndex, userId]);

  const refetch = () =>
    fetchCourseList({ pageIndex: currentPageIndex || 1, pageSize: pagesize });

  return {
    ListCourse,
    loading,
    error,
    refetch,
  };
};

export default useListCourseInCart;
