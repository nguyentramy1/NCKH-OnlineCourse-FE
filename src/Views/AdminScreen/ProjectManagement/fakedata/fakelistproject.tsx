import { Project } from "../ListProject";
const fakeData = [
  {
    Id: "1",
    UserId: "U001",
    Title: "Dự án Xây dựng",
    Logo: "https://via.placeholder.com/50",
    Description: "Dự án xây dựng khu đô thị mới.",
    Address: "123 Đường ABC, TP. HCM",
    limitedNumber: 10,
    Status: "Đang thực hiện",
  },
  {
    Id: "2",
    UserId: "U002",
    Title: "Ứng dụng Quản lý",
    Logo: "https://via.placeholder.com/50",
    Description: "Ứng dụng quản lý công việc nhóm.",
    Address: "456 Đường XYZ, Hà Nội",
    limitedNumber: 20,
    Status: "Hoàn thành",
  },
  {
    Id: "3",
    UserId: "U003",
    Title: "Dự án Nông nghiệp",
    Logo: "https://via.placeholder.com/50",
    Description: "Mô hình trồng trọt thông minh.",
    Address: "789 Đường LMN, Đà Nẵng",
    limitedNumber: 15,
    Status: "Đang thực hiện",
  },
];

const tableHeaders = [
  { label: "ID", value: "Id" },
  { label: "User ID", value: "UserId" },
  { label: "Tiêu đề", value: "Title" },
  { label: "Mô tả", value: "Description" },
  { label: "Địa chỉ", value: "Address" },
  { label: "Số lượng giới hạn", value: "limitedNumber" },
  { label: "Trạng thái", value: "Status" },
];

export { fakeData, tableHeaders };
