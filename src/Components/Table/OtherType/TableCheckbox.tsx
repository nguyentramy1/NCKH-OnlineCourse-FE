import React, { useEffect } from "react";
import "./TableOthertype.scss";
import { useAppSelector } from "../../../store";

export interface HeaderType<T = any> {
  label: React.ReactNode;
  value: string;
  render?: (e: T) => React.ReactNode;
}

type Props = {
  data: Array<{ [key: string]: any }>;
  amountDataPerPage: number;
  headers: HeaderType[];
  selectedRows: Set<number>;
  onRowSelect: (id: number) => void;
  onSelectAll: (checked: boolean) => void;
  needNo?: boolean;
  deleteField: string;
  onSelectedChange: (fields: string[]) => void;
};

const Table: React.FC<Props> = ({
  data,
  amountDataPerPage,
  headers,
  selectedRows,
  onRowSelect,
  onSelectAll,
  needNo,
  deleteField,
  onSelectedChange,
}) => {
  const currentIndex = useAppSelector(
    (state) => state.searchStore.currentPageIndex,
  );

  useEffect(() => {
    const selectedDeleteFields = Array.from(selectedRows)
      .map((id) => {
        const row = data.find((item) => item[deleteField] === id);
        return row ? row[deleteField] : null;
      })
      .filter(Boolean) as string[];

    // Chỉ gọi onSelectedChange khi selectedDeleteFields thực sự thay đổi
    if (selectedDeleteFields.length > 0) {
      onSelectedChange(selectedDeleteFields);
    }
  }, [selectedRows, data, deleteField, onSelectedChange]);

  if (!data || data.length === 0) {
    return <div>Không có dữ liệu</div>;
  }

  return (
    <div className="table-father">
      <table className="main-table">
        <thead className="table-header">
          <tr>
            <th style={{ width: "30px", textAlign: "center" }}>
              <input
                type="checkbox"
                onChange={(e) => onSelectAll(e.target.checked)}
                checked={selectedRows.size === data.length}
              />
            </th>
            {needNo && (
              <th style={{ width: "30px", textAlign: "center" }}>STT</th>
            )}
            {headers.map((header) => (
              <th key={header.value} className={`${header.value}-column`}>
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-content">
          {data.map((row, index) => (
            <tr key={index}>
              <td style={{ textAlign: "center" }}>
                <input
                  type="checkbox"
                  checked={selectedRows.has(row[deleteField])}
                  onChange={() => onRowSelect(row[deleteField])}
                />
              </td>
              {needNo && (
                <td style={{ width: "30px", textAlign: "center" }}>
                  {index +
                    1 +
                    amountDataPerPage * (currentIndex ? currentIndex - 1 : 0)}
                </td>
              )}
              {headers.map((header) => (
                <td key={header.value} className={`${header.value}-column`}>
                  {header.render ? header.render(row) : row[header.value]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
