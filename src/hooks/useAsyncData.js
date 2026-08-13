import { useState, useEffect, useCallback } from "react";

export const useAsyncData = (dataSource, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;

    const timer = setTimeout(() => {
      try {
        const result =
          typeof dataSource === "function" ? dataSource() : dataSource;
        if (active) {
          setData(result);
          setError(false);
        }
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    }, 400);

    return () => {
      active = false;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt]);

  const retry = useCallback(() => {
    setLoading(true);
    setAttempt((current) => current + 1);
  }, []);

  return { data, loading, error, retry };
};
