import { useNavigate } from "react-router-dom";
import { headerType } from "../../../Components/Table/OtherType/TableCheckbox-delete";
import { Category } from "../../../AxiosConfig/DataType";
import { useAppDispatch } from "../../../store";

export const useCustomHeaders = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  // Sử dụng Intl.NumberFormat để định dạng tiền tệ VND
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const headersCustom: headerType<Category>[] = [
    {
      label: "Danh mục",
      value: "title",
      render: (e: Category) => (
        <span
          style={{
            maxWidth: "700px",
            width: "auto",
            display: "flex",
            color: "#237BFF",
            cursor: "pointer",
            fontWeight: "600",
            whiteSpace: "nowrap", // Ngăn không cho tên xuống dòng
            overflow: "hidden", // Ẩn phần thừa
            textOverflow: "ellipsis",
          }}
        >
          {e.name}
        </span>
      ),
    },
  ];
  return { headersCustom };
};
