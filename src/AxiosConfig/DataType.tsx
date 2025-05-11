export type apiLoginResponse<T> = {
  statusCode: string;
  message: string;
  data: T;
};
export interface DataLoginType {
  refreshToken: string;
  accessToken: string;
  fullName: string;
  role: string;
}
export interface AuthInfor {
  isAuth: boolean;
  info: DataLoginType | null;
  role: string;
}
export interface Profile {
  fullname: string;
  userId: string;
}

export type apiResponse<T> = {
  statusCode: string;
  message: string;
  data: T;
};

export type apiResponseListData<T> = {
  success: boolean;
  code: string;
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
export interface UserProfile {
  id: string;
  avatar: string;
  status: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  dateOfBirth: string;
  gender: number;
  address: string | null;
  bio: string | null;
  language: string | null;
  education: string;
  skill: string;
  experience: string | null;
  certificate: string | null;
}

export interface Course {
  id: string;
  categoryId: string;
  image: string;
  title: string;
  description: string;
  price: number;
  instructorInfo: string;
  level: number;
  contentVideo: string;
  video: string;
  duration: string;
}
export type ResponeList<T> = {
  items: T[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
export interface Category {
  id: string;
  name: string;
}
export interface Option {
  value: string;
  label: string;
  active?: boolean;
}

export interface CourseUser {
  id: string;
  userId: string;
  courseId: string;
  enrollmentDate: string;
  enrollmentStatus: number;
  progressStatus: number;
}
export interface Order {
  id: string;
  userId: string;
  priceSum: number;
  paymentStatus: number;
}
export interface OrderDatail {
  id: string;
  orderId: string;
  courseId: string;
  price: number;
}
