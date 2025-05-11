import { Navigate } from "react-router-dom";
import LoginPage from "../Views/Login/LoginPage";
import SignUpPage from "../Views/Login/signup";
import ComingSoon from "../Views/ComingSoon/ComingSoon";
import { useAppSelector } from "../store";
import ErrorPage from "../Views/Error/error-page";
import Home from "../Views/UserScreen/Home/Home";
import Profile from "../Views/Profile/Profile";
import Course from "../Views/Course/CourseDetail";
import ListCourse from "../Views/Course/ListCourse";
import ListCategory from "../Views/Category/ListCategory";
import ListUser from "../Views/UserManagement/ListUser";
import PaymentNow from "../Views/Transaction/PaymentNow";
import ListOrder from "../Views/Order/ListOrder";
import ListOrderDetail from "../Views/Order/ListOrderDetail";
const routerManage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const role = useAppSelector((state) => state.authStore.info?.fullName); // này là role không phải fullname

  const routerAdmin = [
    {
      path: "*",
      element: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Navigate to={"/Home"} />,
    },
    {
      path: "/signup",
      element: <Navigate to={"/Home"} />,
    },
    {
      path: "/MyProject",
      element: <ComingSoon />,
    },
    {
      path: "/comingsoon",
      element: <ComingSoon />,
    },
    {
      path: "/ProfileMember",
      element: <Profile />,
    },
    {
      path: "/Home",
      element: <Home />,
    },
    {
      path: "/course/:id",
      element: <Course />,
    },
    {
      path: "/list-course",
      element: <ListCourse />,
    },
    {
      path: "/list-category",
      element: <ListCategory />,
    },
    {
      path: "/list-user",
      element: <ListUser />,
    },
    {
      path: "/payment-now",
      element: <PaymentNow />,
    },
    {
      path: "/order-manegement",
      element: <ListOrder />,
    },
    {
      path: "/order-detail/:id",
      element: <ListOrderDetail />,
    },
  ];
  const routerUser = [
    {
      path: "/ProfileMember",
      element: <Profile />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Navigate to={"/Home"} />,
    },
    {
      path: "/signup",
      element: <Navigate to={"/Home"} />,
    },
    {
      path: "/comingsoon",
      element: <ComingSoon />,
    },
    ,
    {
      path: "/Home",
      element: <Home />,
    },
    {
      path: "/payment-now",
      element: <PaymentNow />,
    },
    {
      path: "/list-course",
      element: <ListCourse />,
    },
  ];

  const routerLogin = [
    {
      path: "*",
      element: <Navigate to={"/login"} />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignUpPage />,
    },
  ];

  return { routerLogin, routerAdmin, routerUser };
};

export default routerManage;
