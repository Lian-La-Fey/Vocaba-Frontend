import { useEffect, useState } from "react";
import { FaList, FaPen, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Content from "../../components/Layouts/Content";
import {
  changeList,
  createList,
  deleteList,
} from "../../redux/features/userSlice";
import styles from "./styles.module.css";
import IconButton from "../../components/Button/IconButton/IconButton";
import Modal from "../../components/Modal/MyModal";
import { getWords } from "../../redux/features/wordSlice";
import { deleteWords } from "../../utilities/cleanFirebaseStorage";
import Button from "../../components/Button/Button";
import Search from "../../components/Inputs/TextField/Search/Search";

const Table = ({ lists }) => {
  const { user, error } = useSelector((state) => ({ ...state.user }));
  const { words } = useSelector((state) => ({ ...state.word }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [listDelete, setDeletedList] = useState({ modal: false, list: "" });
  const [nameChange, setNameChange] = useState({
    modal: false,
    oldName: "",
    newName: "",
  });

  useEffect(() => {
    dispatch(getWords({ userId: user._id }));
  }, [user.lists, dispatch, user._id]);

  const submitListDelete = (event) => {
    event.preventDefault();
    const list = listDelete.list;
    dispatch(deleteList({ id: user._id, list, navigate }));
    const listWords = words.filter(
      (word) => word.lists.includes(listDelete.list) && word.lists.length === 1
    );
    !error && deleteWords(listWords, user._id);
    setDeletedList({ modal: false, list: "" });
  };

  const submitChangeName = (event) => {
    event.preventDefault();
    const { oldName, newName } = nameChange;
    if (newName.length > 0) {
      if (!user.lists.includes(newName)) {
        dispatch(
          changeList({ id: user._id, oldName, newName, navigate })
        );
        setNameChange({ modal: false, oldName: "", newName: "" });
      } else {
        toast.error("You have already a list given name");
      }
    } else {
      toast.error("Please provide a list name");
    }
  };

  return (
    <>
      <table className={`${styles.listTable} table`}>
        <thead className="fs-2">
          <tr>
            <th className={styles.tablePadding}>#</th>
            <th className={styles.tablePadding}>List Name</th>
            <th className={styles.tablePadding}></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.tablePadding}>0</td>
            <td className={styles.tablePadding}>
              <Link to="/words/list/All" className={styles.listText}>
                All
              </Link>
            </td>
            <td className={styles.tablePadding}></td>
          </tr>
          {lists.map((list, index) => (
            <tr key={index}>
              <td className={styles.tablePadding}>{index + 1}</td>
              <td className={styles.tablePadding}>
                <Link to={`/words/list/${list}`} className={styles.listText}>
                  {list}
                </Link>
              </td>
              <td className={`${styles.tablePadding} text-center`}>
                <IconButton
                  onClick={() =>
                    setNameChange({ ...nameChange, modal: true, oldName: list })
                  }
                >
                  <FaPen />
                </IconButton>
                <IconButton
                  onClick={() => setDeletedList({ modal: true, list: list })}
                >
                  <FaTrash />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        title="Delete List"
        btnName="Delete"
        state={listDelete}
        setState={setDeletedList}
        submitAction={submitListDelete}
      >
        <p>
          After this process, your list and all the words in it will be
          completely deleted.
        </p>
      </Modal>
      <Modal
        title="Change List Name"
        btnName="Change"
        state={nameChange}
        setState={setNameChange}
        submitAction={submitChangeName}
      >
        <input
          type="text"
          defaultValue={nameChange.oldName}
          className="form-control"
          onChange={(e) =>
            setNameChange({ ...nameChange, newName: e.target.value })
          }
        />
      </Modal>
    </>
  );
};

export const Lists = () => {
  const { user } = useSelector((state) => ({ ...state.user }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newList, setNewList] = useState({
    modal: false,
    name: ""
  });
  const [search, setSearch] = useState("");

  const submitNewList = (event) => {
    event.preventDefault();
    const { name } = newList
    if (name.length > 0) {
      if (!user.lists.includes(name)) {
        dispatch(
          createList({ id: user._id, newList: name, navigate })
        );
        setNewList({ modal: false, namme: "" })
      } else {
        toast.error("You have already a list given name");
      }
    } else {
      toast.error("Please provide a list name");
    }
  };

  return (
    <Content>
      <div className={styles.tableCard}>
        <div className={styles.tableCardHeader}>
          <h2 className={styles.cardTitle}>
            <FaList className="me-4" />
            My Lists
          </h2>
          <div className="d-flex align-items-center">
            <Search
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                height: "4rem",
                border: "0",
                border: "2px solid var(--main-border-color)",
                borderRadius: ".5rem",
              }}
            />
            <Button
              style={{
                marginTop: "0",
                marginLeft: "1rem",
                borderRadius: ".5rem",
                height: "4rem",
                borderWidth: "2px",
              }}
              onClick={() => setNewList({ ...newList, modal: true })}
            >
              New List
            </Button>
          </div>
        </div>
        <div className={styles.tableCardBody}>
          <Table
            lists={user.lists.filter((e) =>
              e.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            )}
          />
        </div>
      </div>
      <Modal
        title="New List"
        btnName="Create"
        state={newList}
        setState={setNewList}
        submitAction={submitNewList}
      >
        <input
          type="text"
          defaultValue={newList.name}
          className="form-control"
          onChange={(e) =>
            setNewList({ ...newList, name: e.target.value })
          }
        />
      </Modal>
    </Content>
  );
};
