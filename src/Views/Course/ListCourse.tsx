import "./ListCourse.scss";
import Card from "../../Components/Card/Card";
import { useNavigate } from "react-router-dom";
import useCourseData from "./Hooks/GetAllCourse";
import Pagination from "../../Components/Pagination/Pagination-nonfun";
import { useAppDispatch, useAppSelector } from "../../store";
import FormAdd from "./Form/FormAdd";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "antd";
import useCategoryData from "./Hooks/GetAllCategory";
import FormUpdate from "./Form/FormUpdate";
import { FormStateActions } from "../../Reduxs/FormState/FormStateSlice";
import DeleteWarning from "../../Components/WarningForm/deleteWarning";

const ListCourse = () => {
  useCategoryData();
  const dispatch = useAppDispatch();
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
  const handleDelete = () => {
    dispatch(FormStateActions.setDeleteCourse(false));
    refetch();
  };
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
          {role === "admin" && (
            <Button
              icon={<Plus style={{ fontSize: "24px", color: "#fff" }} />}
              onClick={() => setIsOpen(true)}
              type="primary"
              style={{ backgroundColor: "#0166ff", borderColor: "#0166ff" }}
            >
              Thêm
            </Button>
          )}
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
      {ReactDOM.createPortal(
        <FormUpdate
          id={useAppSelector((state) => state.FormStateStore.idEditCourse)}
          isOpen={useAppSelector((state) => state.FormStateStore.EditCourse)}
          refetch={refetch}
        />,
        document.body
      )}
      {ReactDOM.createPortal(
        <DeleteWarning
          isOpen={useAppSelector((state) => state.FormStateStore.isDelete)}
          onClose={handleDelete}
          dataType={"Khóa học"}
          id={useAppSelector((state) => state.FormStateStore.idDeleteCourse)}
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
