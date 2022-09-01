import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../ForgotPassword/styles.module.css";
import NotFound from "../NotFound/NotFound";
import { toast } from "react-toastify";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";

const ResetPassword = () => {
  const [validUrl, setValidUrl] = useState(true);
  const [pass, setPass] = useState({ newPass: "", confPass: "" });
  const param = useParams();
  const url = `${process.env.REACT_APP_API_URL}/users/reset-password/${param.id}/${param.token}`;

  useEffect(() => {
    const verifyUrl = async () => {
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/users/${param.id}/${param.token}`);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyUrl();
  }, [param, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pass.newPass !== pass.confPass) {
      toast.error("Passwords not same!", { position: "bottom-center" });
      return;
    }

    try {
      const { data } = await axios.post(url, { password: pass.newPass });
      toast.info(data.message, { position: "bottom-center" });
      setTimeout(() => {
				window.location = "/login";
			}, 500);
    } catch (error) {
      toast.error(error.response.data.message, { position: "bottom-center" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPass({ ...pass, [name]: value });
  };

  return (
    <>
      {validUrl ? (
        <div className={styles.container}>
          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <h1>Reset Password</h1>
            <input
              type="password"
              placeholder="Password"
              name="newPass"
              onChange={handleChange}
              value={pass.newPass}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confPass"
              onChange={handleChange}
              value={pass.confPass}
              required
              className={styles.input}
            />
            <Button type="submit">Submit</Button>
          </form>
        <Footer />
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default ResetPassword;
