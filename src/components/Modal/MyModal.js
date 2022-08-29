import { Modal, Spinner } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import Button from "../Button/Button";
import './styles.css';

const MyModal = ({
  title,
  children,
  btnName,
  state,
  setState,
  submitAction,
  loading
}) => {
  const modalIcon = { width: "2.6rem", height: "2.6rem", cursor: "pointer" };
  const handleClose = () => {
    setState({ ...state, modal: false });
  };
  
  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={state.modal}
      onHide={handleClose}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        <IoClose style={modalIcon} onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <form onSubmit={submitAction}>
          <Button onClick={handleClose} className="fs-3" type="submit">
            {loading && <Spinner size="md" />}
            {!loading && btnName}
          </Button>
        </form>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
