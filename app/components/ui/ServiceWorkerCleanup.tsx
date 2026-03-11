"use client";

import { useEffect } from "react";

export default function ServiceWorkerCleanup() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    const cleanupServiceWorkers = async () => {
      try {
        const hadActiveSW = !!navigator.serviceWorker.controller;
        
        const registrations = await navigator.serviceWorker.getRegistrations();
        
        for (const registration of registrations) {
          const unregistered = await registration.unregister();
          if (unregistered) {
            console.log("Service worker unregistered:", registration.scope);
          }
        }

        const cacheNames = await caches.keys();
        for (const cacheName of cacheNames) {
          await caches.delete(cacheName);
          console.log("Cache deleted:", cacheName);
        }

        if (hadActiveSW) {
          const reloadKey = "sw-cleanup-reload-attempted";
          if (!sessionStorage.getItem(reloadKey)) {
            sessionStorage.setItem(reloadKey, "true");
            setTimeout(() => {
              window.location.reload();
            }, 100);
          }
        }
      } catch (error) {
        console.error("Error cleaning up service workers:", error);
      }
    };

    if (document.readyState === "complete") {
      cleanupServiceWorkers();
    } else {
      window.addEventListener("load", cleanupServiceWorkers);
      return () => window.removeEventListener("load", cleanupServiceWorkers);
    }
  }, []);

  return null;
}
