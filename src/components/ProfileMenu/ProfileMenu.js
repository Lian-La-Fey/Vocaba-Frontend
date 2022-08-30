import { useState } from "react";
import {
  FaAngleDown,
  FaList,
  FaSignOutAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearToken } from "../../redux/features/authSlice";
import { setEmpty } from "../../redux/features/dictionaryWordSlice";
import { setLogout } from "../../redux/features/userSlice";
import { setInitial } from "../../redux/features/wordSlice";
import ThemeToggle from "../Button/ThemeToggle/ThemeToggle";
import styles from "./styles.module.css";

const ProfileMenu = () => {
  const { user } = useSelector((state) => ({ ...state.user }));
  const { words } = useSelector((state) => ({ ...state.word }));
  const [expand, setExpand] = useState(false);
  const turnOn = () => setExpand(true);
  const turnOff = () => setExpand(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setInitial());
    dispatch(setLogout());
    dispatch(setEmpty());
    dispatch(clearToken());
  };

  if (user)
    return (
      <>
        <div className={styles.userCard} onClick={turnOn}>
          <div className={styles.dropdownAvatar}>
            <span>{user.userName.slice(0, 2)}</span>
          </div>
          <div className={styles.dropdownText}>
            <span style={{ display: "block", fontWeight: "600" }}>
              <span className={styles.hiddenLg}>{user.userName}</span>
              <FaAngleDown />
            </span>
            <span style={{ display: "block", fontWeight: "500" }}>
              <span className={styles.hiddenLg}>
                Vocaba Score:{" "}
                {words.length * 10 +
                  words
                    .map((item) => item.progress)
                    .reduce((partialSum, a) => partialSum + a * a * 5, 0)}
              </span>
            </span>
          </div>
        </div>
        <div
          className={styles.dropdownOverlayer}
          style={{ display: `${expand ? "block" : "none"}` }}
          onClick={turnOff}
        ></div>
        <div
          className={`${styles.dropdownContent} ${expand ? styles.open : ""}`}
        >
          <ul className={styles.nav}>
            <li
              className={`${styles.navItem} ${styles.displayMd}`}
              style={{
                display: "none",
                padding: "2rem",
                minWidth: "max-content",
              }}
            >
              <div className={styles.userCard} style={{ cursor: "unset" }}>
                <div className={styles.dropdownAvatar}>
                  <span>{user.userName.slice(0, 2)}</span>
                </div>
                <div className={styles.dropdownText}>
                  <span style={{ display: "block", fontWeight: "600" }}>
                    {user.email}
                  </span>
                  <span style={{ display: "block", fontWeight: "300" }}>
                    Vocaba Score: {words.length * 10}
                  </span>
                </div>
                <div className={`${styles.navbarLink} ms-auto`}>
                  <FaTimes className="m-0" onClick={turnOff} />
                </div>
              </div>
            </li>
            <li className={styles.navItem} onClick={turnOff}>
              <Link to="/profile" className={styles.navbarLink}>
                <FaUser />
                <span>Profile</span>
              </Link>
            </li>
            <li className={styles.navItem} onClick={turnOff}>
              <Link to="/addWord" className={styles.navbarLink}>
                <IoAddCircleOutline />
                <span>New Word</span>
              </Link>
            </li>
            <li className={styles.navItem} onClick={turnOff}>
              <Link to="/lists" className={styles.navbarLink}>
                <FaList />
                <span>Lists</span>
              </Link>
            </li>
            <li className={styles.navItem} style={{ overflow: "hidden" }}>
              <Link
                to="/wordProgress"
                className={styles.navbarLink}
                style={{ minWidth: "max-content" }}
                onClick={turnOff}
              >
                <GiProgression />
                <span className={styles.linkText}>Word Progress</span>
              </Link>
            </li>
            <li className={styles.navItem}>
              <ThemeToggle
                cNameDiv={styles.navbarLink}
                cNameText={styles.linkText}
              />
            </li>
            <li className={styles.navItem}>
              <Link to="/" className={styles.navbarLink} onClick={handleLogout}>
                <FaSignOutAlt />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </>
    );
};

export default ProfileMenu;
