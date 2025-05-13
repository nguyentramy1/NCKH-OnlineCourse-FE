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
const IntroSimilar: React.FC<Props> = ({
  Course,
  projectsLoading,
  projectsError,
}) => {
  const navigate = useNavigate();
  const topCourses = Course.slice(0, 4);
  console.log("khóa học đề xuất ", Course);
  return (
    <div className="intro-container" style={{ alignItems: "center" }}>
      <div className="intro-content-similar">
        {/* Tiêu đề và mô tả */}
        {/* <h3 className="intro-subtitle">Cách hoạt động</h3> */}
        <h1 className="intro-title">Các khóa học tương tự</h1>
      </div>
      <div className="video-recoment-container">
        <div className="scroll-container">
          <div className="project-list">
            {projectsLoading ? (
              <p>Loading projects...</p>
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

export default IntroSimilar;
