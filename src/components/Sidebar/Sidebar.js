import { FaList, FaSignOutAlt, FaUser } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearToken } from "../../redux/features/authSlice";
import { setEmpty } from "../../redux/features/dictionaryWordSlice";
import { setLogout } from "../../redux/features/userSlice";
import { setInitial } from "../../redux/features/wordSlice";
import ThemeToggle from "../Button/ThemeToggle/ThemeToggle";
import styles from "./styles.module.css";

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearToken())
    dispatch(setLogout())
    dispatch(setEmpty())
    dispatch(setInitial())
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarNav}>
        <li className={styles.navItem}></li>
        <li className={styles.navItem}>
          <Link to="/profile" className={styles.navLink}>
            <FaUser />
            <span className={styles.linkText}>Profile</span>
          </Link>
        </li>
        <li className={styles.navItem} style={{overflow: "hidden"}}>
          <Link to="/addWord" className={styles.navLink} style={{minWidth: "max-content"}}>
            <IoAddCircleOutline />
            <span className={styles.linkText}>New Word</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/lists" className={styles.navLink}>
            <FaList />
            <span className={styles.linkText}>Lists</span>
          </Link>
        </li>
        <li className={styles.navItem} style={{overflow: "hidden"}}>
          <Link to="/wordProgress" className={styles.navLink} style={{minWidth: "max-content"}}>
            <GiProgression />
            <span className={styles.linkText}>Word Progress</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <ThemeToggle cNameDiv={styles.navLink} cNameText={styles.linkText} />
        </li>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink} onClick={handleLogout}>
            <FaSignOutAlt />
            <span className={styles.linkText}>Logout</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
