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
    <main className="d-flex position-relative justify-content-center">
      {token && <Sidebar />}
      {token && user && ( user || !loading) && children}
      {token && loading && !user && (
        <div className="spinnerWrapper">
          <Spinner style={style} animation="border" role="status" />
        </div>
      )}
      {!token && <LoadingToRedirect />}
    </main>
  );
};

export default PrivateRoute;
