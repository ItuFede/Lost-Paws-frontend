import React, { useState, useEffect } from "react";
import "./Styles/toaster.css";

const Toaster = ({ message, type = "info", duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`toaster ${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default Toaster;
