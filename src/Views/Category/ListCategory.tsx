//search Fe
import "./ListTable.scss";
import Table from "./Component/TableCheckbox-delete";
import { useAppDispatch, useAppSelector } from "../../store";
import NoticeError from "../../Components/Notification/ErrorAlert/NoticeError";
import NoticeSuccess from "../../Components/Notification/SuccessAlert/NoticeSuccess";
import { noticeActions } from "../../Reduxs/Notification/Notification";
import { useEffect, useState } from "react";
import { searchAction } from "../../Reduxs/FilterTable/SearchSlice";
import Button from "../../Components/Button/Button";
import { Plus } from "lucide-react";
import { useCustomHeaders } from "./Hooks/Header";
import useCategoryData from "./Hooks/CategoryData";
import { Input } from "antd";
import PaginationSearch from "../../Components/Pagination/Pagination-SearchFunc";
import FormAdd from "./FormAdd";
import ReactDOM from "react-dom";
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

const ListCategory = () => {
  const { TotalCount, refetch, CategoryData } = useCategoryData();
  const dispatch = useAppDispatch();
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

  /// Filter
  const [inputValue, setInputValue] = useState(""); // Giá trị nhập vào ô tìm kiếm
  const [searchTerm, setSearchTerm] = useState(""); // Giá trị dùng để lọc từ Search

  const handleSearch = (value: string) => {
    setSearchTerm(value); // Cập nhật searchTerm khi nhấn Search
    dispatch(searchAction.setCurrentPageIndexST(1)); // Reset về trang 1
  };

  // Lọc dữ liệu dựa trên cả searchTerm và SelectedCampaign
  const filterMultiData = CategoryData.filter((a) => {
    // Lọc theo searchTerm
    const term = searchTerm.trim().toLowerCase();
    const matchesCategoryName =
      !searchTerm || (a.name && a.name.toLowerCase().includes(term));

    // Kết hợp các điều kiện: phải thỏa mãn cả searchTerm (nếu có) và SelectedCampaign (nếu có)
    return matchesCategoryName;
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

  // Fetch data
  const [fetched, setFetched] = useState(false);
  const needToFetch = () => {
    if (isShowNoticeSuccess === true) {
      setFetched((e) => !e);
    }
  };
  useEffect(() => {
    if (fetched) {
      refetch();
      setFetched(false);
    }
  }, [fetched]);
  useEffect(() => {
    needToFetch();
    setTimeout(() => {
      dispatch(noticeActions.setNotification(null));
      dispatch(noticeActions.setIsShowNotice(false));
      dispatch(noticeActions.setNotificationSuccess(null));
      dispatch(noticeActions.setIsShowNoticeSuccess(false));
    }, 10000);
  }, [isShowNoticeError, isShowNoticeSuccess]);

  // Modal
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Xử lý thông báo
  useEffect(() => {
    if (isShowNoticeError || isShowNoticeSuccess) {
      setTimeout(() => {
        handleCloseNotice();
      }, 3000);
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
      <div className="content-title">Danh sách danh mục</div>
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
          </div>
          <div className="btn-container">
            <Button
              label={
                <div className="icon-add" title="Add project">
                  <Plus size={18} color="white" />
                </div>
              }
              onClick={() => setIsOpen(true)}
              className="btn"
            />
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
            editField="status"
            dataTabletype="danh mục"
            needDelete={true}
            needEdit={true}
          />
        </div>
      </div>
      <div className="wrap-pagination">
        <PaginationSearch
          totalData={filterMultiData.length}
          AmountDataPerPage={11}
          currentPageIndex={currentPageIndex}
          onPageChange={setCurrentPageIndex}
        />
      </div>
      {ReactDOM.createPortal(
        <FormAdd
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          refetch={refetch}
        />,
        document.body
      )}
    </div>
  );
};

export default ListCategory;
