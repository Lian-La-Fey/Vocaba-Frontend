import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import Button from "../../components/Button/Button";
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_API_URL}/users/password-link`;
      const { data } = await axios.post(url, { email });
      toast.info(data.message, {position: "bottom-center"})
    } catch (error) {
      toast.error(error.response.data.message, {position: "bottom-center"})
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1>Forgot Password?</h1>
        <span>
          <p>Don't worry! Enter your email below.</p>
          <p>We will send you a link to reset password.</p>
        </span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          className={styles.input}
        />
        <Button type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
