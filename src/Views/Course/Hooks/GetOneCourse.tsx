// useOneCourseData (giữ nguyên nhưng bổ sung loading để kiểm soát tốt hơn)
import { useEffect, useState } from "react";
import { apiService } from "../../../AxiosConfig/apiService";
import { setTokenHeader } from "../../../AxiosConfig/axiosConfig";
import { apiResponse, Course } from "../../../AxiosConfig/DataType";
import { loadingActions } from "../../../Reduxs/LoadingSlice";
import { useAppDispatch } from "../../../store";

const useOneCourseData = (id: string | undefined) => {
  const dispatch = useAppDispatch();
  const [CourseData, setCourseData] = useState<Course | null>(null); // Thêm null để tránh undefined
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Thêm trạng thái loading

  const fetchDetailsCourse = async () => {
    if (!id) return; // Bỏ qua nếu id rỗng
    setLoading(true);
    try {
      setTokenHeader(sessionStorage.getItem("token"));
      const response = (await apiService.getOneCourse(
        id
      )) as unknown as apiResponse<Course>;
      if (response?.statusCode && response.data) {
        setCourseData(response.data);
      } else {
        throw new Error(response?.message || "Failed to load Course ");
      }
    } catch (err) {
      setError("Error fetching Course ");
    } finally {
      setLoading(false);
      dispatch(loadingActions.setloading(false));
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetailsCourse();
    } else {
      setCourseData(null); // Reset nếu id rỗng
    }
  }, [id]);

  return {
    CourseData,
    error,
    loading, // Trả thêm loading để component biết khi nào dữ liệu đang tải
    refetch: fetchDetailsCourse,
  };
};

export default useOneCourseData;
