import "../Course/ListCourse.scss";
import Card from "../../Components/Card/Card";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Components/Pagination/Pagination-nonfun";
import { useAppDispatch, useAppSelector } from "../../store";
import FormAdd from "../Course/Form/FormAdd";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "antd";
import FormUpdate from "../Course/Form/FormUpdate";
import { FormStateActions } from "../../Reduxs/FormState/FormStateSlice";
import useCourseData from "../UserScreen/CourseHook/GetAllCourse";
import useCategoryData from "../Course/Hooks/GetAllCategory";
import useList from "./Hook/GetAllCourse";

const ListCourseByUser = () => {
  useCategoryData();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    ListCourse: CourseData,
    loading: projectsLoading,
    error: projectsError,
    TotalCount,
    refetch,
  } = useList(9);

  const currentPageIndex = useAppSelector(
    (state) => state.searchStore.currentPageIndexST
  );
  const UserId = useAppSelector((state) => state.ProfileStore.userId);
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
        <h3>KHÓA HỌC CỦA BẠN</h3>
      </div>

      <section className="projects">
        {projectsLoading ? (
          <p>Đang tải...</p>
        ) : projectsError ? (
          <p>{"Bạn chưa có khóa học nào, đi mua đi, mua mới có"}</p>
        ) : (
          <div className="project-list">
            {CourseData.map((Course) => (
              <Card
                key={Course.id}
                data={Course}
                onClick={() =>
                  navigate(`/course-study/${Course.courseId}`, {
                    state: { id: Course.courseId },
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
      {/* <Pagination
        totalData={TotalCount ?? 0}
        AmountDataPerPage={11}
        currentPageIndex={currentPageIndex}
        refresh={refetch}
      /> */}
    </div>
  );
};

export default ListCourseByUser;
