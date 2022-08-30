import { useEffect, useState } from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight, FaVolumeUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setWord,
  setWordMeaningDefinition,
} from "../../redux/features/dictionaryWordSlice";
import AudioBtn from "../Button/AudioBtn/AudioBtn";
import Button from "../Button/Button";
import styles from "./styles.module.css";

const WordDefinitions = ({ audioSrc1, audioSrc2, meaning }) => {
  const { word } = useSelector((state) => ({
    ...state.dictionaryWord,
  }));
  const dispatch = useDispatch();

  const handleRad = (event) => {
    const { value } = event.target;
    const def = meaning.definitions[value];
    const abc = {
      word: word.word,
      phonetic: word.phonetic || "/----/",
      pronunciation: audioSrc2 || audioSrc1,
      partOfSpeech: meaning.partOfSpeech,
      definitions: [
        {
          definition: def.definition,
          synonyms: meaning?.synonyms || [],
          antonyms: meaning?.antonyms || [],
          examples: def?.example || "",
        },
      ],
    };
    dispatch(setWordMeaningDefinition(abc));
  };

  return (
    <ul className={styles.wordDefinitions}>
      {meaning.synonyms.length > 0 && (
        <>
          <Badge bg="success">SYN</Badge>
          <p style={{ display: "inline-block", marginLeft: "1rem" }}>
            {meaning.synonyms.join(", ")}
          </p>
        </>
      )}
      {meaning.antonyms.length > 0 && (
        <>
          <br />
          <Badge bg="danger">ANT</Badge>
          <p style={{ display: "inline-block", marginLeft: "1rem" }}>
            {meaning.antonyms.join(", ")}
          </p>
        </>
      )}
      {meaning.definitions.slice(0, 10).map((definition, idx) => (
        <li key={idx + definition}>
          <input
            type="radio"
            name="definition"
            value={idx}
            className="me-3"
            onChange={handleRad}
          />
          <span className={styles.definition}>{definition.definition}</span>
          {definition.example && <p className="ms-5">{definition.example}</p>}
        </li>
      ))}
    </ul>
  );
};

const WordControl = () => {
  const { addedWord, words } = useSelector((state) => ({
    ...state.dictionaryWord,
  }));
  const [n, setN] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setWord(n));
    const data = {
      word: addedWord.word,
      pronunciation: addedWord.pronunciation,
      phonetic: addedWord.phonetic,
    };
    dispatch(setWordMeaningDefinition(data));
  }, [n]);

  const next = () => {
    setN(n + 1 === words.length ? 0 : n + 1);
  };

  const prev = () => {
    setN(n - 1 === -1 ? words.length - 1 : n - 1);
  };

  return (
    <div className={styles.controlWrapper}>
      {words.length > 1 && (
        <Button onClick={prev} minWidth="3.2rem">
          <FaArrowLeft />
        </Button>
      )}
      <Button>
        <Link to="/addWord">Add Word</Link>
      </Button>
      {words.length > 1 && (
        <Button onClick={next} minWidth="3.2rem">
          <FaArrowRight />
        </Button>
      )}
    </div>
  );
};

const Definitions = () => {
  const { word } = useSelector((state) => ({ ...state.dictionaryWord }));

  const audioUrls = [];
  word.phonetics.forEach((element) => {
    if (element.audio) {
      audioUrls.push(element.audio);
    }
  });

  const audioSrc1 = audioUrls[0];
  const audioSrc2 = audioUrls[1];

  const phonetic = word.hasOwnProperty("phonetic") ? word.phonetic : "/----/";

  return (
    <Container
      fluid
      className={`d-flex align-items-center justify-content-center`}
    >
      <Row className="g-5" style={{ minWidth: "65%" }}>
        <Col style={{ paddingTop: "3rem", paddingBottom: "6rem" }}>
          <Card border="" className={styles.wCard}>
            <Card.Header className={styles.cardHeader}>
              {word.word}
              <FaArrowRight className="mx-3 text-primary" />
              {phonetic}
              <AudioBtn audioSrc={audioSrc1}>
                <FaVolumeUp className="ms-3 text-primary" />
              </AudioBtn>
              <AudioBtn audioSrc={audioSrc2}>
                <FaVolumeUp className="ms-3 text-danger" />
              </AudioBtn>
            </Card.Header>
            <Card.Body>
              <div className="card-text">
                {word.meanings.map((meaning, index) => (
                  <ul key={index + meaning.definitions[0].definition}>
                    <Badge>{meaning.partOfSpeech}</Badge>
                    <li>
                      {
                        <WordDefinitions
                          meaning={meaning}
                          audioSrc1={audioSrc1}
                          audioSrc2={audioSrc2}
                        />
                      }
                    </li>
                  </ul>
                ))}
              </div>
            </Card.Body>
            <WordControl />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Definitions;
