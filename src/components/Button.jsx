import React from "react";

function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 24px",
        fontSize: "1rem",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#646cff",
        color: "#fff",
        cursor: "pointer",
        marginTop: "16px",
      }}
    >
      {label}
    </button>
  );
}

export default Button;
