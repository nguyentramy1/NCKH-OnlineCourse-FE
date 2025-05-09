// useOneCategoryData (giữ nguyên nhưng bổ sung loading để kiểm soát tốt hơn)
import { useEffect, useState } from "react";
import { apiService } from "../../../AxiosConfig/apiService";
import { setTokenHeader } from "../../../AxiosConfig/axiosConfig";
import { apiResponse, Category } from "../../../AxiosConfig/DataType";
import { loadingActions } from "../../../Reduxs/LoadingSlice";
import { useAppDispatch } from "../../../store";

const useOneCategoryData = (id: string | undefined) => {
  const dispatch = useAppDispatch();
  const [CategoryData, setCategoryData] = useState<Category | null>(null); // Thêm null để tránh undefined
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Thêm trạng thái loading

  const fetchDetailsCategory = async () => {
    if (!id) return; // Bỏ qua nếu id rỗng
    setLoading(true);
    try {
      setTokenHeader(sessionStorage.getItem("token"));
      const response = (await apiService.getOneCategory(
        id
      )) as unknown as apiResponse<Category>;
      if (response?.statusCode && response.data) {
        setCategoryData(response.data);
      } else {
        throw new Error(response?.message || "Failed to load Category ");
      }
    } catch (err) {
      setError("Error fetching Category ");
    } finally {
      setLoading(false);
      dispatch(loadingActions.setloading(false));
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetailsCategory();
    } else {
      setCategoryData(null); // Reset nếu id rỗng
    }
  }, [id]);

  return {
    CategoryData,
    error,
    loading, // Trả thêm loading để component biết khi nào dữ liệu đang tải
    refetch: fetchDetailsCategory,
  };
};

export default useOneCategoryData;
