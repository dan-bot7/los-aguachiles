"use client";

import { useEffect } from "react";
import { assetPath } from "../lib/assets";

export function PwaRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    const register = () => {
      navigator.serviceWorker.register(assetPath("sw.js")).catch(() => {
        // El sitio sigue funcionando aunque el navegador no permita registrar el service worker.
      });
    };

    if (document.readyState === "complete") {
      register();
      return;
    }

    window.addEventListener("load", register, { once: true });

    return () => {
      window.removeEventListener("load", register);
    };
  }, []);

  return null;
}
