"use client";
import { useEffect, useState } from "react";

let loadedOnce = false;

export default function useLoading() {
  const [loading, setLoading] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);
  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener("load", () => {
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    if (loadingComplete) {
      loadedOnce = true;
    }
  }, [loadingComplete]);

  return { loading, setLoadingComplete, strictNoLoading: loadedOnce };
}
