import React, { useState, useEffect } from "react";
import "./TableOthertype.scss";
import { useAppSelector } from "../../../store";
import Button from "../../Button/Button";
import trashicon from "./assets/trash.png";
import editicon from "./assets/edit.png";
import add from "./assets/add.png";
import DeleteWarning from "../../WarningForm/deleteWarning";
import ReactDOM from "react-dom";
// import EditDay from "../../../Views/Details/Form/EditDay";
// import AddDay from "../../../Views/Details/Form/AddDay";
import Resizetable from "./Resizetable"; // Nhập khẩu component ResizableHeader

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
  selectedRows: Set<number>;
  onRowSelect: (id: number) => void;
  onSelectAll: (checked: boolean) => void;
  needNo?: boolean;
  dataTabletype?: string;
  deleteField: string;
  editField?: string;
  idSelect: string;
  idTable?: number;
  columnWidth: number;
  toltal: number;
};

const Table: React.FC<Props> = ({
  data,
  headers,
  selectedRows,
  amountDataPerPage,
  onRowSelect,
  onSelectAll,
  needNo,
  dataTabletype,
  deleteField,
  editField,
  idSelect,
  idTable,
  hiddenColumns,
  columnWidth,
  toltal,
}) => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [columnWidths, setColumnWidths] = useState<number[]>(
    headers.map(() => columnWidth),
  ); // Chiều rộng mặc định cho các cột
  const [isIndeterminate, setIsIndeterminate] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    // Cập nhật trạng thái isIndeterminate khi selectedRows thay đổi
    setIsIndeterminate(selectedRows.size > 0 && selectedRows.size < toltal);
  }, [selectedRows, toltal]);

  const shouldHideColumn = (columnName: string) => {
    if (screenSize < 780) {
      return (
        hiddenColumns?.includes(columnName) ||
        columnName === "delete" ||
        columnName === "empty"
      );
    }
    return false;
  };

  const currentIndex = useAppSelector(
    (state) => state.searchStore.currentPageIndexST,
  );
  const [currentIdToDelete, setCurrentIdToDelete] = useState<number | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [currentDay, setCurrentDay] = useState<number | null>(null);
  const [employeeId, setemployeeId] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return <div>Không có dữ liệu</div>;
  }

  const handleResize = (delta: number, columnIndex: number) => {
    setColumnWidths((prevWidths) => {
      const newWidths = [...prevWidths];
      newWidths[columnIndex] += delta; // Thay đổi kích thước cột hiện tại

      // Kiểm tra cột bên phải
      if (columnIndex < newWidths.length - 1) {
        newWidths[columnIndex + 1] -= delta; // Giảm chiều rộng cột bên phải
      }

      return newWidths;
    });
  };

  const handleDeleteClick = (id: number) => {
    setCurrentIdToDelete(id);
    setIsOpen(true);
  };

  const handleEditClick = (id: number, employeeId: number) => {
    setCurrentDay(id);
    setIsEdit(true);
    setemployeeId(employeeId);
  };

  const handleAddClick = (employeeId: number) => {
    setIsAdd(true);
    setemployeeId(employeeId);
  };

  const handleCloseModal = () => {
    setCurrentIdToDelete(null);
    setCurrentDay(null);
    setIsOpen(false);
    setIsEdit(false);
    setIsAdd(false);
  };

  return (
    <div className="table-father">
      <table className="main-table">
        <thead className="table-header">
          <tr>
            {!shouldHideColumn("checkbox") && (
              <th style={{ width: "30px", textAlign: "center" }}>
                <input
                  type="checkbox"
                  onChange={(e) => onSelectAll(e.target.checked)}
                  ref={(input) => {
                    if (input) {
                      input.indeterminate = isIndeterminate;
                    }
                  }}
                />
              </th>
            )}
            {needNo && !shouldHideColumn("STT") && (
              <th style={{ width: "40px", textAlign: "center" }}>STT</th>
            )}
            {headers.map((header, index) =>
              !shouldHideColumn(header.value) ? (
                <Resizetable
                  key={header.value}
                  onResize={(delta) => handleResize(delta, index)} // Sửa ở đây
                  width={columnWidths[index]}
                >
                  {header.label}
                </Resizetable>
              ) : null,
            )}
            {/* {showEditButton && !shouldHideColumn("edit") && (
              <th style={{ textAlign: "right", width: "40px" }}></th>
            )} */}
            {!shouldHideColumn("empty") && (
              <th style={{ width: "40px", textAlign: "center" }}></th>
            )}
          </tr>
        </thead>
        <tbody className="table-content">
          {data.map((row, index) => (
            <tr key={index}>
              {!shouldHideColumn("checkbox") && (
                <td style={{ textAlign: "center" }}>
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row[idSelect])}
                    onChange={() => onRowSelect(row[idSelect])}
                  />
                </td>
              )}
              {needNo && !shouldHideColumn("stt") && (
                <td style={{ width: "auto", textAlign: "center" }}>
                  {index +
                    1 +
                    amountDataPerPage * (currentIndex ? currentIndex - 1 : 0)}
                </td>
              )}

              {headers.map((header) =>
                !shouldHideColumn(header.value) ? (
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
                        <div>
                          {header.render
                            ? header.render(row)
                            : row[header.value]}
                        </div>
                        <div className="Editbutton">
                          <Button
                            onClick={() => {
                              if (
                                editField &&
                                (row[editField] != null || row[editField] === 0)
                              ) {
                                handleEditClick(
                                  row[editField],
                                  row["employeeId"],
                                );
                              } else if (editField && !row[editField]) {
                                handleAddClick(row[idSelect]);
                              }
                            }}
                            label={
                              row.workDay != null || row.workDay === 0 ? (
                                <img
                                  src={editicon}
                                  alt="Edit"
                                  style={{ width: "20px", height: "20px" }}
                                />
                              ) : (
                                <div className="icon-edit" />
                              )
                            }
                            className="edit-button"
                          />
                        </div>
                      </div>
                    ) : header.render ? (
                      header.render(row)
                    ) : (
                      row[header.value]
                    )}
                  </td>
                ) : null,
              )}

              {!shouldHideColumn("delete") && (
                <td
                  style={{
                    width: "40px",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    onClick={() => handleDeleteClick(row[deleteField])}
                    label={
                      <img
                        src={trashicon}
                        alt="Delete"
                        style={{ width: "20px", height: "20px" }}
                      />
                    }
                    className="delete-button"
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {ReactDOM.createPortal(
        <DeleteWarning
          isOpen={isOpen}
          onClose={handleCloseModal}
          dataType={dataTabletype}
          iditem={currentIdToDelete !== null ? [currentIdToDelete] : []}
          id={idTable ? idTable : undefined}
        />,
        document.body,
      )}
      {/* {ReactDOM.createPortal(
        <EditDay
          isOpen={isEdit}
          onClose={handleCloseModal}
          currentday={currentDay ? currentDay : 0}
          idtable={idTable}
          employeeId={employeeId ? employeeId : 0}
        />,
        document.body
      )}
      {ReactDOM.createPortal(
        <AddDay
          isOpen={isAdd}
          onClose={handleCloseModal}
          employeeId={employeeId ? employeeId : 0}
          idtable={idTable}
        />,
        document.body
      )} */}
    </div>
  );
};

export default Table;
