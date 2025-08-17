import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useAgriGPTPopup = () => {
  const [shouldShowPopup, setShouldShowPopup] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Don't show popup on AgriGPT page itself
    if (location.pathname === "/agri-gpt") {
      setShouldShowPopup(false);
    } else {
      setShouldShowPopup(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Show popup after a delay if user hasn't interacted
    const timer = setTimeout(() => {
      if (!hasInteracted && shouldShowPopup) {
        // Auto-show popup after 10 seconds (optional)
        // You can uncomment this if you want auto-show behavior
        // setHasInteracted(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [hasInteracted, shouldShowPopup]);

  const markAsInteracted = () => {
    setHasInteracted(true);
  };

  return {
    shouldShowPopup,
    hasInteracted,
    markAsInteracted,
  };
};
