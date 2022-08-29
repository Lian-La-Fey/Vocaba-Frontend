import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pict from "../../img/login.svg";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { Col, Container, Form, Image, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/features/authSlice";
import Footer from "../../components/Footer/Footer";

const initialState = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading } = useSelector((state) => ({ ...state.auth }));
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };

  return (
    <>
      <Container className={styles.loginContainer}>
        <Row className={styles.row}>
          <Col lg={6}>
            <Image fluid={true} src={pict} alt="register.svg" />
          </Col>
          <Col lg={6}>
            <h2 className={styles.title}>Sign In</h2>
            <Form
              onSubmit={handleSubmit}
              autoComplete="off"
              className={styles.loginForm}
            >
              <div className={styles.inputDiv}>
                <FaEnvelope className={styles.inputIcon} />
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputDiv}>
                <FaKey className={styles.inputIcon} />
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className={styles.btnInp}>
                {loading && <Spinner animation="border" role="status" />}
                {!loading && <span>Login</span>}
              </button>
            </Form>
            <div className="text-center mt-3">
              <span>
                Don't you have account?
                <Link to="/register" className={styles.registerLoad}>
                  Register
                </Link>
              </span>
            </div>
            <div className="text-center mt-3">
              <Link to="/forgot-password" className={styles.registerLoad}>
                Reset Password
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default SignIn;
