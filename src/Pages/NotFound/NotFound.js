import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import pict from "../../img/notFound.svg";

const NotFound = () => {
  return (
    <div className="container" style={{color: "var(--main-text-color)"}}>
      <div className="row py-3">
        <div className="col-sm-12 text-center">
          <div className="four_zero_four_bg">
            <Image fluid src={pict} />
          </div>
          <div className="my-4">
            <h3 className="h2">Look like you're lost</h3>
            <p>the page you are looking for not avaible!</p>
            <Link to="/">Go to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
