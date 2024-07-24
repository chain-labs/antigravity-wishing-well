"use client";
import { useEffect, useState } from "react";

let loadedOnce = false;

export default function useLoading() {
  const [loading, setLoading] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);
  useEffect(() => {
    if (loadedOnce) return;
    if (window !== undefined) {
      window.addEventListener("beforeunload", () => {
        setLoading(true);
      });
      window.addEventListener("load", () => {
        setLoading(false);
      });
    }
    const interval = setInterval(() => {
      // detect if window is scrollable
      const scrollable = document.body.scrollHeight > window.innerHeight;
      if (scrollable) {
        setLoading(false);
      }
    }, 1000);

    return () => {
      window.removeEventListener("beforeunload", () => {
        setLoading(true);
      });
      window.removeEventListener("load", () => {
        setLoading(false);
      });
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (loadingComplete) {
      loadedOnce = true;
    }
  }, [loadingComplete]);

  return { loading, setLoadingComplete, strictNoLoading: loadedOnce };
}
