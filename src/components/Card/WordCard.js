import { Badge, Container } from "react-bootstrap";
import {
  FaAngleRight,
  FaArrowCircleRight,
  FaArrowRight,
  FaVolumeUp,
} from "react-icons/fa";
import AudioBtn from "../Button/AudioBtn/AudioBtn";
import DOMPurify from "dompurify";
import styles from "./styles.module.css";

const Definitions = ({ arr, examplesLength }) => {
  return (
    <ul className={styles.definitions}>
      {arr.map((item, index) => (
        <li key={index} className={styles.definitionItem}>
          <div className="d-flex align-items-center flex-wrap">
            <div className={styles.definitionWrapper}>
              <FaArrowCircleRight className={styles.wordSvg} />
              <div
                className={styles.definition}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item.definition, {
                    ALLOWED_TAGS: ["p", "strong", "i", "u", "span"],
                  }),
                }}
              />
            </div>
            {item.synonyms.length + item.antonyms.length > 0 && (
              <div className="ps-4 d-inline-block">
                {item.synonyms.length > 0 && (
                  <SynAnt arr={item.synonyms} title="SYN" />
                )}
                {item.antonyms.length > 0 && (
                  <SynAnt arr={item.antonyms} title="ANT" />
                )}
              </div>
            )}
          </div>
          {item.examples.length > 0 && (
            <Examples arr={item.examples.split("</p>")} n={examplesLength} />
          )}
        </li>
      ))}
    </ul>
  );
};

const SynAnt = ({ arr, title }) => {
  return (
    <>
      <Badge
        bg={title === "SYN" ? "success" : "danger"}
        style={{ margin: "0 1rem" }}
      >
        {title}
      </Badge>
      <p style={{ display: "inline-block", margin: "0" }}>{arr.join(", ")}</p>
    </>
  );
};

const Examples = ({ arr, n }) => {
  const filteredArr = arr.filter((item) => item); // eliminate ''
  const examples = filteredArr.map((item) => `${item}</p>`);
  return (
    <ul className={styles.examples}>
      {examples.slice(0, n || examples.length).map((example, index) => (
        <li key={index} className={styles.example}>
          <FaAngleRight className={styles.wordSvg} />
          <span
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(example, {
                ALLOWED_TAGS: ["p", "strong", "i", "u", "span"],
              }),
            }}
          />
        </li>
      ))}
    </ul>
  );
};

const Word = ({ word, children, examplesLength }) => {
  return (
    <div className={styles.cardDiv}>
      <Container className="d-flex align-items-center justify-content-center">
        <h3 className="fs-3 mb-0">{word.word}</h3>
        <FaArrowRight className={`${styles.titleSvg} mx-3`} />
        <p className="fs-3 mb-0 me-3">{word.phonetic}</p>
        <AudioBtn audioSrc={word.pronunciation}>
          <FaVolumeUp className={styles.titleSvg} />
        </AudioBtn>
      </Container>
      <Container fluid="md" className="mt-4">
        <Definitions arr={word.definitions} examplesLength={examplesLength} />
        {children}
      </Container>
    </div>
  );
};

export default Word;
