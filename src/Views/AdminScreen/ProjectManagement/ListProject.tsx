import ErrorNotFound from "../../Assets/Image/404.png";
import "./ListProject.scss";
import Table from "../../../Components/Table/Table";
import { fakeData, tableHeaders } from "./fakedata/fakelistproject";

export interface Project {
  Id: string;
  UserId: string;
  Title: string;
  Logo: string;
  Description: string;
  Address: string;
  limitedNumber: number;
  Status: string;
}
const ListProject = () => {
  return (
    <div className="ListProject-Container">
      <Table
        data={fakeData}
        allData={fakeData}
        pageIndex={1}
        amountDataPerPage={5}
        headers={tableHeaders}
        needNo={true}
        needSelect={true}
        idFieldName="Id"
        nameFieldName="Title"
        onDelete={(id, name) => console.log("Xóa:", id, name)}
        onUpdate={(id, name) => console.log("Cập nhật:", id, name)}
      />
    </div>
  );
};

export default ListProject;
