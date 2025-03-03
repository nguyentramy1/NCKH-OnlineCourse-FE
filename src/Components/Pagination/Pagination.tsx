import React, { useEffect, useState } from "react";
import "./Pagination.scss";
import GoStart from "../../Assets/Svg/start_arrow.svg";
import Previous from "../../Assets/Svg/previous_arrow.svg";
import Next from "../../Assets/Svg/next_arrow.svg";
import End from "../../Assets/Svg/end_arrow.svg";
import Input from "../Input/Input";

type Props = {
  totalData: number;
  AmountDataPerPage: number;
  currentPageIndex?: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({
  totalData,
  AmountDataPerPage,
  currentPageIndex = 1,
  onPageChange,
}) => {
  const [page, setPage] = useState(currentPageIndex); //đặt trạng được chọn truyền từ thẻ cha vào component này cho pageIndex()
  const totalPages = Math.ceil(totalData / AmountDataPerPage); //làm tròn lên số trang chứa dữ liệu
  const [canPressEnd, setCanPressEnd] = useState(true);
  const [canPressStart, setCanPressStart] = useState(true);

  const pageIndex = (pageNumber: number) => {
    // tạo index cho trang được chọn
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
      onPageChange(pageNumber);
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

  return (
    <div className="paging-component">
      <div className="pagination-container">
        <div
          className={`start-arrow ${canPressStart ? "" : "disabled"}`}
          onClick={() => pageIndex(1)}
        >
          <img src={GoStart} alt="GoStart" />
        </div>
        <div
          className={`previous-arrow ${canPressStart ? "" : "disabled"}`}
          onClick={() => pageIndex(page - 1)}
        >
          <img src={Previous} alt="Previous" />
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
                        currentPageIndex === pageNum ? "#009AE3" : "",
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
          <img src={Next} alt="Next" />
        </div>
        <div
          className={`end-arrow ${canPressEnd ? "" : "disabled"}`}
          onClick={() => pageIndex(totalPages)}
        >
          <img src={End} alt="End" />
        </div>
      </div>
      <div className="total-data">
        <p className="label-total-data">Số lượng bản ghi:</p>
        <Input
          placeHolder="No data"
          value={totalData.toString()}
          className="input-total-data"
          disable
        />
      </div>
    </div>
  );
};

export default Pagination;
