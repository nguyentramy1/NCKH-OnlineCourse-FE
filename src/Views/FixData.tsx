interface Option {
  value: string;
  label: string;
  active?: boolean;
}

const fixedStatusAdmin: Option[] = [
  { value: "0", label: "Pending" },
  { value: "1", label: "InProgress" },
  { value: "2", label: "Completed" },
  { value: "3", label: "Rejected" },
];
const FixLevel: Option[] = [
  { value: "0", label: "Trước đại học" },
  { value: "1", label: "Đại học" },
  { value: "2", label: "Sau đại học" },
  // { value: "3", label: "Rejected" },
];
const fixedUser: Option[] = [
  { value: "0", label: "Active" },
  { value: "1", label: "Inactive" },
];

export { FixLevel, fixedStatusAdmin, fixedUser };
