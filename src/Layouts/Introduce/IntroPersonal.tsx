import { useNavigate } from "react-router-dom";
import { Course } from "../../AxiosConfig/DataType";
import Card from "../../Components/Card/Card";
import "./intro.scss";
import Button from "../../Components/Button/Button";
interface Props {
  Course: Course[];
  projectsLoading: boolean;
  projectsError: string | null;
}
const Intropersonal: React.FC<Props> = ({
  Course,
  projectsLoading,
  projectsError,
}) => {
  const navigate = useNavigate();
  const topCourses = Course.slice(0, 4);
  console.log("khóa học đề xuất ", Course);
  return (
    <div className="intro-container" style={{ alignItems: "center" }}>
      <div className="intro-content-personal">
        {/* Tiêu đề và mô tả */}
        {/* <h3 className="intro-subtitle">Cách hoạt động</h3> */}
        <h1 className="intro-title">Khóa học dành riêng cho bạn </h1>
        <p className="intro-description">
          Khám phá các khóa học hoàn hảo dành cho bạn với khóa học được đề xuất
          riêng theo hồ sơ và mục tiêu học tập của bạn.{" "}
        </p>
      </div>
      <div className="video-recoment-container">
        <div className="scroll-container">
          <div className="project-list">
            {projectsLoading ? (
              <p>Loading projects...</p>
            ) : projectsError ? (
              <p>{projectsError}</p>
            ) : (
              topCourses.map((Course) => (
                <Card
                  key={Course.id}
                  data={Course}
                  onClick={() =>
                    navigate(`/course/${Course.id}`, {
                      state: { id: Course.id }, // Chỉ gửi id
                    })
                  }
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="home-button">
        <Button
          onClick={() => navigate(`/list-course`)}
          label="Khám phá toàn bộ khóa học"
          className="explore-button"
        />
      </div>
    </div>
  );
};

export default Intropersonal;
