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

const Table = () => {
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
    dispatch(getWords({ toast, userId: user._id }));
  }, [user.lists, dispatch, user._id]);

  const submitListDelete = (event) => {
    event.preventDefault();
    const list = listDelete.list;
    dispatch(deleteList({ id: user._id, list, toast, navigate }));
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
          changeList({ id: user._id, oldName, newName, toast, navigate })
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
          {user.lists.map((list, index) => (
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
  const [newList, setNewList] = useState("");

  const handleSubmitNewList = (event) => {
    event.preventDefault();
    if (newList.length > 0) {
      if (!user.lists.includes(newList)) {
        dispatch(
          createList({ id: user._id, newList: newList, toast, navigate })
        );
        setNewList("");
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
          <form className={styles.newListForm} onSubmit={handleSubmitNewList}>
            <input
              type="text"
              placeholder="New List"
              className={styles.newInput}
              value={newList}
              onChange={(e) => setNewList(e.target.value)}
            />
            <button className={styles.addBtn} type="submit">
              +
            </button>
          </form>
        </div>
        <div className={styles.tableCardBody}>
          <Table />
        </div>
      </div>
    </Content>
  );
};
