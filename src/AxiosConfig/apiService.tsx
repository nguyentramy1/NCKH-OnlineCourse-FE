import API from "./axiosConfig";
import { infoType, registerUser } from "./DataType";

export const apiService = {
  // API đăng nhập
  login: (data: { username: string; password: string }) => {
    return API.post("/api/AdminAuthen/login", data);
  },
  refresh: (data: {refreshToken: string }) => {
    return API.post("/api/AdminAuthen/refresh", data);
  },
  logout: () => {
    return API.post("/api/AdminAuthen/logout");
  },
  signup:  (data: {  username: string, fullName:string, email:string, password: string, confirmPassword: string }) => {
    return API.post("/api/AdminAuthen/signUp",data);
  },
  ///////////////////
  register: (data: registerUser) => {
    return API.post("/user/register", data);
  },
  auth: () => {
    return API.get("/auth/isValidToken");
  },
  updateUserByAdmin: (dataUser: infoType) => {
    return API.put("/user/updateUserByAdmin", dataUser);
  },
  userUpdateAccount: (dataForUser: infoType) => {
    return API.put("/user/updateUser", dataForUser);
  },
  updatePassword: (data: { oldPassword: string; newPassword: string }) => {
    return API.put("/user/updatePassword", data);
  },
  
  getAllDepartment: () => {
    return API.get("/department/getAllDepartment");
  },
  addNewDepartment: (data: { departmentName: string }) => {
    return API.post("/department/createDepartment", data);
  },
  getAllUser: () => {
    return API.get("/user/getAllUser");
  },
  getSalaryPeriod: () => {
    return API.get("/api/salary_period");
  },
  getAllSalaries: () => {
    return API.get("/api/salary");
  },
  getInfoOwnerAccount: () => {
    return API.get("/user/getUserInfoByToken");
  },
  addSalaryByUser: (data: {
    name: string;
    salaryPeriod: { salaryPeriodId: number };
  }) => {
    return API.post("/api/salary/addByUser", data);
  },
  addSalaryByAdmin: (data: {
    name: string;
    department: { departmentId: number };
    salaryPeriod: { salaryPeriodId: number };
    active: boolean;
  }) => {
    return API.post("/api/salary/addByAdmin", data);
  },
  getManageDepartment: () => {
    return API.get("/department/getManageDepartment");
  },
  getDetailsSalary: (id: number) => {
    return API.get(`api/salary_details/findBySalary/${id}`);
  },
  getUserDetailsById: (id: number) => {
    return API.get(`/user/getUserDetailsById?id=${id}`);
  },

  updateSalary: (
    id: number,
    data: {
      name: string | undefined;
      department: { departmentId: number | undefined };
      salaryPeriod: { salaryPeriodId: number | undefined };
    },
  ) => {
    return API.put(`/api/salary/${id}`, data);
  },
  deleteSalary: (data: { salaryIds: number[] }) => {
    return API.delete("/api/salary/inactive", { data });
  },
  deleteSalaryDetail: (id: number, data: { employeeIds: number[] }) => {
    return API.delete(`/api/salary_details/delete/${id}`, { data });
  },
  deleteAccountUser: (id: string) => {
    return API.delete(`/user/deleteUser?id=${id}`);
  },
  deleteDepartment: (id: string) => {
    return API.delete(`/department/deleteDepartment?id=${id}`);
  },
  deleteEmpoyeeOutOfDepartment: (
    id: string,
    data: {
      employeeIds: string[];
    },
  ) => {
    return API.put(
      `/department/deleteExistingEmployeeFromDepartment/${id}`,
      data,
    );
  },
  getEmployees: () => {
    return API.get(`/api/employees`);
  },
  addNewEmployee: (data: {
    cccd: string;
    employeeName?: string;
    budget?: number | null;
    email?: string;
    department: { departmentId?: number };
    active: boolean;
  }) => {
    return API.post(`/api/employees/createEmployee`, data);
  },
  updateEmployee: (
    id: string,
    data: {
      budget?: number | null;
      email?: string;
      department?: { departmentId?: number };
      active: boolean;
    },
  ) => {
    return API.put(`/api/employees/updateEmployee/${id}`, data);
  },
  addEmployeetoDetail: (data: {
    employeeIds: number[];
    salary: { salaryId: number };
  }) => {
    return API.post("/api/salary_details/add_employee", data);
  },
  updateWorkDay: (
    employeeId: number,
    salaryId: number,
    data: { workDay: number },
  ) => {
    return API.put(
      `/api/salary_details/update?employeeId=${employeeId}&salaryId=${salaryId}`,
      data,
    );
  },
  ExportDetail: (id: number) => {
    return API.get(`/api/salary_details/download/${id}`, {
      responseType: "blob", // Đảm bảo rằng phản hồi là blob
    });
  },
  employeePayroll: () => {
    return API.put(`/api/salary_details/totalSalary`);
  },
  updateDepartmentName: (data: { departmentName: string }, id: string) => {
    return API.put(`/department/${id}`, data);
  },
  ImportFile: (file: File, salaryId: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("salaryId", salaryId);

    return API.post("/api/salary_details/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  addSalariePeriod: (data: { period: string }) => {
    return API.post("/api/salary_period", data);
  },
  DownloadFomatfile: () => {
    return API.get(`/api/salary_details/download-excel`, {
      responseType: "blob", // Đảm bảo rằng phản hồi là blob
    });
  },
  sendVerifyEmail: (email: string) => {
    return API.post(`/auth/sendVerificationEmail?email=${email}`);
  },
  verifyCodeEmail: (data: { email: string; verificationCode: string }) => {
    return API.post("/auth/verifyEmail", data);
  },
  getAllSalaryPeriod: () => {
    return API.get(`/api/employees`);
  },
};
