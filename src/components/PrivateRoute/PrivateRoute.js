import React from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import LoadingToRedirect from "./LoadingToRedirect";
import './styles.css';

const PrivateRoute = ({ children }) => {
  const style = {
    width: "3rem",
    height: "3rem",
    color: "var(--main-link-color)",
    marginTop: "1rem",
  };
  const { user, loading } = useSelector((state) => ({ ...state.user }));
  const token = localStorage.getItem("_accessToken");
  return (
    <>
      {token && <Sidebar />}
      {token && user && ( user || !loading) && children}
      {token && loading && !user && (
        <div className="spinnerWrapper">
          <Spinner style={style} animation="border" role="status" />
        </div>
      )}
      {!token && <LoadingToRedirect />}
    </>
  );
};

export default PrivateRoute;
