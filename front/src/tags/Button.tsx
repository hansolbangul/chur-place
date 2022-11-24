/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { bold, mainTheme } from "../styled";

const sizeStyles = {
  sm: {
    fontSize: "0.75rem",
    padding: "15px 25px",
  },
  md: {
    fontSize: "1rem",
    padding: "15px 25px",
  },
  lg: {
    fontSize: "1.25rem",
    padding: "15px 25px",
  },
};

const backColors = {
  "default": mainTheme,
}

function Button({ children, size = "md", variant = "default", onClick }) {
  return (
    <button onClick={onClick}
      css={{
        backgroundColor: backColors[variant],
        color: "#fff",
        fontFamily: bold,
        borderRadius: "12px",
        boxShadow: '0px 4px 4px 1px rgba(0, 0, 0, 0.15)',
        textAlign: 'center',
        cursor: "pointer",
        ...sizeStyles[size],
        border: "none"
      }}
    >
      {children}
    </button>
  );
}

export default Button;
