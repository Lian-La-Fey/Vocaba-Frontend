import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import pict from "../../img/register.svg";
import { toast } from "react-toastify";
import { FaEnvelope, FaKey, FaUser } from "react-icons/fa";
import { Col, Container, Form, Image, Row, Spinner } from "react-bootstrap";
import styles from "../SignIn/styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { register, setError } from "../../redux/features/userSlice";
import Footer from "../../components/Footer/Footer";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.user }));
  const { userName, email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
    return () => {
      dispatch(setError());
    };
  }, [error]);

  useEffect(() => {}, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName && email && password)
      dispatch(register({ formValue, navigate, toast }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <>
      <Container className={styles.loginContainer}>
        <Row className={styles.row}>
          <Col xl={6} className="d-flex justify-content-center">
            <Image
              className={styles.imgMaxH}
              fluid={true}
              src={pict}
              alt="register.svg"
            />
          </Col>
          <Col xl={6}>
            <h2 className={styles.title}>Sign Up</h2>
            <Form onSubmit={handleSubmit} className={styles.loginForm}>
              <div className={styles.inputDiv}>
                <FaUser className={styles.inputIcon} />
                <input
                  type="text"
                  name="userName"
                  value={userName}
                  placeholder="User Name"
                  onChange={handleChange}
                  required
                />
              </div>
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
                {loading && (
                  <Spinner color="inherit" animation="border" role="status" />
                )}
                {!loading && <span>Register</span>}
              </button>
            </Form>
            <div className="text-center mt-3">
              <span>
                Already have account?
                <Link to="/login" className={styles.registerLoad}>
                  Login
                </Link>
              </span>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default SignUp;
