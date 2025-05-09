import React, { useState, useEffect } from "react";
import "./TableOthertype.scss";
import { useAppSelector } from "../../../store";
import Button from "../../../Components/Button/Button";
import { Edit, Trash2 } from "lucide-react";
import DeleteWarning from "../../../Components/WarningForm/deleteWarning";
import ReactDOM from "react-dom";
import FormUpdateExpense from "../FormUpdate";
import FormUpdateCategory from "../FormUpdate";

export interface headerType<T = any> {
  label: React.ReactNode;
  value: string;
  render?: (e: T) => React.ReactNode;
}

type Props = {
  data: Array<{ [key: string]: any }>;
  headers: headerType[];
  amountDataPerPage: number;
  hiddenColumns?: string[];
  needNo?: boolean;
  dataTabletype?: string;
  editField?: string;
  idSelect: string;
  idTable?: number;
  needEdit?: boolean;
  needDelete?: boolean;
};

const Table: React.FC<Props> = ({
  data,
  headers,
  amountDataPerPage,
  needNo,
  dataTabletype,
  editField,
  idSelect,
  needEdit,
  needDelete,
}) => {
  const currentIndex = useAppSelector(
    (state) => state.searchStore.currentPageIndexST
  );
  const [currentIdToDelete, setCurrentIdToDelete] = useState<number | null>(
    null
  );
  const [IsDelete, setIsDelete] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isEditDetail, setisEditDetail] = useState<boolean>(false);
  const [isApproveMem, setIsApproveMem] = useState<boolean>(false);
  const [IdEdit, setIdEdit] = useState<string>("");

  if (!data || data.length === 0) {
    return <div>Không có dữ liệu</div>;
  }

  const handleDeleteClick = (id: number) => {
    setCurrentIdToDelete(id);
    console.log("id pj", id);
    setIsDelete(true);
  };

  const handleEditClick = (id?: string) => {
    if (id && id !== "") {
      // console.log("id để update", id);
      setIdEdit(id);
      if (dataTabletype == "expensedetail") {
        setisEditDetail(true);
      } else {
        setIsEdit(true);
      }
    } else {
      console.error("ID bị thiếu!");
    }
  };

  const handleCloseModal = () => {
    setCurrentIdToDelete(null);
    setIsDelete(false);
    setIsEdit(false);
    setisEditDetail(false);
    setIsApproveMem(false);
  };

  return (
    <div className="table-expense">
      <table className="main-table">
        <thead className="table-header">
          <tr>
            {needNo && <th style={{ textAlign: "center" }}>STT</th>}
            {headers.map((header, index) => (
              <th key={index}> {header.label}</th>
            ))}

            {(needDelete || needEdit) && (
              <th style={{ minWidth: "100px", textAlign: "center" }}> </th>
            )}
          </tr>
        </thead>
        <tbody className="table-content">
          {data.map((row, index) => (
            <tr key={index}>
              {needNo && (
                <td style={{ width: "auto", textAlign: "center" }}>
                  {index +
                    1 +
                    amountDataPerPage * (currentIndex ? currentIndex - 1 : 0)}
                </td>
              )}

              {headers.map((header) => (
                <td key={header.value} className={`${header.value}-column`}>
                  {header.value === editField ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center", // Căn giữa theo chiều ngang
                        alignItems: "center", // Căn giữa theo chiều dọc
                        textAlign: "center",
                        width: "100%", // Đảm bảo div chiếm toàn bộ chiều rộng
                      }}
                    >
                      <Button
                        onClick={() => {}}
                        label={
                          row.status === 0 ? (
                            <div className="Ongoing">
                              Ongoing
                              {header.render
                                ? header.render("")
                                : row[header.value]}
                            </div>
                          ) : (
                            <div className="Completed">
                              Completed
                              {header.render
                                ? header.render("")
                                : row[header.value]}
                            </div>
                          )
                        }
                        className="Editbutton"
                      />
                    </div>
                  ) : header.render ? (
                    header.render(row)
                  ) : (
                    row[header.value]
                  )}
                </td>
              ))}

              {(needDelete || needEdit) && (
                <td>
                  <div className="btn-actions">
                    {needEdit && (
                      <div className="edit">
                        <Edit
                          onClick={() => {
                            if (row[idSelect]) {
                              handleEditClick(row[idSelect]);
                            } else {
                              console.error("ID không hợp lệ!", row);
                            }
                          }}
                          style={{
                            cursor: "pointer",
                            width: "24px", // Đảm bảo sử dụng đơn vị đúng (px)
                            height: "24px",
                            color: "#192cff",
                          }}
                        />
                      </div>
                    )}
                    {needDelete && (
                      <div className="delete">
                        <Trash2
                          onClick={() => handleDeleteClick(row[idSelect])}
                          style={{
                            cursor: "pointer",
                            width: "24px", // Đảm bảo sử dụng đơn vị đúng (px)
                            height: "24px",
                            color: " #ff1900",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {ReactDOM.createPortal(
        <DeleteWarning
          isOpen={IsDelete}
          onClose={handleCloseModal}
          dataType={dataTabletype}
          id={currentIdToDelete?.toString() ?? ""}
        />,
        document.body
      )}
      {ReactDOM.createPortal(
        <FormUpdateCategory
          isOpen={isEdit}
          onClose={handleCloseModal}
          id={IdEdit ?? ""}
        />,
        document.body
      )}
    </div>
  );
};

export default Table;
