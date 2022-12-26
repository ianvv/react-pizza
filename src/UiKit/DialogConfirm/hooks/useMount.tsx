import { useEffect, useState } from "react";
import { ANIMATION_TIME } from "../Layout/const";

interface IUseMount {
  opened: boolean;
}

export const useMount = ({ opened }: IUseMount) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (opened && !mounted) {
      setMounted(true);
    } else if (!opened && mounted) {
      setTimeout(() => {
        setMounted(false);
      }, ANIMATION_TIME);
    }
  }, [mounted, opened]);

  return {
    mounted,
  };
};
