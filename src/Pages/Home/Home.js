import { Col, Row, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import pict1 from "../../img/home-1.svg";
import pict2 from "../../img/home-2.svg";
import { FaArrowCircleRight } from "react-icons/fa";
import Definitions from "../../components/Word/Definitions";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const { words, loading } = useSelector((state) => ({
    ...state.dictionaryWord,
  }));

  return (
    <>
      <main className={styles.mainContainer}>
        {words.length === 0 && !loading && (
          <>
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>What is Vocaba</h3>
              <span className={styles.divider}></span>
              <p className={styles.sectionComment}>
                It's a kind of Dictionary
                <br />
                where users can record newly learned words.
              </p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>How Use Vocaba</h3>
              <span className={styles.divider}></span>
              <Row style={{ marginTop: "6rem" }}>
                <Col xl={6} className="text-center">
                  <img src={pict1} alt="home.svg" className={styles.homeImg} />
                </Col>
                <Col xl={6} className={styles.stepsCol}>
                  <ul className={styles.steps}>
                    <li className={styles.step}>
                      <FaArrowCircleRight />
                      First, search for the word in the app. Then record the
                      word(s) in your list(s).
                    </li>
                    <li className={styles.step}>
                      <FaArrowCircleRight />
                      Find the usage of the word in the movies and TVs' quote
                      using quodb.
                    </li>
                    <li className={styles.step}>
                      <FaArrowCircleRight />
                      Then record the clips of this word to the application from
                      sites like PlayPhrase.me.
                    </li>
                  </ul>
                </Col>
              </Row>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Why Register Vocaba</h3>
              <span className={styles.divider}></span>
              <Row style={{ marginTop: "6rem" }}>
                <Col
                  xl={6}
                  className={`${styles.stepsCol} ${styles.orderLeft} d-flex justify-content-center`}
                >
                  <ul className={styles.steps}>
                    <li className={styles.step}>
                      <FaArrowCircleRight />
                      You can track the words you have recorded to learn better.
                    </li>
                    <li className={styles.step}>
                      <FaArrowCircleRight />
                      Registered members can use VOCABA with dark theme.
                    </li>
                    <li className={styles.step}>
                      <FaArrowCircleRight />
                      You can keep your words more organized with the listing
                      feature.
                    </li>
                  </ul>
                </Col>
                <Col xl={6} className={`${styles.orderRight} text-center`}>
                  <img src={pict2} alt="home.png" className={styles.homeImg} />
                </Col>
              </Row>
            </section>
          </>
        )}
        {loading && (
          <Spinner
            style={{
              width: "3rem",
              height: "3rem",
              color: "var(--main-link-color)",
              marginTop: "1rem",
            }}
            animation="border"
            role="status"
          />
        )}
        {words.length > 0 && <Definitions />}
      </main>
      <Footer />
    </>
  );
};
export default Home;
