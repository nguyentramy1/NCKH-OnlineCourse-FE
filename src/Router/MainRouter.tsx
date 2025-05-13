import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import routerManage from "./RouterManage";
import Header from "../Layouts/Header/Header";
import HeaderLogin from "../Layouts/Header/HeaderLogin";
import Menu from "../Layouts/Menu/Menu";
import "./MainRouter.scss";
import { useAppDispatch, useAppSelector } from "../store";
import { authActions } from "../Reduxs/Auth/AuthSlice";
import { apiService } from "../AxiosConfig/apiService";
import { setTokenHeader } from "../AxiosConfig/axiosConfig";
import Loading from "../Components/AnimationLoading/Loading";
import {
  DataLoginType,
  apiLoginResponse,
  apiResponse,
} from "../AxiosConfig/DataType";
import ReactDOM from "react-dom";
import Notification from "../Components/NotifiicationForm";
import { jwtDecode } from "jwt-decode";
import { profileActions } from "../Reduxs/UserInfor/ProfileSlice";
import { loadingActions } from "../Reduxs/LoadingSlice";
import Footer from "../Layouts/Footer/Footer";

const MainRouter: React.FC = () => {
  const dispatch = useAppDispatch();
  const [initCheckLogin, setInitCheckLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State để toggle menu trên mobile
  const isAuth = useAppSelector((state) => state.authStore.isAuth);
  const { routerAdmin, routerLogin, routerUser } = routerManage();
  const role = useAppSelector((state) => state.authStore.role);

  const fetchingAuth = async () => {
    const refreshToken = sessionStorage.getItem("refreshToken");
    setTokenHeader(refreshToken);

    if (refreshToken) {
      try {
        dispatch(loadingActions.setloading(true));
        const response = (await apiService.refresh({
          refreshToken: refreshToken,
        })) as unknown as apiResponse<DataLoginType>;
        if (response.statusCode === "Success") {
          dispatch(authActions.setAuth(true));
          dispatch(authActions.setInfo(response.data));

          const info = response.data;
          const token = response.data.accessToken;
          const decodedToken = jwtDecode<{
            unique_name: string;
            userId: string;
          }>(token);

          setTokenHeader(token ? token : "");
          dispatch(authActions.setRole(response.data.role.toLowerCase()));
          dispatch(profileActions.setUnique_name(response.data.fullName));
          dispatch(profileActions.setUserId(decodedToken.userId));

          sessionStorage.setItem("refreshToken", response.data.refreshToken);
          dispatch(authActions.setAuth(true));
          dispatch(authActions.setInfo(info));
        } else {
          dispatch(authActions.setAuth(false));
        }
      } catch (error) {
        dispatch(authActions.setAuth(false));
        setTokenHeader(null);
      } finally {
        dispatch(loadingActions.setloading(false));
        setInitCheckLogin(false);
      }
    } else {
      dispatch(loadingActions.setloading(false));
      setInitCheckLogin(false);
    }
  };

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    fetchingAuth();
  }, []);

  useEffect(() => {
    if (isAuth) {
      // Hành động sau khi đăng nhập
    }
  }, [isAuth]);

  return (
    <div className="main-container">
      <div className={`Loading-cover ${loading ? "active" : ""}`}>
        {loading && (
          <div className="modal">
            <Loading />
          </div>
        )}
      </div>
      {!initCheckLogin ? (
        isAuth ? (
          role === "admin" ? (
            <>
              <div className="header">
                <HeaderLogin />
              </div>
              <div className="content">
                <div className={`menu`}>
                  <Menu />
                </div>
                <div className="main">
                  <Routes>
                    {routerAdmin.map((route, i) => (
                      <Route {...route} key={i} />
                    ))}
                  </Routes>
                </div>
              </div>
              <Footer /> {/* Di chuyển Footer ra ngoài .content và .main */}
            </>
          ) : (
            <>
              <div className="header">
                <HeaderLogin />
              </div>
              <div className="content-user">
                {/* <div className={`menu`}>
                  <Menu />
                </div> */}
                <div className="main">
                  <Routes>
                    {routerUser.map((route, i) => (
                      <Route {...route} key={i} />
                    ))}
                  </Routes>
                </div>
              </div>
              <Footer />
            </>
          )
        ) : (
          <>
            <Header />
            <div className="content-login">
              <div className="main">
                <Routes>
                  {routerLogin.map((route, i) => (
                    <Route {...route} key={i} />
                  ))}
                </Routes>
              </div>
            </div>
          </>
        )
      ) : (
        <></>
      )}
      {ReactDOM.createPortal(
        <Notification
          isOpen={isFormVisible}
          onClose={() => setIsFormVisible(false)}
          Notification={notice}
        />,
        document.body
      )}
    </div>
  );
};

export default MainRouter;
