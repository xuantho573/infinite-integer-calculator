import { useEffect, useRef, useState } from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  expressionActions,
  historyActions,
  resultActions,
  selectHistory
} from "../store";

interface HistoryItemArgs {
  item: {
    expr: string;
    result: string;
    key: number;
  };
}

function HistoryItem(props: HistoryItemArgs) {
  const dispatch = useDispatch();

  return (
    <div
      className="d-flex flex-column history__item"
      onClick={() => {
        dispatch(expressionActions.set(props.item.expr));
        dispatch(resultActions.set(props.item.result));
      }}
    >
      <div className="text-break text-end" style={{}}>
        {props.item.expr}
      </div>
      <div
        className="text-break text-end fs-5 secondary-text"
        // style={{ borderBottom: "1px dotted #ccc" }}
      >
        ={props.item.result}
      </div>
    </div>
  );
}

export default function History() {
  const history = useSelector(selectHistory);
  const dispatch = useDispatch();
  const endRef = useRef<HTMLDivElement>(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <Col
      xl={5}
      lg={5}
      className="d-flex flex-column h-100 justify-content-end gap-3"
    >
      <div
        id="history"
        className="d-flex flex-column p-2 flex-grow-1 w-100 rounded-3 border border-1"
      >
        {history.map((item) => (
          <HistoryItem key={item.key.toString()} item={item} />
        ))}
        <div ref={endRef}></div>
      </div>
      <div>
        <Button
          variant="secondary"
          onClick={handleShow}
          disabled={history.length === 0}
        >
          Clear History
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Clear History</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you really want to clear all the history?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                dispatch(historyActions.clear());
                handleClose();
              }}
            >
              Clear
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Col>
  );
}
