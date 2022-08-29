import React, { useState } from "react";
import { Card, Col, Form, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Content from "../../components/Layouts/Content";
import styles from "./style.module.css";
import userImg from "../../img/user.svg";
import background from "../../img/profileBackground.jpg";
import { FaEnvelope, FaKey, FaUser } from "react-icons/fa";
import Button from "../../components/Button/Button";
import { toast } from "react-toastify";
import {
  changePassword,
  deleteUser,
  setLogout,
  updateUserInfo,
} from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { setEmpty } from "../../redux/features/dictionaryWordSlice";
import { setInitial } from "../../redux/features/wordSlice";
import { deleteWords } from "../../utilities/cleanFirebaseStorage";
import { clearToken } from "../../redux/features/authSlice";
import Modal from "../../components/Modal/MyModal";

const Profile = () => {
  const { user, error, loading } = useSelector((state) => ({ ...state.user }));
  const { words } = useSelector((state) => ({ ...state.word }));
  const [accountDelete, setAccountDelete] = useState({ modal: false });
  const [userInfo, setUserInfo] = useState({
    userName: user.userName,
    email: user.email,
    password: "",
  });
  const [userPassword, setUserPassword] = useState({
    current: "",
    newPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInfo = (e) => {
    e.preventDefault();
    if (user.userName === userInfo.userName && user.email === userInfo.email) {
      toast.info("User Info is the same.");
      return;
    }
    const id = user._id;
    const updatedUserData = { ...userInfo };
    dispatch(updateUserInfo({ id, updatedUserData, navigate }));
    setUserInfo({ ...userInfo, password: "" });
  };

  const handleUserInfo = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handlePassword = (event) => {
    event.preventDefault();
    if (userPassword.current === userPassword.newPassword) {
      toast.info("New password must be different from current!");
      return;
    }

    const id = user._id;
    dispatch(changePassword({ id, userPassword, navigate }));
    setUserPassword({ current: "", newPassword: "" });
  };

  const handleUserPassword = (event) => {
    const { name, value } = event.target;
    setUserPassword({ ...userPassword, [name]: value });
  };

  const deleteAccount = (event) => {
    event.preventDefault();
    dispatch(deleteUser({ id: user._id, navigate }));
    dispatch(setLogout());
    dispatch(setInitial());
    dispatch(setEmpty());
    dispatch(clearToken());
    !error && deleteWords([...words], user._id);
  };

  return (
    <Content>
      <Row className="my-4">
        <Col lg={5} className={styles.colPad}>
          <Card className={styles.card}>
            <div>
              <Image
                className={styles.upperImg}
                fluid={true}
                src={background}
                alt="upper.jpg"
              />
            </div>

            <div className={styles.profileDiv}>
              <div className={styles.profile}>
                <Image fluid={true} src={userImg} alt="register.svg" />
              </div>
            </div>

            <div className={styles.lower}>
              <h2 className="mb-1">{user.userName}</h2>
              <span className="text-muted d-block mb-2">{user.email}</span>

              <div className="d-flex justify-content-around align-items-center my-4 px-5">
                <div className={styles.stats}>
                  <h4 className="mb-0">Total Lists</h4>
                  <span>{user.lists.length}</span>
                </div>

                <div className={styles.stats}>
                  <h4 className="mb-0">Total Words</h4>
                  <span>{words.length}</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={7} className={styles.colPad}>
          <Card className={styles.card}>
            <h4 className="py-4 border-bottom text-center fs-2">
              Profile Settings
            </h4>
            <Form onSubmit={handleInfo} className="mx-3">
              <Row>
                <Col md={6} className={styles.mobCenter}>
                  <div className={styles.inputDiv}>
                    <FaUser className={styles.inputIcon} />
                    <input
                      type="text"
                      name="userName"
                      value={userInfo.userName}
                      placeholder="User Name"
                      onChange={handleUserInfo}
                      required
                    />
                  </div>
                </Col>
                <Col md={6} className={styles.mobCenter}>
                  <div className={styles.inputDiv}>
                    <FaEnvelope className={styles.inputIcon} />
                    <input
                      type="email"
                      name="email"
                      value={userInfo.email}
                      placeholder="Email"
                      onChange={handleUserInfo}
                      required
                    />
                  </div>
                </Col>
                <Col md={6} className={styles.mobCenter}>
                  <div className={styles.inputDiv}>
                    <FaKey className={styles.inputIcon} />
                    <input
                      type="password"
                      name="password"
                      value={userInfo.password}
                      placeholder="Confirm Password"
                      onChange={handleUserInfo}
                      required
                    />
                  </div>
                </Col>
                <Col md={12} className={styles.mobCenter}>
                  <Button type="submit">Change User Info</Button>
                </Col>
              </Row>
            </Form>
            <hr />
            <Form onSubmit={handlePassword} className="mx-3">
              <Row>
                <Col md={6} className={styles.mobCenter}>
                  <div className={styles.inputDiv}>
                    <FaKey className={styles.inputIcon} />
                    <input
                      type="password"
                      name="current"
                      value={userPassword.current}
                      placeholder="Current Password"
                      onChange={handleUserPassword}
                      required
                    />
                  </div>
                </Col>
                <Col md={6} className={styles.mobCenter}>
                  <div className={styles.inputDiv}>
                    <FaKey className={styles.inputIcon} />
                    <input
                      type="password"
                      name="newPassword"
                      value={userPassword.newPassword}
                      placeholder="New Password"
                      onChange={handleUserPassword}
                      required
                    />
                  </div>
                </Col>
                <Col md={12} className={styles.mobCenter}>
                  <Button type="submit">Change Password</Button>
                </Col>
              </Row>
            </Form>
            <hr />
            <div className={`${styles.mobCenter} mx-3 pb-3`}>
              <p className="text-muted">Delete The Account</p>
              <Button onClick={() => setAccountDelete({ modal: true })}>
                Go On Delete
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
      <Modal
        title="Delete Account"
        btnName="Delete"
        state={accountDelete}
        setState={setAccountDelete}
        submitAction={deleteAccount}
        loading={loading}
      >
        <p>
          Once you delete your account, there is no going back. Please be sure.
        </p>
      </Modal>
    </Content>
  );
};

export default Profile;
