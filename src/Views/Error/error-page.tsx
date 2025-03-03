import ErrorNotFound from "../../Assets/Image/404.png";
import "./error-page.scss";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <img src={ErrorNotFound} alt="404 - Not found" />
    </div>
  );
};

export default ErrorPage;
