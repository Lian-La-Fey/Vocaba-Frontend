import { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { FaSearch } from "react-icons/fa";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { getWords, setEmpty } from "../../redux/features/dictionaryWordSlice";
import { toast } from "react-toastify";
import SkeletonProfile from "../../skeletons/SkeletonProfile";
import Search from "../Inputs/TextField/Search/Search";

const Header = () => {
  const token = localStorage.getItem("_accessToken");
  const { user } = useSelector((state) => ({ ...state.user }));
  const [wordName, setWordName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    const { value } = event.target;
    setWordName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setEmpty());
    if (wordName) {
      dispatch(getWords({ wordName, navigate, toast }));
    }
    setWordName("");
  };

  return (
    <header className={`${styles[`header`]}`}>
      <div className={styles.headerItem}>
        <Link
          to="/"
          className={styles.logo}
          onClick={() => dispatch(setEmpty())}
        >
          VOCABA
        </Link>
      </div>
      <div className={styles.headerItem}>
        <Form className="d-flex" onSubmit={handleSubmit}>
          <Search
            placeholder="Dictionary"
            value={wordName}
            onChange={handleSearch}
          />
        </Form>
      </div>
      <div className={`${styles.headerItem} ${styles.dropdown}`}>
        {token && (user ? <ProfileMenu /> : <SkeletonProfile />)}
        {!token && (
          <Link to="/login" className={styles.navbarLink}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
