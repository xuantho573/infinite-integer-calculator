import { Col, Container, Row } from "react-bootstrap";
import { Provider } from "react-redux";
import "./App.css";
import History from "./components/history";
import Screen from "./components/inputDisplay";
import Keyboard from "./components/keyboard";
import store from "./store";

function App() {
  return (
    <>
      <h2 className="mb-4">Infinite Integer Calculator</h2>
      <Container className="h-75" fluid>
        <Row
          className="h-100 border border-1 px-3 py-4 rounded-4"
          style={{ backgroundColor: "#f8f8f8" }}
        >
          <Provider store={store}>
            <History />
            <Col
              xl={7}
              lg={7}
              className="row m-0 justify-content-center"
              style={{ overflow: "clip" }}
            >
              <Screen />
              <Keyboard />
            </Col>
          </Provider>
        </Row>
      </Container>
    </>
  );
}

export default App;
