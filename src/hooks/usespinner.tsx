import React, { useState, useEffect, useRef } from "react";

interface Options {
  delay: number;
}
interface SpinnerProps {
  children: React.ReactNode;
}
type Action = {
  name: string;
  endtime: number;
};

const useSpinner = (globalOptions?: Options) => {
  // store a list of actions
  const [actions, setActions] = useState<Action[]>([]);

  // set a timer that every second checks if any actions can be closed
  useEffect(() => {
    const timer = setTimeout(() => {
      if (actions) {
        setActions((prev) => prev.filter((item) => item.endtime > Date.now()));
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [actions]);

  // Allow the start of a new Action to be tracked
  const start = (name: string, options?: Options) => {
    const delay: number = options?.delay || globalOptions?.delay || 10000;
    const currentAction: Action = { name: name, endtime: Date.now() + delay };
    setActions((prev) => [...prev, currentAction]);
  };

  // remove any action that has the selected name
  const end = (name: string) => {
    if (actions) {
      setActions((prev) => prev.filter((item) => item.name !== name));
    }
  };
  // clear all current actions
  const clear = () => {
    setActions([]);
  };

  const busy = () => {
      return actions && actions.length > 0
  }

  // JSX component used to wrap spinner of choice
  const SpinnerContainer = ({ children }: SpinnerProps) => {
    // If no active Actions then dont display anything
    if (actions && actions.length === 0) {
      return null;
    }

    return <div className="useSpinner">{children}</div>;
  };

  // return hook values
  return { start, end, clear, busy, SpinnerContainer };
};

export default useSpinner;
