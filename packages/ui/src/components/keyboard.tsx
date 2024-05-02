import { useDispatch, useSelector } from "react-redux";
import { useFetch, useKeyboardTriggerEvent } from "../customHooks";
import {
  expressionActions,
  historyActions,
  resultActions,
  selectExpr,
  selectResult
} from "../store";

interface ButtonArgs {
  value: string;
}

function Button(props: ButtonArgs) {
  const dispatch = useDispatch();
  const expr = useSelector(selectExpr);
  let result = useSelector(selectResult);
  const buttonRef = useKeyboardTriggerEvent({
    value: props.value === "C" ? "c" : props.value,
    ctrlKey: false
  });
  const { post } = useFetch<{ val: string }>(import.meta.env.VITE_SERVER_HOST);

  return (
    <div
      className={
        "m-0 p-0" +
        (props.value.length > 1 || props.value === "*" ? " d-none" : "")
      }
      style={{ height: "15%", minHeight: "32px" }}
    >
      <button
        id={"inputbtn__" + props.value}
        className={
          "inputbtn col btn w-75 rounded-3" +
          ("+-x".includes(props.value) ? " fs-5" : "") +
          (props.value === "=" ? " primary-bg fs-5" : "") +
          (props.value === "C" ? "" : "")
        }
        style={{
          backgroundColor: props.value.match(/\d/)
            ? "var(--primary-blue)"
            : "CD".includes(props.value)
              ? "#f00"
              : "var(--primary-green)"
        }}
        aria-label={"Append-" + props.value}
        onClick={async () => {
          if (props.value === "=" || props.value === "Enter") {
            try {
              result = (await post("", { expr: expr.replaceAll("x", "*") }))
                .val;
              dispatch(resultActions.set(result));
              dispatch(historyActions.append({ expr, result }));
            } catch (error) {
              console.log(error);
            }
          } else if (props.value === "Backspace") {
            dispatch(expressionActions.pop(1));
          } else {
            if (result.length > 0) dispatch(expressionActions.clear());
            dispatch(resultActions.clear());
            dispatch(
              props.value === "C"
                ? expressionActions.clear()
                : props.value === "D"
                  ? expressionActions.pop(1)
                  : expressionActions.append(
                      props.value === "*" ? "x" : props.value
                    )
            );
          }
        }}
        ref={buttonRef}
      >
        {props.value === "D" ? (
          <img src="/src/assets/backspace.svg" />
        ) : (
          props.value
        )}
      </button>
    </div>
  );
}

export default function Keyboard() {
  const keys = [
    "(",
    ")",
    "+",
    "-",
    "x",
    "D",
    "5",
    "6",
    "7",
    "8",
    "9",
    "C",
    "0",
    "1",
    "2",
    "3",
    "4",
    "=",
    "Enter",
    "Backspace",
    "*"
  ];
  const items = keys.map((key) => <Button key={key} value={key} />);
  return (
    <div id="keyboard" className="col row row-cols-6">
      {items}
    </div>
  );
}
