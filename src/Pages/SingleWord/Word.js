import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaAngleLeft, FaAngleRight, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteWord, setWord } from "../../redux/features/wordSlice";
import Content from "../../components//Layouts/Content";
import styles from "./styles.module.css";
import WordCard from "../../components/Card/WordCard";
import Button from "../../components/Button/Button";
import NotFound from "../../Pages/NotFound/NotFound";
import {
  cleanFirebaseStorage,
  deleteWords,
} from "../../utilities/cleanFirebaseStorage";
import Modal from "../../components/Modal/MyModal";

const Clips = ({ clips }) => {
  const [n, setN] = useState(0);
  const [playing, setPlaying] = useState(false);
  const refClips = useRef([]);

  const playClip = () => {
    if (refClips.current[n].paused) {
      refClips.current[n].play();
    } else {
      setPlaying(refClips.current[n].paused);
    }
  };

  const Toggle = () => {
    if (playing) return;
    const cNames = `${styles.caroPass} ${styles.caroToggle}`;
    return <FaPlay className={cNames} onClick={playClip} />;
  };

  return (
    <Container fluid className={styles.clipContainer}>
      {clips.length > 1 && !playing && (
        <>
          <FaAngleLeft
            className={`${styles.caroPass} ${styles.caroLeft}`}
            onClick={() => setN(n - 1 === -1 ? clips.length - 1 : n - 1)}
          />
          <FaAngleRight
            className={`${styles.caroPass} ${styles.caroRight}`}
            onClick={() => setN(n + 1 === clips.length ? 0 : n + 1)}
          />
          <div className={styles.caroIndicator}>
            {clips.map((item, idx) => (
              <button
                key={idx}
                type="button"
                data-bs-target=""
                className={styles.caroIndicatorBtn}
                onClick={() => setN(idx)}
                style={{
                  opacity: `${n === idx ? "1" : ".5"}`,
                }}
              ></button>
            ))}
          </div>
        </>
      )}
      <Toggle />
      {clips.map((clip, index) => (
        <video
          key={clip.uploadName + index}
          ref={(element) => {
            refClips.current[index] = element;
          }}
          className={styles.clipNew}
          style={{
            display: `${n === index ? "block" : "none"}`,
            opacity: `${n === index ? "1" : "0"}`,
          }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={clip.url} type="video/mp4" />
        </video>
      ))}
    </Container>
  );
};

const Word = () => {
  const { user } = useSelector((state) => ({ ...state.user }));
  const [wordDelete, setWordDelete] = useState({ modal: false });
  const { word, words, error, loading } = useSelector((state) => ({
    ...state.word,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  if (word) {
    cleanFirebaseStorage(words, user._id);
  }

  useEffect(() => {
    if (id) {
      const userWord = words.find((item) => item._id === id);
      dispatch(setWord(userWord));
    }
  }, [id, words, dispatch]);

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(deleteWord({ id, navigate }));
    !error && deleteWords([{ ...word }], user._id);
    navigate("/profile");
  };

  return (
    <Content>
        <Row className="d-flex justify-content-center mt-4">
          {word && (
            <Col key={word._id} xl={11} className={styles.wordCol}>
              <WordCard word={word}></WordCard>
              {word.clips.length > 0 && <Clips clips={word.clips} />}
              <div className={styles.wordBtnDiv}>
                <Link to={`/editWord/${word._id}`}>
                  <Button>
                    <span>Edit</span>
                  </Button>
                </Link>
                <Button onClick={() => setWordDelete({ modal: true })}>
                  <span>Remove</span>
                </Button>
              </div>
            </Col>
          )}
          {!loading && word === undefined && <NotFound />}
        </Row>
      <Modal
        title="Delete Word"
        btnName="Delete"
        state={wordDelete}
        setState={setWordDelete}
        submitAction={handleDelete}
      >
        <p>
          After this process, your word will be completely deleted. Please be
          certain.
        </p>
      </Modal>
      </Content>

  );
};

export default Word;
