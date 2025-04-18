import "./Profile.scss";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import useUserProfile from "./UseProfile/useUserProfile";
import { useAppSelector } from "../../store";

import Input from "../../Components/Input/Input";
import imgDefaul from "../../../Assets/Image/Image-Bg.svg";
import { Upload, Button } from "antd"; // Thêm UploadChangeParam
import { UploadChangeParam } from "antd/es/upload/interface";
import { UploadOutlined } from "@ant-design/icons"; // Icon tùy chọn
import { apiService } from "../../AxiosConfig/apiService";
import { useDispatch } from "react-redux";
import { noticeActions } from "../../Reduxs/Notification/Notification";
import NoticeSuccess from "../../Components/Notification/SuccessAlert/NoticeSuccess";
import NoticeError from "../../Components/Notification/ErrorAlert/NoticeError";
import { Select } from "antd";
interface UserProfileData {
  FirstName: string;
  LastName: string;
  DateOfBirth: string;
  Gender: number | null;
  Address: string;
  PhoneNumber: string;
  Email: string;
  Bio: string;
  Language: string[];
  Education: string;
  Skill: string;
  Experience: string;
  Certificate: string;
  AvatarFile: File | null;
}
const Profile = () => {
  const userId = useAppSelector((state) => state.ProfileStore.userId);
  console.log(userId);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error("Ngày không hợp lệ:", dateString);
      return "Invalid Date";
    }
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  // Hàm định dạng ngày cho input type="date" (YYYY-MM-DD)
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error("Ngày không hợp lệ:", dateString);
      return "";
    }
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };
  const getIframeUrl = (avatar?: string) => {
    if (!avatar) return "https://via.placeholder.com/200"; // URL mặc định nếu không có avatar
    if (avatar.includes("drive.google.com")) {
      const id = avatar.match(/id=([^&]+)/)?.[1];
      return id ? `https://drive.google.com/file/d/${id}/preview` : avatar;
    }
    return avatar;
  };
  const { profile, loading, error, refetch } = useUserProfile(userId);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfileData>({
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    Gender: 2,
    Address: "",
    PhoneNumber: "",
    Email: "",
    Bio: "",
    Language: ["Vietnamese"], // Default to array with Vietnamese
    Education: "",
    Skill: "",
    Experience: "",
    Certificate: "",
    AvatarFile: null,
  });
  const displayGender = (gender: number | null) => {
    if (gender === null) return "Not specified";
    return gender === 0 ? "Male" : gender === 1 ? "Female" : "Other";
  };
  useEffect(() => {
    if (profile) {
      setFormData({
        FirstName: profile.firstName ?? "",
        LastName: profile.lastName ?? "",
        DateOfBirth: profile.dateOfBirth
          ? formatDateForInput(profile.dateOfBirth)
          : "",
        Gender: profile.gender ?? 2,
        Address: profile.address ?? "",
        Email: profile.email ?? "",
        PhoneNumber: profile.phoneNumber ?? "",
        AvatarFile: null,
        Education: profile.education ?? "",
        Experience: profile.experience ?? "",
        Certificate: profile.certificate ?? "",
        Skill: profile.skill ?? "",
        Language: profile.language
          ? profile.language.split(",")
          : ["Vietnamese"], // Assuming language is stored as comma-separated string
        Bio: profile.bio ?? "",
      });
    }
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value ?? "",
    }));
  };
  const dispatch = useDispatch();
  const EditProfile = async () => {
    try {
      // Prepare the data object with all required fields
      const data = {
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        DateOfBirth: formData.DateOfBirth,
        Gender: formData.Gender ?? 2, // Default to 2 if null
        Address: formData.Address,
        PhoneNumber: formData.PhoneNumber,
        Email: formData.Email,
        Bio: formData.Bio,
        Language: formData.Language.join(","),
        Education: formData.Education,
        Skill: formData.Skill,
        Experience: formData.Experience,
        Certificate: formData.Certificate,
        AvatarFile: formData.AvatarFile, // Can be null as per API definition
      };

      // Call the API function
      const response = await apiService.editUserProfile(userId, data);

      // Check response success
      if (!response) {
        throw new Error("Network response was not ok");
      }

      // Show success notification
      dispatch(
        noticeActions.setNotificationSuccess("Profile updated successfully")
      );
      dispatch(noticeActions.setIsShowNoticeSuccess(true));

      // Refetch the updated profile data
      refetch();
    } catch (error) {
      console.error("Error updating profile:", error);
      let message = "An error occurred!";
      if (error instanceof Error) {
        message = error.message;
      }
      // Show error notification
      dispatch(noticeActions.setNotification(message));
      dispatch(noticeActions.setIsShowNotice(true));
    }
  };

  const handleSave = async () => {
    EditProfile(); // Gọi API để lưu
    setIsEditing(false); // Thoát chế độ chỉnh sửa nếu thành công
    // console.log("Dữ liệu:", formData);
  };

  const handleImageChange = (info: UploadChangeParam) => {
    // console.log("onChange triggered:", info); // Debug toàn bộ info
    const file = info.fileList[0]?.originFileObj; // Lấy file từ fileList
    // console.log("Selected file:", file); // Debug file
    if (file) {
      setFormData((prev) => ({ ...prev, AvatarFile: file }));
    }
  };
  //thông báo
  const errorr = useAppSelector((state) => state.noticeStore.notifiaction);
  const success = useAppSelector(
    (state) => state.noticeStore.notifiactionSuccess
  );
  const isShowNoticeError = useAppSelector(
    (state) => state.noticeStore.isShowNotice
  );
  const isShowNoticeSuccess = useAppSelector(
    (state) => state.noticeStore.isShowNoticeSuccess
  );
  const handleCloseNotice = () => {
    dispatch(noticeActions.setIsShowNotice(false));
    dispatch(noticeActions.setIsShowNoticeSuccess(false));
  };
  //fetchdata
  const [fetched, setFetched] = useState(false);
  const needToFetch = () => {
    if (isShowNoticeSuccess === true) {
      setFetched((e) => !e);
    }
  };
  useEffect(() => {
    if (fetched) {
      refetch();
      setFetched(false); // Reset after fetching
    }
  }, [fetched]);
  useEffect(() => {
    needToFetch();
    setTimeout(() => {
      dispatch(noticeActions.setNotification(null));
      dispatch(noticeActions.setIsShowNotice(false));
      dispatch(noticeActions.setNotificationSuccess(null));
      dispatch(noticeActions.setIsShowNoticeSuccess(false));
    }, 10000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowNoticeError, isShowNoticeSuccess]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!formData) return <p>No profile data</p>;

  return (
    <div className="profile-container">
      <div
        className={`notice-success ${isShowNoticeSuccess ? "open" : "close"}`}
      >
        <NoticeSuccess
          successNotice={success ? success : ""}
          onClose={handleCloseNotice}
          showError={isShowNoticeSuccess}
        />
      </div>
      <div className={`notice-error ${isShowNoticeError ? "open" : "close"}`}>
        <NoticeError
          errorNotice={errorr ? errorr : ""}
          onClose={handleCloseNotice}
          showError={isShowNoticeError}
        />
      </div>
      <div className="profile-header">
        <div className="avatar-wrapper">
          {formData.AvatarFile ? (
            // Nếu người dùng đã chọn ảnh mới thì preview ảnh đó
            <img
              className="avatar-preview"
              src={URL.createObjectURL(formData.AvatarFile)}
              alt="Preview Avatar"
              width="300"
              height="300"
            />
          ) : (
            // Nếu chưa chọn ảnh thì hiển thị ảnh từ backend (drive.google)
            <iframe
              className="avatar-iframe"
              width="300"
              height="300"
              src={getIframeUrl(profile?.avatar)}
              title="Profile Avatar"
              onError={(e) =>
                console.log("Lỗi tải iframe từ:", profile?.avatar, e)
              }
            />
          )}

          {isEditing && (
            <Upload
              accept="image/*"
              fileList={[]}
              onChange={handleImageChange}
              beforeUpload={() => false}
              maxCount={1}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />} className="upload-button">
                Chọn ảnh
              </Button>
            </Upload>
          )}
        </div>
        <h2 className={isEditing ? "centered" : ""}>
          My profile{" "}
          {!isEditing && (
            <FaEdit className="edit-icon" onClick={() => setIsEditing(true)} />
          )}
        </h2>
      </div>

      <div className="profile-section">
        <h3>Bio</h3>
        {isEditing ? (
          <Input
            placeHolder="bio"
            value={formData.Bio}
            onChange={(e) => setFormData({ ...formData, Bio: e })}
            className="info"
          />
        ) : (
          <p>{formData.Bio}</p>
        )}
      </div>

      <div className="profile-section">
        <h3>Personal information</h3>
        <div className="info-grid">
          {isEditing ? (
            <>
              <Input
                placeHolder="First name"
                value={formData.FirstName}
                onChange={(e) => setFormData({ ...formData, FirstName: e })}
                className="info"
              />
              <Input
                placeHolder="Last name"
                value={formData.LastName}
                onChange={(e) => setFormData({ ...formData, LastName: e })}
                className="info"
              />
              <Input
                placeHolder="Date of Birth"
                type="date"
                value={formData.DateOfBirth}
                onChange={(e) => setFormData({ ...formData, DateOfBirth: e })}
                className="info"
              />

              <select
                name="gender"
                value={formData.Gender?.toString()}
                onChange={(e) =>
                  setFormData({ ...formData, Gender: Number(e.target.value) })
                }
              >
                <option value={0}>Male</option>
                <option value={1}>Female</option>
                <option value={2}>Other</option>
              </select>

              <Input
                placeHolder="Email"
                type="email"
                value={formData.Email}
                onChange={(e) => setFormData({ ...formData, Email: e })}
                className="info"
              />

              <Input
                placeHolder="Phone Number"
                value={formData.PhoneNumber}
                onChange={(e) => setFormData({ ...formData, PhoneNumber: e })}
                className="info"
              />

              <Input
                placeHolder="Address"
                value={formData.Address}
                onChange={(e) => setFormData({ ...formData, Address: e })}
                className="info"
              />
            </>
          ) : (
            <>
              <p>
                <strong>First name:</strong> {formData.FirstName}
              </p>
              <p>
                <strong>Last name:</strong> {formData.LastName}
              </p>
              <p>
                <strong>Date of birth:</strong>{" "}
                {formatDate(formData.DateOfBirth)}
              </p>
              <p>
                <strong>Gender:</strong> {displayGender(formData.Gender)}
              </p>
              <p>
                <strong>Email:</strong> {formData.Email}
              </p>
              <p>
                <strong>Phone:</strong> {formData.PhoneNumber}
              </p>
              <p>
                <strong>Address:</strong> {formData.Address}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="profile-section">
        <h3>Education, skills and certificate</h3>
        {isEditing ? (
          <>
            <p>
              <strong>Education:</strong>
            </p>
            <Input
              placeHolder="Education"
              value={formData.Education}
              onChange={(e) => setFormData({ ...formData, Education: e })}
              className="info"
            />

            <p>
              <strong>Experience:</strong>
            </p>
            <Input
              placeHolder="Experience"
              value={formData.Experience}
              onChange={(e) => setFormData({ ...formData, Experience: e })}
              className="info"
            />

            <p>
              <strong>Certificate:</strong>
            </p>
            <Input
              placeHolder="Certificate"
              value={formData.Certificate}
              onChange={(e) => setFormData({ ...formData, Certificate: e })}
              className="info"
            />

            <p>
              <strong>Skills:</strong>
            </p>
            <Input
              type="text"
              placeHolder="Skill"
              value={formData.Skill}
              onChange={(e) => setFormData({ ...formData, Skill: e })}
              className="info"
            />
          </>
        ) : (
          <>
            <p>
              <strong>Education:</strong> {formData.Education}
            </p>
            <p>
              <strong>Experience:</strong> {formData.Experience}
            </p>
            <p>
              <strong>Certificate:</strong> {formData.Certificate}
            </p>
            <p>
              <strong>Skills:</strong> {formData.Skill}
            </p>
          </>
        )}
      </div>

      <div className="profile-section">
        <h3>Language</h3>
        {isEditing ? (
          <Select
            mode="multiple" // Enable multiple selection
            style={{ width: "100%" }}
            value={formData.Language}
            onChange={(value) => setFormData({ ...formData, Language: value })}
            placeholder="Select languages"
          >
            <Select.Option value="Vietnamese">Vietnamese</Select.Option>
            <Select.Option value="English">English</Select.Option>
            <Select.Option value="French">French</Select.Option>
            {/* Add more language options as needed */}
          </Select>
        ) : (
          <p>{formData.Language.join(", ")}</p> // Display languages in one line with comma separation
        )}
      </div>

      {isEditing && (
        <button className="save-btn" onClick={handleSave}>
          Done
        </button>
      )}
    </div>
  );
};

export default Profile;
