export type apiLoginResponse<T> = {
  statusCode: string;
  message: string;
  data: T;
};
export interface DataLoginType {
  refreshToken: string;
  accessToken: string;
  fullName: string;
}
export interface AuthInfor  {
  isAuth: boolean;
  info: DataLoginType | null;
  role: string;

}
export interface Profile  {
  unique_name: string;
  userId: string;
}

///////////
export type apiResponse<T> = {
  success: boolean;
  code: number;
  message: string;
  result: T;
};

export type apiResponseListData<T> = {
  success: boolean;
  code: number;
  message: string;
  result: T[];
};

export type apiResponseUserDetails = {
  result: infoType | null;
};

export type dataType = {
  success: boolean;
  code: number;
  message: string;
  result: infoType;
};

export type resultType = {
  success: boolean;
  code: number;
  message: string;
};

export interface nullData {}

export interface oneline {
  value: string;
}

export interface AccountInfo {
  isAuth: boolean;
  info: infoType | null;
  departmentid: string;
  departmentName: string;
}

export interface listUser {
  userId: number;
  username: string;
  departmentName: string;
}

export interface registerUser {
  fullname: string;
  national: string | undefined;
  dob: string;
  email: string;
  departmentId: string;
  gender: string;
  cccd: string;
}

export interface infoType {
  userId?: string;
  token?: string;
  username?: string;
  fullname?: string;
  dob?: string;
  national?: string;
  email?: string;
  role?: string;
  active?: boolean;
  departmentName?: string;
  gender?: string;
  cccd?: string;
  departmentId?: string;
  password?: string;
}

export interface Department {
  departmentId: number;
  departmentName: string;
  active?: boolean;
}

export interface SalaryPeriod {
  salaryPeriodId: number;
  period: string;
  active: boolean;
}

export interface Salary {
  salaryId: number;
  name: string;
  departmentName: string;
  period: string;
}
export interface SalaryDetail {
  employeeId: number;
  employeeName: string;
  budget: number;
  workDay: number | null;
  totalSalary: number | null;
}

export interface employee {
  employeeId: number;
  employeeName: string;
  budget?: string;
  email: string;
  department: Department;
  active: boolean;
}
export interface listEmployeeInDepart<T> {
  departmentName: string;
  departmentId: string;
  employees: T[];
}
export interface Employee {
  employeeName: string;
  department: string;
  employeeId: number;
  email: string;
  budget: number;
}
