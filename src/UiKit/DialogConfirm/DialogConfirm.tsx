import React from "react";
import Portal from "../Portal/Portal";

import { useMount } from "./hooks/useMount";
import Layout from "./Layout/Layout";

interface IDialogConfirm {
  opened: boolean;
  onClose: () => void;
  children: React.ReactNode;
  dispatchCallback: () => void;
}

const DialogConfirm: React.FC<IDialogConfirm> = ({
  opened,
  onClose,
  children,
  dispatchCallback,
}) => {
  const { mounted } = useMount({ opened });

  if (!mounted) {
    return null;
  }

  return (
    <Portal>
      <Layout
        onClose={onClose}
        opened={opened}
        dispatchCallback={dispatchCallback}
      >
        {children}
      </Layout>
    </Portal>
  );
};

export default DialogConfirm;
