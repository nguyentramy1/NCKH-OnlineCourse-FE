import React, { useEffect, useState } from "react";
import "./Table.scss";
import Trash from "../../Assets/Image/trash.png";
import Edit from "../../Assets/Image/edit.svg";
import { useDispatch } from "react-redux";
import { selectedIdsEmployeeActions } from "../../Reduxs/EmployeeIdsSelected/EmployeeIdsSelected";

export interface headerType {
  label: string | React.ReactNode;
  value: string;
  render?: (e: { [key: string]: any }) => React.ReactNode;
  isControl?: boolean;
}

type Props = {
  data: Array<{ [key: string]: any }>;
  pageIndex: number;
  amountDataPerPage: number;
  allData?: Array<{ [key: string]: any }>;
  headers: headerType[];
  needNo?: boolean;
  customIcon?: string;
  needSelect?: boolean;
  onDelete?: (id: string, name: string) => void;
  onUpdate?: (id: string, name: string) => void;
  labelUpdate?: string;
  idFieldName: string;
  nameFieldName: string;
  toolTipDelete?: string;
  toolTipUpdate?: string;
};

const Table: React.FC<Props> = ({
  data,
  allData,
  pageIndex,
  amountDataPerPage,
  headers,
  needNo,
  customIcon,
  needSelect,
  onDelete,
  onUpdate,
  labelUpdate,
  idFieldName,
  nameFieldName,
  toolTipDelete,
  toolTipUpdate,
}) => {
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [tableHeaders, setTableHeaders] = useState<headerType[]>(headers);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    const newSelectedRows = checked
      ? allData?.map((item) => item[idFieldName]) || []
      : [];
    setSelectedRows(newSelectedRows);
  };

  const handleRowSelect = (id: string) => {
    setSelectedRows((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleDragStart = (index: number) => (event: React.DragEvent) => {
    event.dataTransfer.setData("headerIndex", index.toString());
  };

  const handleDrop = (index: number) => (event: React.DragEvent) => {
    const draggedIndex = parseInt(event.dataTransfer.getData("headerIndex"));
    const newTableHeaders = [...tableHeaders];
    const [draggedHeader] = newTableHeaders.splice(draggedIndex, 1);
    newTableHeaders.splice(index, 0, draggedHeader);
    setTableHeaders(newTableHeaders);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  useEffect(() => {
    dispatch(selectedIdsEmployeeActions.setEmployeeIds(selectedRows));
  }, [selectedRows, dispatch]);

  const isAllSelected =
    allData && allData.length > 0 && selectedRows.length === allData.length;

  if (!data || data.length === 0) {
    return <div className="nodata">Không có dữ liệu</div>;
  }

  return (
    <div className="table-father">
      <table className="main-table">
        <thead className="table-custom-header">
          <tr>
            {needNo && (
              <th style={{ width: "30px", textAlign: "center" }}>STT</th>
            )}
            {needSelect && (
              <th style={{ textAlign: "center" }}>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={isAllSelected}
                />
              </th>
            )}
            {tableHeaders.map((header, index) => (
              <th
                key={header.value}
                className={`header-table-cell ${header.value}-column`}
                onDragStart={handleDragStart(index)}
                onDrop={handleDrop(index)}
                onDragOver={handleDragOver}
                draggable
              >
                {header.label}
              </th>
            ))}
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody className="table-content">
          {data.map((dataItem, index) => (
            <tr key={dataItem[idFieldName]}>
              {needNo && (
                <td style={{ width: "30px", textAlign: "center" }}>
                  {index +
                    1 +
                    amountDataPerPage * (pageIndex ? pageIndex - 1 : 0)}
                </td>
              )}
              {needSelect && (
                <td style={{ textAlign: "center" }}>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(dataItem[idFieldName])}
                    onChange={() => handleRowSelect(dataItem[idFieldName])}
                  />
                </td>
              )}
              {tableHeaders.map((header) => (
                <td key={header.value} className={`${header.value}-column`}>
                  {header.render
                    ? header.render(dataItem)
                    : dataItem[header.value]}
                </td>
              ))}
              <td className="actions">
                <div className="btn-actions">
                  {onUpdate &&
                    (labelUpdate ? (
                      <div
                        className="update-btn"
                        onClick={() =>
                          onUpdate(
                            dataItem[idFieldName],
                            dataItem[nameFieldName],
                          )
                        }
                      >
                        {labelUpdate}
                      </div>
                    ) : (
                      <img
                        src={customIcon ? customIcon : Edit}
                        onClick={() =>
                          onUpdate(
                            dataItem[idFieldName],
                            dataItem[nameFieldName],
                          )
                        }
                        alt="change"
                        style={{ cursor: "pointer" }}
                        title={toolTipUpdate}
                      />
                    ))}
                  {onDelete && (
                    <img
                      src={Trash}
                      onClick={() =>
                        onDelete(dataItem[idFieldName], dataItem[nameFieldName])
                      }
                      alt="delete"
                      style={{ cursor: "pointer" }}
                      title={toolTipDelete}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
