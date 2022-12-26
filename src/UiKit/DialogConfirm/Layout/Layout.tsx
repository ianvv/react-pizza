import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

import { ANIMATION_TIME } from "./const";
import s from "./styles.module.scss";
import animationStyles from "./animation.module.scss";

const contentAnimation = {
  enter: animationStyles.contentEnter,
  enterActive: animationStyles.contentEnterActive,
  exit: animationStyles.contentExit,
  exitActive: animationStyles.contentExitActive,
};

type TLayoutClick = MouseEvent & {
  path: Node[];
};

interface ILayout {
  onClose: () => void;
  children: React.ReactNode;
  opened: boolean;
  dispatchCallback: () => void;
}

const Layout: React.FC<ILayout> = ({
  onClose,
  children,
  opened,
  dispatchCallback,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [animationIn, setAnimationIn] = useState(false);

  useEffect(() => {
    setAnimationIn(opened);
  }, [opened]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as TLayoutClick;

      if (contentRef.current && !_event.path.includes(contentRef.current)) {
        onClose();
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={s.container}>
      <CSSTransition
        nodeRef={contentRef}
        timeout={ANIMATION_TIME}
        in={animationIn}
        classNames={contentAnimation}
      >
        <div className={s.content} ref={contentRef}>
          {children}
          <div className={s.buttons}>
            <button onClick={dispatchCallback}>Ok</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};
export default Layout;
