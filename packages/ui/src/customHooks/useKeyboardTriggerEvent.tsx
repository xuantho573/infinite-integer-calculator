import { useEffect, useRef } from "react";

interface UseKeyboardTriggerEventArgs {
  value: string;
  ctrlKey: boolean;
}

export default function useKeyboardTriggerEvent(
  props: UseKeyboardTriggerEventArgs
) {
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleKeyPress(event: globalThis.KeyboardEvent) {
      if (
        (event.ctrlKey && !props.ctrlKey) ||
        (!event.ctrlKey && props.ctrlKey)
      )
        return;

      if (
        event.key === props.value &&
        buttonRef.current !== undefined &&
        buttonRef.current !== null
      )
        buttonRef.current.click();
    }

    document.body.addEventListener("keydown", handleKeyPress);

    return () => {
      document.body.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  return buttonRef;
}
