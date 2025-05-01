import React, { useState } from "react";
import Button from "../../../Components/Button/Button";
import { apiResponse, nullData } from "../../../AxiosConfig/DataType";
import { apiService } from "../../../AxiosConfig/apiService";
import { Upload } from "antd"; // Thêm UploadOutlined
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/es/upload/interface";
import { useDispatch } from "react-redux";
import { noticeActions } from "../../../Reduxs/Notification/Notification";
import "./Form.scss";
import Input from "../../../Components/Input/Input";
import DropDownField, {
  optionType,
} from "../../../Components/FieldDropDown/DropDownField";
import { useAppSelector } from "../../../store";
import ImageBg from "../../../Assets/Image/add-image.png";
import { FixLevel } from "../../FixData";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  refetch: () => void;
};

const FormAdd: React.FC<Props> = ({ onClose, isOpen, refetch }) => {
  const [Title, setTexTitle] = useState("");
  const [Owner, setTexOwner] = useState("");
  const [Duration, setTexDuration] = useState("");
  const [SelectedCategory, setSelectedCategory] = useState<optionType | null>(
    null
  );
  const [LimitedMember, setLimittedMember] = useState<number | null>(null);
  const [Image, setImage] = useState<File | null>(null);
  const [Video, setVideo] = useState<File | null>(null);
  const [SelectedLevel, setSelectedLevel] = useState<optionType | null>(null);
  const [Description, setTexDescription] = useState("");
  const [Content, setTexContent] = useState("");
  const [previewImage, setPreviewImage] = useState<string>(ImageBg);
  const [loading, setLoading] = useState(false);

  const setTitle = (e: string) => setTexTitle(e);
  const setDuration = (e: string) => setTexDuration(e);
  const setLimitted = (e: string) => {
    const regex = /^[0-9]*$/;
    if (regex.test(e)) {
      setLimittedMember(e === "" ? null : Number(e));
    }
  };
  const setDescription = (e: string) => setTexDescription(e);
  const setContent = (e: string) => setTexContent(e);

  const dispatch = useDispatch();
  const CategoryOption = useAppSelector(
    (state) => state.DropDataStore.CategoryOption
  );

  // Xử lý upload file
  const handleImageChange = (info: UploadChangeParam) => {
    const file = info.fileList[0]?.originFileObj;
    console.log("onChange triggered:", info);
    console.log("Selected file:", file);
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviewImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleVideoChange = (info: UploadChangeParam) => {
    const file = info.fileList[0]?.originFileObj;
    console.log("onChange triggered:", info);
    console.log("Selected file:", file);
    if (file) {
      setVideo(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviewImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOnchange = () => {
    Addproject();
  };

  const ClosedModal = () => {
    setSelectedLevel(null);
    setSelectedCategory(null);
    setTexTitle("");
    setLimittedMember(null);
    setTexDescription("");
    setTexDuration("");
    setTexOwner("");
    setVideo(null);
    setImage(null);
    setPreviewImage(ImageBg);
    onClose();
  };

  const LevelValue = SelectedLevel?.value ? Number(SelectedLevel.value) : null;

  const Addproject = async () => {
    if (!Image || !Video) {
      dispatch(
        noticeActions.setNotification("Please upload a Video and an image")
      );
      dispatch(noticeActions.setIsShowNotice(true));
      return;
    }
    const data = {
      CategoryId: SelectedCategory?.value.trim(),
      Image: Image,
      Title: Title.trim(),
      Description: Description.trim(),
      Price: LimitedMember ?? 0,
      InstructorInfo: Owner.trim(),
      Level: LevelValue ?? 0,
      ContentVideo: Content.trim(),
      Video: Video,
      Duration: Duration.trim(),
    };
    try {
      setLoading(true);
      console.log("loading ", loading);
      const response = (await apiService.addCourse(
        data
      )) as unknown as apiResponse<nullData>;
      if (!response) {
        throw new Error("Network response was not ok");
      }
      dispatch(noticeActions.setNotificationSuccess("Add Course successfully"));
      dispatch(noticeActions.setIsShowNoticeSuccess(true));
      refetch();
    } catch (error) {
      console.error("Error message:", error);
      let message = "Add Course failed";
      if (error && typeof error === "object" && "message" in error) {
        message = (error as Error).message;
      }
      dispatch(noticeActions.setNotification(message));
      dispatch(noticeActions.setIsShowNotice(true));
    } finally {
      setLoading(false);
      console.log("loading ", loading);
      ClosedModal();
    }
  };

  const role = useAppSelector((state) => state.authStore.role)
    .toLocaleLowerCase()
    .trim();

  return (
    <div className="Noti">
      <div
        className={`overlay ${isOpen ? "open" : "close"}`}
        onClick={ClosedModal}
      >
        <div
          className={`modal-course ${isOpen ? "open" : "close"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <h1>Thêm khóa học</h1>
          <div className="form-container">
            <div className="infor-project">
              <div className="project-logo">
                <div className="custom-upload">
                  {" "}
                  <Upload
                    accept="image/*"
                    fileList={
                      Image
                        ? [
                            {
                              uid: "-1",
                              name: Image.name,
                              status: "done",
                              url: previewImage,
                            },
                          ]
                        : []
                    }
                    onChange={handleImageChange}
                    beforeUpload={() => false}
                    maxCount={1}
                  >
                    <div className="upload-content">
                      <UploadOutlined
                        style={{
                          color: "#237bff",
                          fontSize: "24px",
                          marginRight: "8px",
                        }}
                      />
                      <span style={{ color: "#237bff", fontSize: "20px" }}>
                        Tải lên ảnh
                      </span>
                    </div>
                  </Upload>
                </div>
              </div>
              <div className="project-logo">
                <div className="custom-upload">
                  <Upload
                    accept="video/*"
                    fileList={
                      Video
                        ? [
                            {
                              uid: "-1",
                              name: Video.name,
                              status: "done",
                              url: previewImage,
                            },
                          ]
                        : []
                    }
                    onChange={handleVideoChange}
                    beforeUpload={() => false}
                    maxCount={1}
                  >
                    <div className="upload-content">
                      <UploadOutlined
                        style={{
                          color: "#237bff",
                          fontSize: "24px",
                          marginRight: "8px",
                        }}
                      />
                      <span style={{ color: "#237bff", fontSize: "20px" }}>
                        Tải lên video
                      </span>
                    </div>
                  </Upload>
                </div>
              </div>
            </div>
            <div className="form-input">
              <div className="input-colum">
                <div className="input-long">
                  <div className="item-input">
                    <h2>
                      Tiêu đề<span style={{ color: "red" }}>*</span>
                    </h2>
                    <Input onChange={setTitle} placeHolder="" value={Title} />
                  </div>
                  <div className="item-input">
                    <h2>
                      Giảng viên<span style={{ color: "red" }}>*</span>
                    </h2>
                    <Input
                      onChange={setTexOwner}
                      placeHolder=""
                      value={Owner}
                    />
                  </div>
                  <div className="item-input">
                    <h2>
                      Danh mục<span style={{ color: "red" }}>*</span>
                    </h2>
                    <DropDownField
                      options={CategoryOption}
                      onChange={setSelectedCategory}
                      selected={SelectedCategory?.label}
                      placeHolder={"Choose campaign"}
                    />
                  </div>
                </div>
                <div className="input-short">
                  <div className="item-input">
                    <h2>
                      Cấp độ<span style={{ color: "red" }}>*</span>
                    </h2>
                    <DropDownField
                      options={FixLevel}
                      onChange={setSelectedLevel}
                      selected={
                        role !== "admin" ? "Pending" : SelectedLevel?.label
                      }
                      placeHolder={"Level"}
                    />
                  </div>
                  <div className="item-input">
                    <h2>
                      Giá<span style={{ color: "red" }}>*</span>
                    </h2>
                    <Input
                      onChange={setLimitted}
                      placeHolder=""
                      value={
                        LimitedMember !== null ? LimitedMember.toString() : ""
                      }
                    />
                  </div>
                  <div className="item-input">
                    <h2>
                      Thời lượng<span style={{ color: "red" }}>*</span>
                    </h2>
                    <Input
                      onChange={setDuration}
                      placeHolder=""
                      value={Duration}
                    />
                  </div>
                </div>
              </div>
              <div className="item-input-description">
                <div className="description">
                  <h2>Mô tả</h2>
                  <Input
                    as="textarea"
                    onChange={setDescription}
                    placeHolder=""
                    value={Description}
                  />
                </div>
              </div>
              <div className="item-input-description">
                <div className="description">
                  <h2>Nội dung video</h2>
                  <Input
                    as="textarea"
                    onChange={setContent}
                    placeHolder=""
                    value={Content}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-btn">
            <Button label="Hủy" onClick={ClosedModal} className="btn-exit" />
            <Button
              label={loading ? "loading..." : "Thêm"}
              onClick={handleOnchange}
              className="btn-delete"
              dis={
                !Title.trim() ||
                !Owner.trim() ||
                !Duration.trim() ||
                !SelectedCategory ||
                !SelectedLevel ||
                LimitedMember === null ||
                !Video ||
                !Image ||
                loading
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAdd;
