import "./ListOrder.scss";
import Table from "./Component/Table";
import { useAppDispatch, useAppSelector } from "../../store";
import NoticeError from "../../Components/Notification/ErrorAlert/NoticeError";
import NoticeSuccess from "../../Components/Notification/SuccessAlert/NoticeSuccess";
import { noticeActions } from "../../Reduxs/Notification/Notification";
import { useEffect, useState } from "react";
import { searchAction } from "../../Reduxs/FilterTable/SearchSlice";
import { useCustomHeaders } from "./data/CustomHeader";
import { useOrderData } from "./data/DataListOrder";
import { fixedUser } from "../FixData";
import { Input, Select } from "antd";
import PaginationSearch from "../../Components/Pagination/Pagination-SearchFunc";
const { Search } = Input;
export interface Project {
  Id: string;
  UserId: string;
  Title: string;
  Logo: string;
  Description: string;
  Address: string;
  limitedNumber: number;
  Status: string;
}

const ListOrder = () => {
  const dispatch = useAppDispatch();
  // Gọi useCustomHeaders trực tiếp trong thân component
  const { headersCustom } = useCustomHeaders();
  const error = useAppSelector((state) => state.noticeStore.notifiaction);
  const success = useAppSelector(
    (state) => state.noticeStore.notifiactionSuccess
  );

  const isShowNoticeError = useAppSelector(
    (state) => state.noticeStore.isShowNotice
  );
  const isShowNoticeSuccess = useAppSelector(
    (state) => state.noticeStore.isShowNoticeSuccess
  );
  const handleCloseNotice = () => {
    dispatch(noticeActions.setIsShowNotice(false));
    dispatch(noticeActions.setIsShowNoticeSuccess(false));
  };
  const { TotalCount, refetch, ListOrder } = useOrderData();
  /// Filter
  const [inputValue, setInputValue] = useState(""); // Giá trị nhập vào ô tìm kiếm
  const [searchTerm, setSearchTerm] = useState(""); // Giá trị dùng để lọc từ Search
  const [SelectedStatus, setSelectedStatus] = useState<string[]>([]); // Giá trị từ Select

  const handleSearch = (value: string) => {
    setSearchTerm(value); // Cập nhật searchTerm khi nhấn Search
    dispatch(searchAction.setCurrentPageIndexST(1)); // Reset về trang 1
  };

  // Hàm xử lý khi chọn nhiều tùy chọn từ Select
  const setMultiCampaignDrop = (selectedValues: string[]) => {
    setSelectedStatus(selectedValues);
    dispatch(searchAction.setCurrentPageIndexST(1)); // Reset về trang 1 khi thay đổi Select
  };

  // Lọc dữ liệu dựa trên cả searchTerm và SelectedStatus
  const filterMultiData = ListOrder.filter((a) => {
    // Lọc theo searchTerm
    const term = searchTerm.trim().toLowerCase();
    const matchesName =
      !searchTerm || (a && a.paymentStatus && a.paymentStatus);

    // Lọc theo SelectedStatus
    const matchesStatus =
      SelectedStatus.length === 0 ||
      (a.paymentStatus != null &&
        SelectedStatus.includes(a.paymentStatus.toString()));

    // Kết hợp các điều kiện
    return matchesName && matchesStatus;
  });

  // Pagination
  const currentPageIndex = useAppSelector(
    (state) => state.searchStore.currentPageIndexST
  );
  const setCurrentPageIndex = (e: number) => {
    dispatch(searchAction.setCurrentPageIndexST(e));
  };
  const pageData = filterMultiData.slice(
    (currentPageIndex ? currentPageIndex - 1 : 0) * 11,
    currentPageIndex ? currentPageIndex * 11 : 11
  );
  useEffect(() => {
    if (isShowNoticeError || isShowNoticeSuccess) {
      setTimeout(() => {
        handleCloseNotice();
      }, 3000); // Tự động đóng sau 3 giây
    }
  }, [isShowNoticeError, isShowNoticeSuccess]);

  return (
    <div className="ListProject-Container">
      <div
        className={`notice-success ${isShowNoticeSuccess ? "open" : "close"}`}
      >
        <NoticeSuccess
          successNotice={success ? success : ""}
          onClose={handleCloseNotice}
          showError={isShowNoticeSuccess}
        />
      </div>
      <div className={`notice-error ${isShowNoticeError ? "open" : "close"}`}>
        <NoticeError
          errorNotice={error ? error : ""}
          onClose={handleCloseNotice}
          showError={isShowNoticeError}
        />
      </div>
      <div className="content"> Danh sách hóa đơn</div>
      <div className="filter-container">
        <div className="search-dropdown">
          <div className="dropdown-container-campaign">
            <div className="search-text-campaign">
              <Search
                placeholder="Find..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onSearch={handleSearch}
                enterButton="Search"
              />
            </div>
            <div className="dropdown-area">
              <Select
                mode="multiple"
                showSearch
                placeholder="Select project"
                style={{ width: 200, height: 34, borderRadius: 8 }}
                maxTagCount={2}
                maxTagTextLength={10}
                options={[
                  { value: 0, label: "Chờ xử lý" },
                  { value: 1, label: "Thành công" },
                  { value: 2, label: "Không xác định 2" },
                  { value: 3, label: "Thất bại" },
                ]}
                onChange={setMultiCampaignDrop} // Lọc ngay khi thay đổi Select
                value={SelectedStatus}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                dropdownStyle={{ minWidth: 200 }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="table-area">
        <div className="wrap-table">
          <Table
            data={pageData}
            headers={headersCustom}
            amountDataPerPage={11}
            needNo={true}
            idSelect="id"
            editField="paymentStatus"
            dataTabletype="member"
          />
        </div>
        <div className="wrap-pagination">
          <PaginationSearch
            totalData={filterMultiData.length}
            AmountDataPerPage={11}
            currentPageIndex={currentPageIndex}
            onPageChange={setCurrentPageIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default ListOrder;
