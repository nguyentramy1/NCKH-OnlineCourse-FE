import React, { useState } from "react";
import * as XLSX from "xlsx";

interface DataRow {
  [key: string]: string | number; // Định nghĩa kiểu cho từng hàng dữ liệu
}

const UploadXLSX: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]); // Dữ liệu từ file XLSX
  const [dragging, setDragging] = useState(false); // Trạng thái kéo

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (
      file &&
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const jsonData: DataRow[] = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]],
        );
        setData(jsonData); // Lưu dữ liệu vào state
        console.log(jsonData); // Xử lý dữ liệu ở đây
      };

      reader.readAsArrayBuffer(file); // Đọc file dưới dạng ArrayBuffer
    } else {
      alert("Vui lòng chọn file XLSX hợp lệ!");
    }
  };

  const handleDragEnter = (event: React.DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    setDragging(false);
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange({
        target: { files },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        margin: "20px",
        overflow: "auto",
        maxHeight: "840px",
      }}
    >
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          padding: "10px",
          border: dragging ? "2px dashed green" : "2px dashed gray",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "border 0.3s",
        }}
      />
      {data.length > 0 && (
        <div>
          <h3>Dữ liệu từ file XLSX:</h3>
          <table
            style={{
              margin: "0 auto",
              borderCollapse: "collapse",
              width: "80%",
            }}
          >
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th
                    key={key}
                    style={{ border: "1px solid black", padding: "8px" }}
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, idx) => (
                    <td
                      key={idx}
                      style={{ border: "1px solid black", padding: "8px" }}
                    >
                      {value !== undefined ? value : "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UploadXLSX;
