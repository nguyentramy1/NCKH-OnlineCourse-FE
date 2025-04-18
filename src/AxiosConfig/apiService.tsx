import API from "./axiosConfig";
import { infoType, registerUser } from "./DataType";

export const apiService = {
  // API đăng nhập
  login: (data: { username: string; password: string }) => {
    return API.post("/api/AdminAuthen/login", data);
  },
  refresh: (data: { refreshToken: string }) => {
    return API.post("/api/AdminAuthen/refresh", data);
  },
  logout: () => {
    return API.post("/api/AdminAuthen/logout");
  },
  signup: (data: {
    username: string;
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    return API.post("/api/AdminAuthen/signUp", data);
  },
  //UserProfile
  getListUserProfile: (data: { pageIndex?: number; pageSize?: number }) => {
    return API.post("/api/UserProfile/filter", data);
  },
  getUserProfile: (id: string) => {
    return API.get(`/api/UserProfile/${id}`);
  },
  UploadAvatar: (id: string, file: File) => {
    return API.post(`/api/UserProfile/uploadAvatar/${id}`, file);
  },

  editUserProfile: (
    id: string,
    data: {
      FirstName: string;
      LastName: string;
      DateOfBirth: string;
      Gender: number;
      Address: string;
      PhoneNumber: string;
      Email: string;
      Bio: string;
      Language: string;
      Education: string;
      Skill: string;
      Experience: string;
      Certificate: string;
      AvatarFile: File | null; // Sửa thành File | null để cho phép không có ảnh
    }
  ) => {
    // Tạo FormData để gửi dữ liệu
    const formData = new FormData();
    formData.append("FirstName", data.FirstName);
    formData.append("LastName", data.LastName);
    formData.append("DateOfBirth", data.DateOfBirth);
    formData.append("Gender", data.Gender.toString());
    formData.append("Address", data.Address);
    formData.append("PhoneNumber", data.PhoneNumber);
    formData.append("Email", data.Email);
    formData.append("Bio", data.Bio);
    formData.append("Language", data.Language);
    formData.append("Education", data.Education);
    formData.append("Skill", data.Skill);
    formData.append("Experience", data.Experience);
    formData.append("Certificate", data.Certificate);

    // Chỉ thêm AvatarFile nếu nó tồn tại
    if (data.AvatarFile) {
      formData.append("AvatarFile", data.AvatarFile);
    }

    // Gửi yêu cầu với FormData
    return API.put(`/api/UserProfile/edit/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Đảm bảo header đúng
      },
    });
  },
  DeleteAvaterUserProfile: (id: string) => {
    return API.delete(`/api/UserProfile/deleteAvatar?userId=${id}`);
  },
  updateUserStatus: (userId: string, status: number) => {
    return API.put(`/api/UserProfile/status/${userId}`, status);
  },
};
