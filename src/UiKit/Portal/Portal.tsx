import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface IPortal {
  children: React.ReactNode;
}

const Portal = ({ children }: IPortal) => {
  const [container] = useState(() => document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
};

export default Portal;
