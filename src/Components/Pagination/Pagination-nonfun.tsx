import React, { useEffect, useState } from "react";
import "./Pagination.scss";
import {
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { searchAction } from "../../Reduxs/FilterTable/SearchSlice";
import { useAppDispatch } from "../../store";

type Props = {
  totalData: number;
  AmountDataPerPage: number;
  currentPageIndex?: number;
  refresh: () => Promise<void>;
};

const PaginationNF: React.FC<Props> = ({
  totalData,
  AmountDataPerPage,
  currentPageIndex = 1,
}) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(currentPageIndex); //đặt trạng được chọn truyền từ thẻ cha vào component này cho pageIndex()
  const totalPages = Math.ceil(totalData / AmountDataPerPage); //làm tròn lên số trang chứa dữ liệu
  const [canPressEnd, setCanPressEnd] = useState(true);
  const [canPressStart, setCanPressStart] = useState(true);

  const pageIndex = (pageNumber: number) => {
    // tạo index cho trang được chọn

    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
      dispatch(searchAction.setCurrentPageIndexST(pageNumber));
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    //luôn hiển thị nút đầu tiên
    pages.push(1);

    //thanh pag nếu nhiều hơn 9 trang dữ liệu
    if (totalPages >= 10) {
      // Nếu currentPageIndex <= 5, hiển thị đủ 7 nút liên tiếp đầu tiên
      if (page <= 5) {
        for (let i = 2; i <= Math.min(7, totalPages - 1); i++) {
          pages.push(i);
        }
        if (totalPages > 8) {
          pages.push("...");
        }
      }
      // nếu currentPageIndex > 5 và < totalPages - 4, thêm dấu "..." trước currentPageIndex
      else if (page > 5 && page < totalPages - 4) {
        pages.push("...");
        for (let i = page - 2; i <= page + 2; i++) {
          pages.push(i);
        }
        pages.push("...");
      }
      // nếu currentPageIndex nằm gần cuối, hiển thị các trang cuối cùng
      else {
        pages.push("...");
        for (let i = totalPages - 6; i < totalPages; i++) {
          pages.push(i);
        }
      }
    }
    //thanh pag khi số trang dữ liệu nhỏ hơn hoặc bằng 8
    else {
      for (let i = 2; i <= Math.min(8, totalPages - 1); i++) {
        pages.push(i);
      }
    }
    // luôn hiển nút cuối cùng (nếu > 1)
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    return pages;
  };

  const checkPress = () => {
    setCanPressStart(page > 1);
    setCanPressEnd(page < totalPages);
  };

  useEffect(() => {
    checkPress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    setPage(currentPageIndex);
  }, [currentPageIndex]);

  return (
    <div className="paging-component">
      <div className="pagination-container">
        <div
          className={`start-arrow ${canPressStart ? "" : "disabled"}`}
          onClick={() => pageIndex(1)}
        >
          <ChevronsLeft color={canPressStart ? "black" : "#ADADAD"} size={24} />
        </div>
        <div
          className={`previous-arrow ${canPressStart ? "" : "disabled"}`}
          onClick={() => pageIndex(page - 1)}
        >
          <ChevronLeft size={24} color={canPressStart ? "black" : "#ADADAD"} />
        </div>
        <div className="page-number">
          <div className="midle-page">
            {generatePageNumbers().map((pageNum, index) => {
              if (pageNum === "...") {
                return (
                  <span
                    key={index}
                    style={{
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      margin: "3px",
                      paddingTop: "10px",
                      justifyContent: "center",
                    }}
                  >
                    ...
                  </span>
                );
              } else {
                return (
                  <button
                    key={index}
                    onClick={() => pageIndex(pageNum as number)}
                    style={{
                      backgroundColor:
                        currentPageIndex === pageNum ? "#0166ff" : "",
                      color: currentPageIndex === pageNum ? "white" : "",
                    }}
                  >
                    {pageNum}
                  </button>
                );
              }
            })}
          </div>
        </div>
        <div
          className={`next-arrow ${canPressEnd ? "" : "disabled"}`}
          onClick={() => pageIndex(page + 1)}
        >
          <ChevronRight size={24} color={canPressEnd ? "black" : "#ADADAD"} />
        </div>
        <div
          className={`end-arrow ${canPressEnd ? "" : "disabled"}`}
          onClick={() => pageIndex(totalPages)}
        >
          <ChevronsRight size={24} color={canPressEnd ? "black" : "#ADADAD"} />
        </div>
      </div>
      {/* <div className="total-data">
        <p className="label-total-data">Số lượng bản ghi: {totalData.toString()} </p>
        
      </div> */}
    </div>
  );
};

export default PaginationNF;
