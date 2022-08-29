import React, { useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Content from "../../components/Layouts/Content";
import WordCard from "../../components/Card/WordCard.js";
import { setListWords } from "../../redux/features/wordSlice";
import pict from "../../img/emptyList.svg";
import styles from "./styles.module.css";

const List = () => {
  const { listWords } = useSelector((state) => ({ ...state.word }));
  const { words } = useSelector((state) => ({ ...state.word }));
  const { list } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (list) {
      if (list === "All") dispatch(setListWords(words));
      else {
        const filteredWords = words.filter((word) => word.lists.includes(list));
        dispatch(setListWords(filteredWords));
      }
    }
  }, [list, words]);

  return (
    <Content>
      <Row className="d-flex justify-content-center">
        {listWords.length > 0 ? (
          listWords.map((word) => (
            <Col key={word._id} xl={10} className="mt-4 p-4">
              <WordCard
                word={word}
                examplesLength={word.definitions.length > 1 ? 1 : 2}
              >
                <Link to={`/word/${word._id}`} className={styles.link}>
                  More Detail...
                </Link>
              </WordCard>
            </Col>
          ))
        ) : (
          <Container className={styles.wrapper}>
            <h1>There's nothing to show!</h1>
            <Image fluid src={pict} />
            <h2>
              Do you want to <Link to="/addWord">add new word</Link>?
            </h2>
          </Container>
        )}
      </Row>
    </Content>
  );
};

export default List;
