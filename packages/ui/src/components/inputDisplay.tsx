import ContentEditable from "react-contenteditable";
import { useDispatch, useSelector } from "react-redux";
import sanitizeHtml from "sanitize-html";
import { expressionActions, selectExpr, selectResult } from "../store";

function createRange(node: Node, targetPosition: number) {
  const range = document.createRange();
  range.selectNode(node);
  range.setStart(node, 0);

  let pos = 0;
  const stack = [node];
  while (stack.length > 0) {
    const current = stack.pop();

    if (current && current.nodeType === Node.TEXT_NODE) {
      const len = current.textContent?.length || 0;
      if (pos + len >= targetPosition) {
        range.setStart(current, targetPosition - pos);
        range.setEnd(current, targetPosition - pos);
        return range;
      }
      pos += len;
    } else if (current && current.childNodes && current.childNodes.length > 0) {
      for (let i = current.childNodes.length - 1; i >= 0; i--) {
        stack.push(current.childNodes[i]);
      }
    }
  }
  range.setStart(node, node.childNodes.length);
  range.setEnd(node, node.childNodes.length);
  return range;
}

function setCursorPosition(element: Node, position: number) {
  const range = createRange(element, position);
  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

// function getCursorPosition(element: Node) {
//   const selection = window.getSelection();
//   if (selection) {
//     const range = selection.getRangeAt(0);
//     const clonedRange = range.cloneRange();
//     clonedRange.selectNodeContents(element);
//     clonedRange.setEnd(range.endContainer, range.endOffset);
//     const cursorPosition = clonedRange.toString().length;
//     return cursorPosition;
//   }
//   return -1;
// }

export default function Screen() {
  const expr = useSelector(selectExpr);
  const result = useSelector(selectResult);
  const dispatch = useDispatch();

  return (
    <div
      id="inputDisplay"
      className="container-fluid d-flex flex-column border border-1 rounded-3"
    >
      <div
        className="flex-grow-1 text-end d-flex flex-column-reverse fs-5 h-75"
        onClick={(e) => {
          const target: HTMLDivElement = e.target as HTMLDivElement;
          if (target.id === "input") return;
          const child: HTMLDivElement = target.firstChild as HTMLDivElement;
          child.focus();
        }}
      >
        <ContentEditable
          id="input"
          html={expr.replace("*", "x")}
          className="overflow-auto"
          onChange={(e) => {
            const value = sanitizeHtml(e.currentTarget.innerHTML, {
              allowedTags: []
            }).replace("=", "");

            if (value !== e.currentTarget.innerHTML) {
              e.currentTarget.innerHTML = value;
              setCursorPosition(
                e.currentTarget,
                e.currentTarget.innerHTML.length
              );
            }
            dispatch(expressionActions.set(value));
          }}
          onKeyDown={(e) => {
            if (!["=", "Enter"].includes(e.key)) e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </div>

      <div id="result" className="text-end fs-5 secondary-text overflow-auto">
        <span>{result}</span>
      </div>
    </div>
  );
}
