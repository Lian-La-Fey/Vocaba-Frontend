import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import pict from "../../img/verified.svg";
import NotFound from "../NotFound/NotFound";
import styles from './styles.module.css';


const VerifyEmail = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/users/${param.id}/verify/${param.token}`;
        await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [validUrl, param.id, param.token]);

  return (
    <>
      {validUrl ? (
        <div className="container">
          <div className="row py-3">
            <div className="col-sm-12 text-center">
              <div className={styles.wrapper}>
                <h1>Email verified successfully</h1>
                <Image src={pict} alt="success_img" className={styles.verified} />
                <div>
                  <Button>
                    <Link to="/login">Login Page</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default VerifyEmail;
