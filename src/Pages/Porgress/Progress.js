import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { MdOutlinePendingActions, MdOutlineCheckCircle } from "react-icons/md";
import { RiNumber1, RiNumber2, RiNumber3 } from "react-icons/ri";
import { BiTaskX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Content from "../../components/Layouts/Content";
import { getWords } from "../../redux/features/wordSlice";
import { toast } from "react-toastify";
import {
  FaChevronLeft,
  FaChevronRight,
  FaRegCalendarAlt,
  FaTimes,
} from "react-icons/fa";
import filterWords from "../../utilities/fiterWords";
import defineTasks from "../../utilities/defineTasks";
import { addMonths, subMonths, format } from "date-fns";
import styles from "./styles.module.css";

const Stat = ({ title, number, children }) => {
  return (
    <Col xs={6} className="px-4">
      <div className={styles.stat}>
        {children}
        <span>
          {title}
          <br />
          {number}
        </span>
      </div>
    </Col>
  );
};

const Agenda = ({ title, arr, month, setMonth }) => {
  const { words } = useSelector((state) => ({ ...state.word }));
  const dateFormat = "MMM yyyy";
  const selectedMonth = arr.filter(
    (item) =>
      new Date(item.nextProgress).getMonth() === month.getMonth() &&
      new Date(item.nextProgress).getFullYear() === month.getFullYear()
  );

  const examples = selectedMonth.map((item) =>
    item.definitions.map((def) =>
      def.examples.split("</p>").filter((example) => example !== "").length
    ).reduce((partialSum, a) => partialSum + a, 0)
  );

  const generateStatement = (progress) => {
    if (progress < 2) return "Add new examples";
    else if (progress < 4) return "Add new clips and their quotes";

    return "Add your own sentences and clips";
  };

  const generateSvg = (progress) => {
    if (progress < 2) return <RiNumber1 className={styles.circleSvg} />;
    else if (progress < 4) return <RiNumber2 className={styles.circleSvg} />;

    return <RiNumber3 className={styles.circleSvg} />;
  };

  return (
    <Col md={12} className="p-4">
      <Card className={`${styles.card} ${styles.agenda}`}>
        <Card.Header className="justify-content-between">
          <div>
            <FaRegCalendarAlt />
            <span className={styles.cardTitle}>{title}</span>
          </div>
          <div className={styles.month}>
            <div
              className={styles.monthCol}
              onClick={() => setMonth(subMonths(month, 1))}
            >
              <FaChevronLeft />
            </div>
            <div className={styles.monthCol} name="month">
              <span>{format(month, dateFormat)}</span>
            </div>
            <div
              className={styles.monthCol}
              onClick={() => setMonth(addMonths(month, 1))}
            >
              <FaChevronRight />
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          {selectedMonth.length > 0 && (
            <table className={`${styles.agendaTable} table`}>
              <thead>
                <tr>
                  <th>Next Progress</th>
                  <th>Word</th>
                  <th className="hide-b-xll">Definitions</th>
                  <th className="hide-b-lg">Clips</th>
                  <th className="hide-b-lg">Examples</th>
                  <th>To Do</th>
                </tr>
              </thead>
              <tbody>
                {selectedMonth.map((item, index) => (
                  <tr key={index}>
                    <td className="d-none d-md-block">
                      {format(new Date(item.nextProgress), "dd EEEE, HH:mm")}
                    </td>
                    <td className="d-block d-md-none">
                      {format(new Date(item.nextProgress), "dd EEE, HH:mm")}
                    </td>
                    <td>{item.word}</td>
                    <td className="ps-5 hide-b-xll">{item.definitions.length}</td>
                    <td className="ps-4 hide-b-lg">{item.clips.length}</td>
                    <td className="ps-5 hide-b-lg">{examples[index]}</td>
                    <td className="d-none d-sm-block">
                      {generateStatement(item.progress)}
                    </td>
                    <td className="d-block d-sm-none">
                      {generateSvg(item.progress)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {words.length === 0 && (
            <div className={`${styles.noTask} ps-4`}>
              <FaTimes />
              <span>You don't have any recorded words</span>
            </div>
          )}
          {words.length > 0 && selectedMonth.length < 1 && (
            <div className={`${styles.noTask} ps-2`}>
              <FaTimes />
              <span>You don't have any new tasks for this month.</span>
            </div>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

const TaskCard = ({ title, arr, children }) => {
  return (
    <Col md={4} className="p-4">
      <Card className={styles.card}>
        <Card.Header className={styles.cardHeader}>
          {children}
          <span className={styles.cardTitle}>{title}</span>
        </Card.Header>
        <Card.Body>
          <ul>
            {arr.map((item, index) => (
              <li className={styles.task} key={item.word + index}>
                <Link to={`/editWord/${item._id}/progress`}>
                  <MdOutlinePendingActions />
                  <span>{item.word}</span>
                </Link>
              </li>
            ))}
            {arr.length < 1 && (
              <li className={styles.noTask}>
                <BiTaskX />
                <span>No Tasks</span>
              </li>
            )}
          </ul>
        </Card.Body>
      </Card>
    </Col>
  );
};

const Progress = () => {
  const { words } = useSelector((state) => ({ ...state.word }));
  const { user } = useSelector((state) => ({ ...state.user }));
  const [tasks, setTasks] = useState({
    completed: 0,
    pendings: 0,
    level_1: [],
    level_2: [],
    level_3: [],
  });
  const [month, setMonth] = useState(new Date());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWords({ toast, userId: user._id }));
    if (words.length > 0) {
      setTasks({ ...defineTasks(words) });
    }
  }, [words.length]);

  return (
    <Content>
      <Row className="my-4">
        <Col xs md={9} lg={8} xl={6} xxl={5}>
          <Row>
            <Stat title="Completed Tasks" number={tasks.completed}>
              <MdOutlineCheckCircle />
            </Stat>
            <Stat title="Pending Tasks" number={tasks.pendings}>
              <MdOutlinePendingActions />
            </Stat>
          </Row>
        </Col>
      </Row>
      <Row className="my-4">
        <Agenda
          month={month}
          setMonth={setMonth}
          title="Word Agenda"
          arr={filterWords(words, tasks.level_1, tasks.level_2, tasks.level_3)}
        />
      </Row>
      <Row className="my-4">
        <TaskCard title="Add new examples" arr={tasks.level_1}>
          <RiNumber1 className={styles.circleSvg} />
        </TaskCard>
        <TaskCard title="Add new clips and their quotes" arr={tasks.level_2}>
          <RiNumber2 className={styles.circleSvg} />
        </TaskCard>
        <TaskCard title="Add your own sentences and clips" arr={tasks.level_3}>
          <RiNumber3 className={styles.circleSvg} />
        </TaskCard>
      </Row>
    </Content>
  );
};

export default Progress;
