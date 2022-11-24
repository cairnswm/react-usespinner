import { useState, useEffect } from "react";

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

  const createUUID = () => {
    // https://www.arungudelli.com/tutorial/javascript/how-to-create-uuid-guid-in-javascript-with-examples/
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  const fetch = (...params: any) => {
    const id = createUUID();
    start(id)
    return new Promise((resolve, reject) => {
      let config = params[1] || {};
      fetch(params[0], config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
        .finally(()=>{
          end(id);
        });
    });
  };

  // JSX component used to wrap spinner of choice
  const SpinnerContainer = ({ children }: SpinnerProps) => {
    // If no active Actions then dont display anything
    if (actions && actions.length === 0) {
      return null;
    }

    return <div className="useSpinner">{children}</div>;
  };

  // return hook values
  return { start, end, clear, busy, fetch, SpinnerContainer };
};

export default useSpinner;
