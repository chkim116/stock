import { useEffect, useState } from "react";

export function useInitialState<T>(value: T, deps?: unknown[]) {
  const hook = useState(value);

  useEffect(
    () => {
      hook[1](value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? deps : [value]
  );

  return hook;
}
