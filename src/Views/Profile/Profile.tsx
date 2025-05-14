import "./Profile.scss";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons"; // Thay FaEdit bằng EditOutlined
import useUserProfile from "./UseProfile/useUserProfile";
import { useAppSelector } from "../../store";
import { Input, Upload, Button, Select } from "antd";
import { UploadChangeParam } from "antd/es/upload/interface";
import { UploadOutlined } from "@ant-design/icons";
import { apiService } from "../../AxiosConfig/apiService";
import { useDispatch } from "react-redux";
import { noticeActions } from "../../Reduxs/Notification/Notification";
import NoticeSuccess from "../../Components/Notification/SuccessAlert/NoticeSuccess";
import NoticeError from "../../Components/Notification/ErrorAlert/NoticeError";
import useCategoryData from "../Course/Hooks/GetAllCategory";

interface UserProfileData {
  FirstName: string;
  LastName: string;
  DateOfBirth: string;
  Gender: number | null;
  Address: string;
  Bio: string;
  Language: string;
  Education: string;
  Skill: string;
  InterestFields: string;
  AvatarFile: File | null;
  PhoneNumber: string;
  Email: string;
  Experience: string;
  Certificate: string;
}

const Profile = () => {
  useCategoryData();
  const userId = useAppSelector((state) => state.ProfileStore.userId);
  const dispatch = useDispatch();

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
    if (!avatar) return "https://via.placeholder.com/150";
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
    Email: "",
    Bio: "",
    Language: "",
    Education: "",
    InterestFields: "",
    Skill: "",
    Experience: "",
    Certificate: "",
    AvatarFile: null,
    PhoneNumber: "",
  });
  const CategoryOption = useAppSelector(
    (state) => state.DropDataStore.CategoryOption
  );
  const displayGender = (gender: number | null) => {
    if (gender === null) return "Không xác định";
    return gender === 0 ? "Nam" : gender === 1 ? "Nữ" : "Khác";
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
        InterestFields: profile.certificate ?? "", //ch chinh
        Skill: profile.skill ?? "",
        Experience: profile.experience ?? "",
        Certificate: profile.certificate ?? "",
        Language: profile.language ?? "",
        Bio: profile.bio ?? "",
      });
      console.log(profile.avatar);
    }
  }, [profile]);

  const handleInputChange = (field: keyof UserProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const EditProfile = async () => {
    try {
      const data = {
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        DateOfBirth: formData.DateOfBirth,
        Gender: formData.Gender ?? 2,
        Address: formData.Address,
        PhoneNumber: formData.PhoneNumber,
        Email: formData.Email,
        Bio: formData.Bio,
        Language: formData.Language,
        Education: formData.Education,
        InterestFields: formData.InterestFields,
        Skill: formData.Skill,
        Experience: formData.Experience,
        Certificate: formData.Certificate,
        AvatarFile: formData.AvatarFile,
      };

      const response = await apiService.editUserProfile(userId, data);
      if (!response) {
        throw new Error("Phản hồi mạng không thành công");
      }

      dispatch(
        noticeActions.setNotificationSuccess("Cập nhật hồ sơ thành công")
      );
      dispatch(noticeActions.setIsShowNoticeSuccess(true));
      refetch();
    } catch (error) {
      console.error("Lỗi khi cập nhật hồ sơ:", error);
      let message = "Đã xảy ra lỗi!";
      if (error instanceof Error) {
        message = error.message;
      }
      dispatch(noticeActions.setNotification(message));
      dispatch(noticeActions.setIsShowNotice(true));
    }
  };

  const handleSave = async () => {
    await EditProfile();
    setIsEditing(false);
  };

  const handleImageChange = (info: UploadChangeParam) => {
    const file = info.fileList[0]?.originFileObj;
    if (file) {
      setFormData((prev) => ({ ...prev, AvatarFile: file }));
    }
  };

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

  const [fetched, setFetched] = useState(false);
  const needToFetch = () => {
    if (isShowNoticeSuccess === true) {
      setFetched((e) => !e);
    }
  };

  useEffect(() => {
    if (fetched) {
      refetch();
      setFetched(false);
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
  }, [isShowNoticeError, isShowNoticeSuccess]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;
  if (!formData) return <p>Không có dữ liệu hồ sơ</p>;

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
          <img
            className="avatar-preview"
            src={profile?.avatar}
            alt="Xem trước Avatar"
            width="150"
            height="150"
          />

          {/* //  <iframe
          //     className="avatar-iframe"
          //     width="150"
          //     height="150"
          //     src={getIframeUrl(profile?.avatar)}
          //     title="Hình đại diện"
          //     onError={(e) =>
          //       console.log("Lỗi tải iframe từ:", profile?.avatar, e)
          //     }
          //   />
          // )} */}
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
          Hồ sơ của tôi{" "}
          {!isEditing && (
            <EditOutlined
              className="edit-icon"
              onClick={() => setIsEditing(true)}
            />
          )}
        </h2>
      </div>

      <div className="profile-section">
        <h3>Giới thiệu</h3>
        {isEditing ? (
          <Input
            placeholder="Giới thiệu bản thân"
            value={formData.Bio}
            onChange={(e) => handleInputChange("Bio", e.target.value)}
            className="info"
          />
        ) : (
          <p>{formData.Bio || "Chưa có giới thiệu"}</p>
        )}
      </div>

      <div className="profile-section">
        <h3>Thông tin cá nhân</h3>
        <div className="info-grid">
          {isEditing ? (
            <>
              <Input
                placeholder="Tên"
                value={formData.FirstName}
                onChange={(e) => handleInputChange("FirstName", e.target.value)}
                className="info"
              />
              <Input
                placeholder="Họ"
                value={formData.LastName}
                onChange={(e) => handleInputChange("LastName", e.target.value)}
                className="info"
              />
              <Input
                placeholder="Ngày sinh"
                type="date"
                value={formData.DateOfBirth}
                onChange={(e) =>
                  handleInputChange("DateOfBirth", e.target.value)
                }
                className="info"
              />
              <Select
                value={formData.Gender?.toString()}
                onChange={(value) =>
                  setFormData({ ...formData, Gender: Number(value) })
                }
                className="info"
                placeholder="Giới tính"
              >
                <Select.Option value="0">Nam</Select.Option>
                <Select.Option value="1">Nữ</Select.Option>
                <Select.Option value="2">Khác</Select.Option>
              </Select>
              <Input
                placeholder="Email"
                type="email"
                value={formData.Email}
                onChange={(e) => handleInputChange("Email", e.target.value)}
                className="info"
              />
              <Input
                placeholder="Số điện thoại"
                value={formData.PhoneNumber}
                onChange={(e) =>
                  handleInputChange("PhoneNumber", e.target.value)
                }
                className="info"
              />
              <Input
                placeholder="Địa chỉ"
                value={formData.Address}
                onChange={(e) => handleInputChange("Address", e.target.value)}
                className="info"
              />
            </>
          ) : (
            <>
              <p>
                <strong>Tên:</strong> {formData.FirstName}
              </p>
              <p>
                <strong>Họ:</strong> {formData.LastName}
              </p>
              <p>
                <strong>Ngày sinh:</strong> {formatDate(formData.DateOfBirth)}
              </p>
              <p>
                <strong>Giới tính:</strong> {displayGender(formData.Gender)}
              </p>
              <p>
                <strong>Email:</strong> {formData.Email}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {formData.PhoneNumber}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {formData.Address}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="profile-section">
        <h3>Học vấn & Lĩnh vực quan tâm</h3>
        {isEditing ? (
          <>
            <p>
              <strong>Học vấn:</strong>
            </p>
            <Select
              value={formData.Education}
              onChange={(value) => handleInputChange("Education", value)}
              className="info"
              placeholder="Chọn trình độ học vấn"
            >
              <Select.Option value="THCS">THCS</Select.Option>
              <Select.Option value="THPT">THPT</Select.Option>
              <Select.Option value="Cao đẳng">Cao đẳng</Select.Option>
              <Select.Option value="Đại học">Đại học</Select.Option>
              <Select.Option value="Sau đại học">Sau đại học</Select.Option>
            </Select>
            <p>
              <strong>Lĩnh vực quan tâm:</strong>
            </p>
            <Select
              mode="multiple"
              value={formData.InterestFields}
              onChange={(value) =>
                setFormData({ ...formData, InterestFields: value })
              }
              className="info"
              placeholder="Chọn lĩnh vực quan tâm"
              options={CategoryOption}
            ></Select>
          </>
        ) : (
          <>
            <p>
              <strong>Học vấn:</strong> {formData.Education || "Chưa cập nhật"}
            </p>
            <p>
              <strong>Lĩnh vực quan tâm:</strong>{" "}
              {formData.InterestFields.length > 0
                ? formData.InterestFields
                : "Chưa cập nhật"}
            </p>
          </>
        )}
      </div>

      <div className="profile-section">
        <h3>Kỹ năng & Chứng chỉ</h3>
        {isEditing ? (
          <>
            <p>
              <strong>Kỹ năng:</strong>
            </p>
            <Input
              placeholder="Kỹ năng"
              value={formData.Skill}
              onChange={(e) => handleInputChange("Skill", e.target.value)}
              className="info"
            />
            <p>
              <strong>Chứng chỉ:</strong>
            </p>
            <Input
              placeholder="Chứng chỉ"
              value={formData.Certificate}
              onChange={(e) => handleInputChange("Certificate", e.target.value)}
              className="info"
            />
          </>
        ) : (
          <>
            <p>
              <strong>Kỹ năng:</strong> {formData.Skill || "Chưa cập nhật"}
            </p>
            <p>
              <strong>Chứng chỉ:</strong>{" "}
              {formData.Certificate || "Chưa cập nhật"}
            </p>
          </>
        )}
      </div>

      <div className="profile-section">
        <h3>Ngôn ngữ</h3>
        {isEditing ? (
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            value={formData.Language}
            onChange={(value) => setFormData({ ...formData, Language: value })}
            placeholder="Chọn ngôn ngữ"
            className="info"
          >
            <Select.Option value="Vietnamese">Tiếng Việt</Select.Option>
            <Select.Option value="English">Tiếng Anh</Select.Option>
            <Select.Option value="French">Tiếng Pháp</Select.Option>
          </Select>
        ) : (
          <p>
            {formData.Language.length > 0 ? formData.Language : "Chưa cập nhật"}
          </p>
        )}
      </div>

      {isEditing && (
        <Button type="primary" className="save-btn" onClick={handleSave}>
          Hoàn tất
        </Button>
      )}
    </div>
  );
};

export default Profile;
