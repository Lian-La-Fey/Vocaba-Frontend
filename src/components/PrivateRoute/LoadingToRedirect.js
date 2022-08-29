import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import pict from "../../img/redirect.svg";
import Footer from "../Footer/Footer";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div className="d-flex flex-column justify-content-center mt-5">
      <h1 className="text-center mb-5">You must be logged-in to do that.</h1>
      <Image
        src={pict}
        alt="redirect.svg"
        fluid
        style={{ maxHeight: "380px", padding: "2rem" }}
      />
      <h2 className="text-center mt-5">
        Redirecting you in
        <span className="mx-2" style={{ color: "var(--main-link-color)" }}>
          {count}
        </span>
        seconds
      </h2>
      <Footer />
    </div>
  );
};

export default LoadingToRedirect;
