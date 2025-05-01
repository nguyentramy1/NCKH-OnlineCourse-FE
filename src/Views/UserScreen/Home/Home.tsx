import "./Home.scss";

import Footer from "../../../Layouts/Footer/Footer";
import Card from "../../../Components/Card/Card";
import { useNavigate } from "react-router-dom";
import useCourseData from "../CourseHook/GetAllCourse";
import { useEffect } from "react";
import Button from "../../../Components/Button/Button";
import Intro from "../../../Layouts/Introduce/intro";
import { useAppSelector } from "../../../store";

const Home = () => {
  const navigate = useNavigate();

  const {
    CourseData,
    loading: projectsLoading,
    error: projectsError,
  } = useCourseData();

  // Lấy 6 khóa học mới nhất và chia thành 2 hàng (3 trên, 3 dưới)
  const latestCourse = CourseData.slice(0, 6);
  const topCourses = latestCourse.slice(0, 3); // 3 khóa học đầu
  const bottomCourses = latestCourse.slice(3, 6); // 3 khóa học tiếp theo

  const handleCardClick = (id: string) => {
    navigate(`/course/${id}`);
  };
  const role = useAppSelector((state) => state.authStore.role);

  return (
    <div className="home">
      <Intro />
      <section className="projects">
        <h2>Duyệt qua các khóa học phổ biến của chúng tôi</h2>
        {/* Scroll container cho 3 khóa học đầu */}
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
        {/* Scroll container cho 3 khóa học tiếp theo */}
        <div className="scroll-container">
          <div className="project-list">
            {projectsLoading ? (
              <p>Loading projects...</p>
            ) : projectsError ? (
              <p>{projectsError}</p>
            ) : (
              bottomCourses.map((Course) => (
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
        <div className="home-button">
          <Button
            onClick={() => {}}
            label="Khám phá toàn bộ khóa học"
            className="explore-button"
          />
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default Home;
