import "./TableOthertype.scss";
import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../store";
import Button from "../../../Components/Button/Button";
import { Edit, Eye, Trash2 } from "lucide-react";
import DeleteWarning from "../../../Components/WarningForm/deleteWarning";

import { Select } from "antd";
import useUpdateUserStatus from "../data/useupdateUserStatus";

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
  dataTabletype: string;
  editField?: string;
  idSelect: string;
  idTable?: number;
  needEdit?: boolean;
  needDelete?: boolean;
  needDetail?: boolean;
  needViewResult?: boolean;
};
const Dropdown: React.FC<{
  row: { [key: string]: any };
  header: headerType;
}> = ({ row, header }) => {
  const [statusValue, setStatusValue] = useState<number>(
    typeof row[header.value] === "number" ? row[header.value] : 0
  );
  const [trigger, setTrigger] = useState<boolean>(false);

  const { refetch } = useUpdateUserStatus(row["id"], trigger);
  console.log("edit paymentStatus data:", row["id"]);
  // Đồng bộ statusValue với row[header.value]
  useEffect(() => {
    setStatusValue(
      typeof row[header.value] === "number" ? row[header.value] : 0
    );
  }, [row[header.value]]);

  useEffect(() => {
    if (trigger) {
      refetch(); // Gọi API
      setTrigger(false); // Reset trigger sau khi gọi
    }
  }, [trigger, refetch]);

  const handleChange = (value: number) => {
    if (value !== statusValue) {
      setStatusValue(value);
      setTrigger(true); // Kích hoạt trigger để gọi API
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Select
        value={statusValue}
        placeholder="Applied"
        style={{ width: "150px", color: "red" }}
        onChange={handleChange}
        options={[
          { value: 0, label: "Chờ xử lý" },
          { value: 1, label: "Thành công" },
          { value: 2, label: "Thất bại" },
        ]}
      />
    </div>
  );
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
  needViewResult,
  needDetail,
}) => {
  const currentIndex = useAppSelector(
    (state) => state.searchStore.currentPageIndexST
  );
  const [currentIdToDelete, setCurrentIdToDelete] = useState<number | null>(
    null
  );
  const [IsDelete, setIsDelete] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isView, setIsView] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isApproveMem, setIsApproveMem] = useState<boolean>(false);
  const [IdEdit, setIdEdit] = useState<string>("");
  const [UserId, setUserId] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>();
  if (!data || data.length === 0) {
    return <div>Không có dữ liệu</div>;
  }

  const handleDeleteClick = (id: number) => {
    setCurrentIdToDelete(id);
    console.log("id pj", id);
    setIsDelete(true);
  };
  const handleDetailClick = (id: string) => {
    setUserId(id);
    console.log("id pj", id);
    setIsView(true);
  };

  const handleEditClick = (id?: string) => {
    if (id && id !== "") {
      // console.log("id để update", id);
      setIdEdit(id);
      setIsEdit(true);
    } else {
      console.error("ID bị thiếu!");
    }
  };

  const handleCloseModal = () => {
    setIsView(false);
    setCurrentIdToDelete(null);
    setIsDelete(false);
    setIsEdit(false);
    setIsPending(false);
    setIsApproveMem(false);
  };

  return (
    <div className="table-father">
      <table className="main-table">
        <thead className="table-header">
          <tr>
            {needNo && <th style={{ textAlign: "center" }}>STT</th>}
            {headers.map((header, index) => (
              <th key={index}> {header.label}</th>
            ))}

            {(needEdit || needDelete || needDetail) && (
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
                    <Dropdown row={row} header={header} />
                  ) : header.render ? (
                    header.render(row)
                  ) : (
                    row[header.value]
                  )}
                </td>
              ))}

              {(needEdit || needDelete || needDetail) && (
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
                    {needViewResult && (
                      <Button
                        label={
                          <div className="resultcomponent" title="view result">
                            <div onClick={() => {}} className="view-icon" />
                            <span>Result</span>
                          </div>
                        }
                        onClick={() => {}}
                        className="result"
                      ></Button>
                    )}
                    {needDetail && (
                      <Button
                        label={<Eye color="#168c7f" />}
                        onClick={() => {
                          handleDetailClick(row[idSelect]);
                        }}
                        className="detail"
                      ></Button>
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
      {/* {ReactDOM.createPortal(
        <FormUserDetail
          isOpen={isView}
          onClose={handleCloseModal}
          id={UserId}
        />,
        document.body
      )} */}
      {/* {ReactDOM.createPortal(
        <FormPending
          isOpen={isPending}
          onClose={handleCloseModal}
          idProject={IdEdit}
        />,
        document.body
      )} */}
      {/* {ReactDOM.createPortal(
        <FormApproveMember
          isOpen={isApproveMem}
          onClose={handleCloseModal}
          idProject={IdEdit}
        />,
        document.body
      )} */}
    </div>
  );
};

export default Table;
