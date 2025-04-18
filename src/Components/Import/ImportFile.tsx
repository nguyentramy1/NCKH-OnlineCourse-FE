import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import Button from "../../Components/Button/Button";
import "./Import.scss";
import { apiService } from "../../AxiosConfig/apiService";
import { useDispatch } from "react-redux";
import { noticeActions } from "../../Reduxs/Notification/Notification";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  salaryID: number;
};

interface DataRow {
  [key: string]: string | number; // Định nghĩa kiểu cho từng hàng dữ liệu
}

const UploadXLSX: React.FC<Props> = ({ onClose, isOpen, salaryID }) => {
  const [data, setData] = useState<DataRow[]>([]); // Dữ liệu từ file XLSX
  const [file, setFile] = useState<File | null>(null); // Biến lưu tệp được chọn
  const [dragging, setDragging] = useState(false); // Trạng thái kéo
  const [fileName, setFileName] = useState<string>(""); // Tên file đã chọn
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Tham chiếu đến input file
  const dispatch = useDispatch();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (
      selectedFile &&
      selectedFile.type ===
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
        setData(jsonData);
      };

      reader.readAsArrayBuffer(selectedFile);
      setFile(selectedFile);
      setFileName(selectedFile.name);

      // Đặt lại giá trị input file
      event.target.value = ""; // Reset input file
    } else {
      alert("Vui lòng chọn file XLSX hợp lệ!");
    }
  };

  // Hàm để mở hộp thoại chọn file
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (file: File, salaryId: string) => {
    // console.log(fileName);
    // apiService
    //   .ImportFile(file, salaryId)
    //   .then((response) => {
    //     console.log("Tải lên thành công:", response.data);
    //     dispatch(
    //       noticeActions.setNotificationSuccess("Tải lên bảng lương thành công"),
    //     );
    //     dispatch(noticeActions.setIsShowNoticeSuccess(true));
    //   })
    //   .catch((error) => {
    //     console.error("Có lỗi xảy ra:", error);
    //     dispatch(
    //       noticeActions.setNotification(
    //         typeof error === "string" ? error : "Có lỗi xảy ra",
    //       ),
    //     );
    //     dispatch(noticeActions.setIsShowNotice(true));
    //   });
  };
  const Import = () => {
    if (file) {
      handleFileUpload(file, salaryID.toString());
    }
    setFileName("");
    setFile(null);
    onClose();
  };
  const exportFomatFile = async () => {
    // try {
    //   const response = await apiService.DownloadFomatfile();
    //   console.log(response);
    //   if (!(response instanceof Blob)) {
    //     throw new Error("Response is not a Blob.");
    //   }

    //   const blob = response; // Gán blob từ response

    //   const url = window.URL.createObjectURL(blob); // Tạo URL từ blob
    //   const a = document.createElement("a");
    //   a.href = url;
    //   a.download = "Tập tin mẫu.xlsx"; // Đặt tên file
    //   document.body.appendChild(a);
    //   a.click(); // Tải file xuống
    //   a.remove(); // Xóa thẻ <a> sau khi tải xong
    //   window.URL.revokeObjectURL(url); // Giải phóng URL
    //   dispatch(noticeActions.setNotificationSuccess("Tải file mẫu thành công"));
    //   dispatch(noticeActions.setIsShowNoticeSuccess(true));
    // } catch (error) {
    //   console.error("Lỗi Export file mẫu:", error);
    //   dispatch(
    //     noticeActions.setNotification(
    //       typeof error === "string" ? error : "Có lỗi xảy ra",
    //     ),
    //   );
    //   dispatch(noticeActions.setIsShowNotice(true));
    // }
  };
  const HandleExportFomatFile = () => {
    exportFomatFile();
    onClose();
  };
  const Close = () => {
    setFileName("");
    setFile(null);
    onClose();
  };

  return (
    <div className="Import">
      <div
        className={`modal-overlay ${isOpen ? "open" : "close"}`}
        onClick={onClose}
      >
        <div
          className={`modal-content ${isOpen ? "open" : "close"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="form-input">
            <div
              className="drop-file"
              style={{
                border: dragging ? "2px dashed green" : "2px dashed gray",
              }}
              //   onDragEnter={handleDragEnter}
              //   onDragLeave={handleDragLeave}
              //   onDrop={handleDrop}
            >
              <div className="icon-import" onClick={handleButtonClick}></div>
              <input
                type="file"
                accept=".xlsx"
                onChange={handleFileChange}
                ref={fileInputRef}
                // style={{ display: "none" }} // Ẩn ô nhập liệu
              />
              <Button label="Tải tệp lên" onClick={handleButtonClick} />
              <p className="fomat">Định dạng hỗ trợ: XLS, XLSX</p>
            </div>
            <div className="export-fomatfile">
              <div className="icon-export"></div>
              <div className="export-button" onClick={HandleExportFomatFile}>
                <p> Tải tập tin mẫu</p>
              </div>
            </div>

            <p className="file-name">
              File đã chọn: <b>{fileName}</b>
            </p>
          </div>
          <div className="form-btn">
            <Button label="Thoát" onClick={Close} className="btn-exit" />
            <Button label="Lưu" onClick={Import} className="btn-save" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadXLSX;
