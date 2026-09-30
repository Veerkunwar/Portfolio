import { useEffect, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion";

/**
 * Cycles through `words`, typing and deleting each one.
 */
export default function TypingText({ words, typingSpeed = 70, deletingSpeed = 40, pause = 1400 }) {
  const reducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(reducedMotion ? words[0] : "");
  const [phase, setPhase] = useState("typing"); // typing | pausing | deleting

  useEffect(() => {
    if (reducedMotion) {
      setText(words[0]);
      return;
    }

    const current = words[wordIndex % words.length];
    let timeout;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pause);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 200);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, pause, reducedMotion]);

  return (
    <span className="font-mono text-accent-glow">
      {text}
      {!reducedMotion && <span className="ml-0.5 inline-block w-[2px] bg-accent-glow animate-blink">&nbsp;</span>}
    </span>
  );
}
