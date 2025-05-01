import { useEffect, useState } from "react";
import { apiService } from "../../../AxiosConfig/apiService"; // Nhập dịch vụ API
import {
  apiResponse,
  Category,
  ResponeList,
} from "../../../AxiosConfig/DataType";
import { useAppSelector } from "../../../store";
import { useDispatch } from "react-redux";
import { noticeActions } from "../../../Reduxs/Notification/Notification";
import { DropDataAction } from "../../../Reduxs/OptionsMenu/DropDataState";

const useCategoryData = (pageSize?: number) => {
  const dispatch = useDispatch();
  const [CategoryData, setCategoryData] = useState<Category[]>([]);
  const [TotalCount, setTotalCount] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentPageIndex = useAppSelector(
    (state) => state.searchStore.currentPageIndexST
  );
  const fetchCategoryList = async (data?: {
    pageIndex?: number;
    pageSize?: number;
  }) => {
    try {
      setLoading(true);
      // Nếu không có data hoặc data rỗng, vẫn gọi API
      const params = data || {}; // Nếu data undefined thì dùng object rỗng

      const response = (await apiService.getListCategory(
        params
      )) as unknown as apiResponse<ResponeList<Category>>;

      if (response?.statusCode && response.data) {
        setCategoryData(response.data.items);
        setTotalCount(response.data.totalCount);
        const Category = response.data.items.map((Category) => ({
          value: Category.id,
          label: Category.name,
        }));
        dispatch(DropDataAction.setCategoryOption(Category));
      } else {
        setError(response?.message || "Failed to load Category list");
      }
    } catch (err) {
      setError("Error fetching Categorylist");
      let message = "Error fetching Categorylist";
      if (error && typeof error === "object" && "message" in error) {
        message = (error as Error).message;
      }
      dispatch(noticeActions.setNotification(message));
      dispatch(noticeActions.setIsShowNotice(true));
    } finally {
      setLoading(false);
    }
  };

  // Gọi fetchCategoryList khi mount hoặc khi pageIndex/pageSize thay đổi
  useEffect(() => {
    fetchCategoryList({
      pageIndex: currentPageIndex, // Có thể là undefined
      pageSize: pageSize, // Có thể là undefined
    });
  }, [currentPageIndex, pageSize]);

  // Hàm refetch
  const refetch = () =>
    fetchCategoryList({
      pageIndex: currentPageIndex,
      pageSize: pageSize,
    });

  return {
    TotalCount,
    CategoryData,
    loading,
    error,
    refetch, // Cung cấp hàm refetch
  };
};

export default useCategoryData;
