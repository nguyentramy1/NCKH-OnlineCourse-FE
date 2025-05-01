import "./ListCourse.scss";
import Card from "../../Components/Card/Card";
import { useNavigate } from "react-router-dom";
import useCourseData from "./Hooks/GetAllCourse";
import Pagination from "../../Components/Pagination/Pagination-nonfun";
import { useAppSelector } from "../../store";
import FormAdd from "./Form/FormAdd";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "antd";
import useCategoryData from "./Hooks/GetAllCategory";

const ListCourse = () => {
  useCategoryData();
  const navigate = useNavigate();
  const {
    CourseData,
    loading: projectsLoading,
    error: projectsError,
    TotalCount,
    refetch,
  } = useCourseData(9);

  const currentPageIndex = useAppSelector(
    (state) => state.searchStore.currentPageIndexST
  );
  const role = useAppSelector((state) => state.authStore.role);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="ListCourse">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h3>Tất cả các khóa học</h3>
        <div style={{ padding: "20px" }}>
          {" "}
          <Button
            icon={<Plus style={{ fontSize: "24px", color: "#fff" }} />}
            onClick={() => setIsOpen(true)}
            type="primary"
            style={{ backgroundColor: "#0166ff", borderColor: "#0166ff" }}
          >
            Thêm
          </Button>
        </div>
      </div>

      <section className="projects">
        {projectsLoading ? (
          <p>Đang tải...</p>
        ) : projectsError ? (
          <p>{projectsError}</p>
        ) : (
          <div className="project-list">
            {CourseData.map((Course) => (
              <Card
                key={Course.id}
                data={Course}
                onClick={() =>
                  navigate(`/course/${Course.id}`, {
                    state: { id: Course.id },
                  })
                }
                role={role}
              />
            ))}
          </div>
        )}
      </section>
      {ReactDOM.createPortal(
        <FormAdd
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          refetch={refetch}
        />,
        document.body
      )}
      <Pagination
        totalData={TotalCount ?? 0}
        AmountDataPerPage={11}
        currentPageIndex={currentPageIndex}
        refresh={refetch}
      />
    </div>
  );
};

export default ListCourse;
